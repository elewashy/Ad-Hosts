/**
 * bypass.js — Advanced Anti-Adblock & Anti-Tamper Bypass Layer
 * Target domains : rm.freex2line.online | cimanow.cc
 * Injection point: onPageStarted (earliest possible, before any page script runs)
 *
 * Sections:
 *  0. Utility / helpers
 *  1. Redirect Protection
 *  2. Script Injection Control
 *  3. Blob / Dynamic-Execution Blocking
 *  4. Ad-API Spoofing  (adsbygoogle, googletag, google.ima)
 *  5. DOM Bait & offsetHeight Spoofing
 *  6. Image / Canvas Protection
 *  7. Observer Neutralization  (MutationObserver, TreeWalker)
 *  8. DOM-Destruction Protection  (remove, innerHTML)
 *  9. Cleanup & periodic guards
 */
;(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────
   * 0. UTILITY HELPERS
   * ───────────────────────────────────────────────────────────── */

  /** Domains whose scripts must always be blocked */
  const BLOCKED_HOSTS = [
    'rm.freex2line.online',
    'freex2line.online',
  ];

  /** Return true if the given URL belongs to a blocked host */
  function isBlockedSrc(src) {
    if (!src || typeof src !== 'string') return false;
    try {
      const u = new URL(src, location.href);
      return BLOCKED_HOSTS.some(h => u.hostname === h || u.hostname.endsWith('.' + h));
    } catch { return false; }
  }

  /** Return true if the given URL is a suspicious blob */
  function isSuspiciousBlob(src) {
    return typeof src === 'string' && src.startsWith('blob:');
  }

  /** Safe property definer — won't throw if already non-configurable */
  function safeDefine(obj, prop, descriptor) {
    try {
      const existing = Object.getOwnPropertyDescriptor(obj, prop);
      if (existing && !existing.configurable) return false;
      Object.defineProperty(obj, prop, descriptor);
      return true;
    } catch (e) { return false; }
  }

  /** Store original references before anything can tamper with them */
  const _originals = {
    // Location
    locReplace : window.location.replace.bind(window.location),
    locAssign  : window.location.assign.bind(window.location),

    // DOM creation / insertion
    createElement    : Document.prototype.createElement.bind(document),
    appendChild      : Element.prototype.appendChild,
    insertBefore     : Element.prototype.insertBefore,
    prepend          : Element.prototype.prepend,

    // Blob / URL
    Blob             : window.Blob,
    createObjectURL  : URL.createObjectURL.bind(URL),

    // Style
    getComputedStyle : window.getComputedStyle.bind(window),

    // Canvas
    getImageData     : CanvasRenderingContext2D.prototype.getImageData,

    // Observer
    MutationObserver : window.MutationObserver,
    createTreeWalker : document.createTreeWalker.bind(document),

    // DOM mutation
    elementRemove    : Element.prototype.remove,
  };

  /* ─────────────────────────────────────────────────────────────
   * 1. REDIRECT PROTECTION
   *
   * Blocks programmatic redirects to external pages triggered by
   * anti-adblock scripts (location.replace / assign / href setter).
   * Legitimate SAME-ORIGIN navigation is allowed through.
   * User-gesture navigation is always allowed (we can't block that
   * without harming UX, and ad-detection scripts don't use gestures).
   * ───────────────────────────────────────────────────────────── */
  (function installRedirectProtection() {
    const CURRENT_HOST = location.hostname;

    function isSafeDestination(url) {
      if (!url || typeof url !== 'string') return true;
      try {
        const u = new URL(url, location.href);
        // Same origin → always allow
        if (u.hostname === CURRENT_HOST) return true;
        // Google redirect used by anti-adblock → block
        if (u.hostname.includes('google.') && u.pathname === '/') return false;
        // Any blocked host → block
        if (isBlockedSrc(u.href)) return false;
        // Everything else → currently allow (can be tightened)
        return true;
      } catch { return true; }
    }

    // -- location.replace --
    safeDefine(Location.prototype, 'replace', {
      value: function replace(url) {
        if (!isSafeDestination(url)) {
          console.warn('[bypass] Blocked location.replace →', url);
          return;
        }
        _originals.locReplace(url);
      },
      configurable: true, writable: true,
    });

    // -- location.assign --
    safeDefine(Location.prototype, 'assign', {
      value: function assign(url) {
        if (!isSafeDestination(url)) {
          console.warn('[bypass] Blocked location.assign →', url);
          return;
        }
        _originals.locAssign(url);
      },
      configurable: true, writable: true,
    });

    // -- location.href setter --
    const locDesc = Object.getOwnPropertyDescriptor(Location.prototype, 'href');
    if (locDesc && locDesc.configurable) {
      safeDefine(Location.prototype, 'href', {
        get: locDesc.get,
        set: function (url) {
          if (!isSafeDestination(url)) {
            console.warn('[bypass] Blocked location.href =', url);
            return;
          }
          locDesc.set.call(this, url);
        },
        configurable: true,
      });
    }

    // -- window.open hijack guard --
    const _origOpen = window.open.bind(window);
    window.open = function open(url, target, features) {
      if (isBlockedSrc(url)) {
        console.warn('[bypass] Blocked window.open →', url);
        return null;
      }
      return _origOpen(url, target, features);
    };
  })();


  /* ─────────────────────────────────────────────────────────────
   * 2. SCRIPT INJECTION CONTROL
   *
   * Intercepts createElement('script'), appendChild, insertBefore,
   * and prepend to prevent remote payload loaders from running.
   * Inline scripts whose text matches known patterns are also neutered.
   * ───────────────────────────────────────────────────────────── */
  (function installScriptControl() {
    /** Patterns in inline script text that indicate detection/loader code */
    const BLOCKED_INLINE_PATTERNS = [
      /freex2line/i,
      /rm\.freex2line/i,
      /adblock.*detect/i,
      /anti.*adblock/i,
      /createObjectURL\s*\(\s*new\s+Blob/i,  // inline blob-script loaders
    ];

    function shouldBlockScript(el) {
      if (!(el instanceof HTMLScriptElement)) return false;
      if (el.src && isBlockedSrc(el.src)) return true;
      if (el.src && isSuspiciousBlob(el.src)) return true;
      if (!el.src && el.textContent) {
        return BLOCKED_INLINE_PATTERNS.some(p => p.test(el.textContent));
      }
      return false;
    }

    /** Neutralise a script element without removing it (prevents sourcemap errors) */
    function neutraliseScript(el) {
      el.type  = 'application/x-blocked';  // makes browser skip it
      el.async = false;
      if (el.src) {
        el.removeAttribute('src');
      } else {
        el.textContent = '/* blocked by bypass.js */';
      }
    }

    // -- document.createElement override --
    Document.prototype.createElement = function createElement(tagName, options) {
      const el = _originals.createElement.call(document, tagName, options);
      if (typeof tagName === 'string' && tagName.toLowerCase() === 'script') {
        // Wrap the src setter so we can intercept after creation
        const srcDesc = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src')
                     || Object.getOwnPropertyDescriptor(Element.prototype, 'src');
        if (srcDesc && srcDesc.configurable) {
          safeDefine(el, 'src', {
            get: srcDesc.get ? srcDesc.get.bind(el) : () => el.getAttribute('src'),
            set: function (val) {
              if (isBlockedSrc(val) || isSuspiciousBlob(val)) {
                console.warn('[bypass] Blocked script.src assignment:', val);
                el.type = 'application/x-blocked';
                return;
              }
              srcDesc.set ? srcDesc.set.call(el, val) : el.setAttribute('src', val);
            },
            configurable: true,
          });
        }
      }
      return el;
    };

    // -- Generic insertion gate --
    function gatedInsert(original) {
      return function (node, reference) {
        if (shouldBlockScript(node)) {
          console.warn('[bypass] Blocked script insertion:', node.src || '(inline)');
          neutraliseScript(node);
          // Still insert the neutralised element so page doesn't throw on null checks
          return original.call(this, node, reference);
        }
        return original.call(this, node, reference);
      };
    }

    Element.prototype.appendChild  = gatedInsert(_originals.appendChild);
    Element.prototype.insertBefore = gatedInsert(_originals.insertBefore);

    // -- prepend (modern API) --
    const _origPrepend = Element.prototype.prepend;
    if (_origPrepend) {
      Element.prototype.prepend = function prepend(...nodes) {
        nodes.forEach(n => {
          if (n instanceof HTMLScriptElement && shouldBlockScript(n)) {
            console.warn('[bypass] Blocked script via prepend:', n.src || '(inline)');
            neutraliseScript(n);
          }
        });
        return _origPrepend.apply(this, nodes);
      };
    }

    // -- document.write / writeln (classic loader technique) --
    const _origWrite = document.write.bind(document);
    document.write = function (markup) {
      if (typeof markup === 'string' && /freex2line|anti.?adblock/i.test(markup)) {
        console.warn('[bypass] Blocked document.write with suspicious markup');
        return;
      }
      _origWrite(markup);
    };
    document.writeln = document.write;
  })();


  /* ─────────────────────────────────────────────────────────────
   * 3. BLOB / DYNAMIC-EXECUTION BLOCKING
   *
   * Scripts loaded via blob: URLs are a common obfuscation trick.
   * We override URL.createObjectURL to intercept blob script loading
   * and patch the Blob constructor to tag suspicious payloads.
   * ───────────────────────────────────────────────────────────── */
  (function installBlobBlocking() {
    const _BlobOrig = _originals.Blob;
    const _blobMark = Symbol('bypassBlob');

    // Tag Blobs whose MIME type is script-like
    window.Blob = function Blob(parts, options) {
      const blob = new _BlobOrig(parts, options);
      const type = (options && options.type) ? options.type.toLowerCase() : '';
      if (type.includes('javascript') || type.includes('ecmascript')) {
        blob[_blobMark] = true;
      }
      return blob;
    };
    Object.assign(window.Blob, _BlobOrig);    // carry over static props
    window.Blob.prototype = _BlobOrig.prototype;

    // Intercept createObjectURL to block script blobs
    URL.createObjectURL = function createObjectURL(obj) {
      if (obj && obj[_blobMark]) {
        console.warn('[bypass] Blocked createObjectURL for script Blob');
        return 'about:blank';  // harmless no-op URL
      }
      return _originals.createObjectURL(obj);
    };
  })();


  /* ─────────────────────────────────────────────────────────────
   * 4. AD-API SPOOFING
   *
   * Many anti-adblock detectors check whether window.adsbygoogle,
   * window.googletag, or window.google.ima are absent/broken.
   * We provide minimal stub objects that satisfy those checks.
   * ───────────────────────────────────────────────────────────── */
  (function installAdApiSpoofing() {
    // -- adsbygoogle --
    if (!window.adsbygoogle) {
      window.adsbygoogle = window.adsbygoogle || [];
      // Google's own snippet calls adsbygoogle.push(); provide a no-op push
      const _realPush = Array.prototype.push;
      window.adsbygoogle.push = function (...args) {
        return _realPush.apply(window.adsbygoogle, args);
      };
    }

    // -- googletag --
    if (!window.googletag) {
      const _cmdQueue = [];
      window.googletag = {
        cmd: {
          push: function (fn) {
            if (typeof fn === 'function') {
              try { fn(); } catch (e) {}
            }
            _cmdQueue.push(fn);
          },
        },
        defineSlot          : () => null,
        pubads              : () => ({ enableSingleRequest: ()=>{}, refresh: ()=>{}, enableLazyLoad: ()=>{}, addEventListener: ()=>{} }),
        enableServices      : () => {},
        display             : () => {},
        destroySlots        : () => true,
        sizeMapping         : () => ({ addSize: function(){ return this; }, build: ()=>[] }),
        openConsole         : () => {},
        _loaded_            : true,
      };
    }

    // -- google.ima (IMA SDK stub for video ad checks) --
    if (!window.google) window.google = {};
    if (!window.google.ima) {
      window.google.ima = {
        VERSION: '3.0.0',
        AdDisplayContainer   : function () { return { initialize: ()=>{}, destroy: ()=>{} }; },
        AdsLoader            : function () { return { addEventListener: ()=>{}, requestAds: ()=>{}, destroy: ()=>{} }; },
        AdsRequest           : function () { return {}; },
        AdsManagerLoadedEvent: { Type: { ADS_MANAGER_LOADED: 'adsManagerLoaded' } },
        AdEvent              : { Type: {} },
        AdErrorEvent         : { Type: {} },
        settings             : { setVpaidMode: ()=>{}, setLocale: ()=>{} },
      };
    }

    // -- _adsLoaded flag commonly checked by scripts --
    window._adsLoaded = true;
    window.adsLoaded  = true;
    window.canRunAds  = true;
  })();


  /* ─────────────────────────────────────────────────────────────
   * 5. DOM BAIT & offsetHeight / getComputedStyle SPOOFING
   *
   * Ad-blockers hide "bait" elements (div.ad-banner, etc.).
   * Scripts check offsetHeight === 0 or display === 'none' to detect
   * the blocker.  We override getComputedStyle and the offset* getters
   * so bait elements always appear visible.
   * ───────────────────────────────────────────────────────────── */
  (function installBaitSpoofing() {
    /** Selectors that match common bait / AD elements */
    const BAIT_PATTERNS = [
      /\bad[\s_-]?(banner|unit|container|box|slot|frame|wrapper|holder|top|bottom|left|right|sidebar|leaderboard)\b/i,
      /\b(adsbygoogle|adsense|doubleclick|dfp|gpt-ad|ad_slot|adsbox|bannerads)\b/i,
      /\bsponsored\b/i,
    ];

    function isBaitElement(el) {
      if (!el || el.nodeType !== 1) return false;
      const id = el.id || '';
      const cls = el.className || '';
      const combined = id + ' ' + cls;
      return BAIT_PATTERNS.some(p => p.test(combined));
    }

    // -- getComputedStyle override --
    window.getComputedStyle = function getComputedStyle(el, pseudo) {
      const style = _originals.getComputedStyle(el, pseudo);
      if (!isBaitElement(el)) return style;

      // Return a Proxy that overrides display/visibility/opacity for bait els
      return new Proxy(style, {
        get(target, prop) {
          if (prop === 'display')    return 'block';
          if (prop === 'visibility') return 'visible';
          if (prop === 'opacity')    return '1';
          const val = Reflect.get(target, prop);
          return typeof val === 'function' ? val.bind(target) : val;
        },
      });
    };

    // -- offsetHeight / offsetWidth getters --
    const offsetProps = ['offsetHeight', 'offsetWidth', 'clientHeight', 'clientWidth'];
    offsetProps.forEach(prop => {
      const desc = Object.getOwnPropertyDescriptor(HTMLElement.prototype, prop);
      if (!desc || !desc.configurable) return;
      safeDefine(HTMLElement.prototype, prop, {
        get: function () {
          const real = desc.get.call(this);
          if (real === 0 && isBaitElement(this)) return 1;
          return real;
        },
        configurable: true,
      });
    });

    // -- Inject invisible bait element that always reports "visible" --
    // (helps with scripts that create their own bait via innerHTML)
    function ensureBaitElement() {
      if (document.getElementById('__bypassBait')) return;
      const bait = document.createElement('div');
      bait.id = 'adsbox';   // classic bait ID checked by many scripts
      bait.className = 'ads ad adsbox doubleclick ad-placement';
      bait.style.cssText = 'position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;';
      bait.setAttribute('data-bypass', 'true');
      (document.body || document.documentElement).appendChild(bait);
    }
    if (document.body) ensureBaitElement();
    else document.addEventListener('DOMContentLoaded', ensureBaitElement);
  })();


  /* ─────────────────────────────────────────────────────────────
   * 6. IMAGE & CANVAS PROTECTION
   *
   * Some detectors load a tiny img from a known-blocked ad URL and
   * check naturalWidth === 0.  Canvas fingerprinting via getImageData
   * can also be used.  We spoof both.
   * ───────────────────────────────────────────────────────────── */
  (function installImageCanvasProtection() {
    // -- Image naturalWidth / naturalHeight --
    ['naturalWidth', 'naturalHeight'].forEach(prop => {
      const desc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, prop);
      if (!desc || !desc.configurable) return;
      safeDefine(HTMLImageElement.prototype, prop, {
        get: function () {
          const real = desc.get.call(this);
          // If the image failed to load (blocked) but its src looks like an ad tracker,
          // pretend it loaded successfully with a 1×1 size.
          if (real === 0) {
            const src = this.src || '';
            if (/doubleclick|googlesyndication|adservice|pagead|adsbygoogle|freex2line/i.test(src)) {
              return prop === 'naturalWidth' ? 1 : 1;
            }
          }
          return real;
        },
        configurable: true,
      });
    });

    // -- Canvas getImageData --
    // Return a consistent non-zero ImageData so fingerprint checks get a stable result
    const _origGetImageData = _originals.getImageData;
    CanvasRenderingContext2D.prototype.getImageData = function getImageData(sx, sy, sw, sh) {
      try {
        const data = _origGetImageData.call(this, sx, sy, sw, sh);
        // If caller is just checking "is canvas accessible?" (data all zeros → blocked env)
        // nudge the first pixel slightly so it looks normal.
        if (data.data[3] === 0) data.data[3] = 255;
        return data;
      } catch (e) {
        // Fallback: return a 1×1 safe ImageData
        return new ImageData(new Uint8ClampedArray([0, 0, 0, 255]), 1, 1);
      }
    };
  })();


  /* ─────────────────────────────────────────────────────────────
   * 7. OBSERVER NEUTRALIZATION
   *
   * Anti-adblock scripts use MutationObserver to watch the DOM and
   * hide content when they detect an ad-blocker.  We wrap the
   * MutationObserver constructor and filter out callbacks from
   * blocked-origin scripts, and neutralise TreeWalker misuse.
   * ───────────────────────────────────────────────────────────── */
  (function installObserverNeutralization() {
    const _MO = _originals.MutationObserver;

    /**
     * Check if a callback function originates from a blocked domain
     * by inspecting its source string for domain references.
     * This is a heuristic — it won't catch all cases but does stop
     * the most common patterns.
     */
    function isBlockedCallback(fn) {
      if (typeof fn !== 'function') return false;
      try {
        const src = fn.toString();
        return BLOCKED_HOSTS.some(h => src.includes(h)) ||
               /adblock.*detect|detect.*adblock|location\.(replace|assign|href)\s*=/i.test(src);
      } catch { return false; }
    }

    window.MutationObserver = function MutationObserver(callback) {
      // Wrap the callback to strip mutations that trigger anti-adblock logic
      const safeCallback = function (mutations, observer) {
        if (isBlockedCallback(callback)) return;  // skip entirely
        try { callback(mutations, observer); } catch (e) {}
      };
      return new _MO(safeCallback);
    };
    window.MutationObserver.prototype = _MO.prototype;

    // -- TreeWalker: wrap createTreeWalker to neutralise deep DOM scanners --
    // The original still works; we only limit it when the filter function
    // looks suspicious.
    const _origCTW = _originals.createTreeWalker;
    document.createTreeWalker = function createTreeWalker(root, whatToShow, filter, expandEntityReferences) {
      if (filter && isBlockedCallback(filter)) {
        // Return a walker that immediately ends iteration
        return _origCTW.call(document, root, whatToShow, { acceptNode: () => 4 /* FILTER_REJECT */ }, expandEntityReferences);
      }
      return _origCTW.call(document, root, whatToShow, filter, expandEntityReferences);
    };
  })();


  /* ─────────────────────────────────────────────────────────────
   * 8. DOM-DESTRUCTION PROTECTION
   *
   * Prevents anti-adblock scripts from destroying content sections
   * or overlaying the page with a block message.
   * We intercept Element.prototype.remove and the innerHTML setter.
   * Only suspicious / high-impact mutations are blocked.
   * ───────────────────────────────────────────────────────────── */
  (function installDomProtection() {
    /** IDs / classes of critical page elements we never allow to be removed */
    const PROTECTED_SELECTORS = [
      '#watch', '.watch__area', '.downloads__tabs',
      '#player', '.player', '#main', 'main',
      '#content', '.content', 'article',
    ];

    function isProtectedEl(el) {
      if (!el || el.nodeType !== 1) return false;
      return PROTECTED_SELECTORS.some(sel => {
        try { return el.matches(sel); } catch { return false; }
      });
    }

    // -- Element.prototype.remove --
    Element.prototype.remove = function remove() {
      if (isProtectedEl(this)) {
        console.warn('[bypass] Blocked .remove() on protected element:', this.id || this.className);
        return; // silently ignore
      }
      return _originals.elementRemove.call(this);
    };

    // -- innerHTML setter guard --
    const _innerHTMLDesc = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
    if (_innerHTMLDesc && _innerHTMLDesc.configurable) {
      safeDefine(Element.prototype, 'innerHTML', {
        get: _innerHTMLDesc.get,
        set: function (val) {
          // Block full-page wipes that inject an "adblock detected" message
          if (
            this === document.body &&
            typeof val === 'string' &&
            /adblock|adblocker|ad.?block.?detect/i.test(val)
          ) {
            console.warn('[bypass] Blocked suspicious innerHTML overwrite of <body>');
            return;
          }
          _innerHTMLDesc.set.call(this, val);
        },
        configurable: true,
      });
    }

    // -- outerHTML setter guard --
    const _outerHTMLDesc = Object.getOwnPropertyDescriptor(Element.prototype, 'outerHTML');
    if (_outerHTMLDesc && _outerHTMLDesc.configurable) {
      safeDefine(Element.prototype, 'outerHTML', {
        get: _outerHTMLDesc.get,
        set: function (val) {
          if (isProtectedEl(this)) {
            console.warn('[bypass] Blocked .outerHTML on protected element');
            return;
          }
          _outerHTMLDesc.set.call(this, val);
        },
        configurable: true,
      });
    }
  })();


  /* ─────────────────────────────────────────────────────────────
   * 9. CLEANUP & PERIODIC GUARDS
   *
   * Runs after DOMContentLoaded to clean up any anti-adblock
   * elements that slipped through initial injection and to undo any
   * style overrides the page applied to content sections.
   * ───────────────────────────────────────────────────────────── */
  (function installPeriodicGuards() {
    /** Elements to force-show if hidden */
    const UNHIDE_SELECTORS = ['.watch__area', '.downloads__tabs', '#player'];

    /** Elements to remove if they match anti-adblock patterns */
    const ADBLOCK_NOTICE_SELECTORS = [
      '.anti-adblock-message',
      '#anti-adblock',
      '#adblock-notice',
      '#adblock-overlay',
      '.adblock-overlay',
      '.adblock-wall',
      '[id*="adblock"][id*="message"]',
      '[class*="adblock"][class*="message"]',
    ];

    function periodicCleanup() {
      // 1. Remove anti-adblock notices
      ADBLOCK_NOTICE_SELECTORS.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          try { _originals.elementRemove.call(el); } catch {}
        });
      });

      // 2. Restore hidden content sections
      UNHIDE_SELECTORS.forEach(sel => {
        const el = document.querySelector(sel);
        if (el) {
          const s = el.getAttribute('style') || '';
          if (/display\s*:\s*none/i.test(s)) {
            el.style.setProperty('display', 'block', 'important');
          }
        }
      });

      // 3. Prevent body scroll-lock injected by overlay scripts
      if (document.body) {
        const bs = document.body.style;
        if (bs.overflow === 'hidden' || bs.position === 'fixed') {
          bs.overflow = '';
          bs.position = '';
        }
      }
    }

    document.addEventListener('DOMContentLoaded', function () {
      periodicCleanup();
      const guardInterval = setInterval(periodicCleanup, 800);
      setTimeout(() => clearInterval(guardInterval), 30000);
    });

    // Also run once immediately (some injections happen before DOMContentLoaded)
    periodicCleanup();

    /* ── freex2line.online — domain-specific guard ── */
    if (location.hostname.includes('freex2line.online') || location.hostname.includes('rm.freex2line.online')) {
      // Force the download button visible as soon as it appears
      const freexInterval = setInterval(function () {
        const btn = document.querySelector('#downloadbtn, .downloadbtn, #download-button, #d-button');
        if (btn) {
          btn.style.setProperty('display', 'inline-block', 'important');
          btn.style.setProperty('opacity', '1', 'important');
          btn.style.setProperty('visibility', 'visible', 'important');
          const loader = document.querySelector('#download-loading, #d-loading, .download-loading');
          if (loader) loader.style.display = 'none';
          clearInterval(freexInterval);
        }
      }, 500);
      setTimeout(() => clearInterval(freexInterval), 30000);
    }

    /* ── cimanow.cc — domain-specific guard ── */
    if (location.hostname.includes('cimanow.cc') || location.hostname.includes('cimanow')) {
      // Continuously ensure the watch area and download tabs aren't hidden
      const cimaInterval = setInterval(function () {
        ['.watch__area', '.downloads__tabs', '#player', '.player-container'].forEach(sel => {
          const el = document.querySelector(sel);
          if (el && (el.style.display === 'none' || el.style.visibility === 'hidden')) {
            el.style.setProperty('display', 'block', 'important');
            el.style.setProperty('visibility', 'visible', 'important');
          }
        });
        // Remove any injected overlay / modal that cimanow throws up
        document.querySelectorAll('.swal2-container, .anti-adblock-message, #anti-adb-overlay').forEach(el => {
          try { _originals.elementRemove.call(el); } catch {}
        });
      }, 600);
      setTimeout(() => clearInterval(cimaInterval), 30000);
    }
  })();

})();
