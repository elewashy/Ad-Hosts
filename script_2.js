// script_2.js - Injected on onPageStarted
(function () {
  // 1. Inject CSS early to hide ads and annoyances and prevent flickering
  function injectAdblockCSS() {
    if (window.location.hostname.includes("freex2line.online")) {
      return;
    }
    var style = document.createElement("style");
    style.id = "egyfilm-adblock-css";

    var selectorsToHide = [
      // Classes
      ".pm-ads-banner",
      ".ad-container",
      ".singular--bg",
      ".telegram_themexCom",
      ".comp-hide.AlbaE3lan.table_top",
      ".separator",
      ".banner-inner",
      ".ad-unit",
      ".hydratv",
      ".blog-item",
      "arlionz--slider",
      ".live-ad-container",
      ".afcceb-bebeea",
      ".fjojw-ihdwiiwd",
      ".faded-in.nindo-popup-content-wrapper",
      ".faded-in.nindo-popup-overlay",
      ".afcceb-afdacf",
      ".swal2-container",
      ".Switcher--Watch",
      ".alert.alert-info",
      ".card.my-4",
      "#free-captcha",
      // Specific styles used for ads
      'div[style*="text-align: center;padding: 20px 0 10px;"]',
      'div[style*="text-align: center;padding: 0 0 30px;"]',
      'div[style*="text-align: center;padding: 20px 0 0;"]',
      // IDs
      "#tme",
      "#aplr-notic",
      "#adsx",
      "#hidx",
      "#ad_position_box",
      "#rewardModal",
      "#tme-alert",
      "#lm-slideup",
      "#popup",
      "#ad-popup",
      "#ad-container",
      "#fixedban5",
      "#popupOverlay",
      "#w3c5",
      "#Advert1",
      "#ad-unit-1",
      "#adContainer",
      "#adsLionz",
      "#xqeqjp",
      "#xqeqjp1",
      "#xqeqjp3",
      'div[id^="div-gpt-ad"]',
      "#fixedban7",
      "#downloadButton",
      "#normal-box",
      "#appStickyBanner",
      "#sylive-banner",
      ".app-install-promo",
      'a[href*="arablionztv.ink"]',
      // section--titles
      "section--titles",
      ".Section--Titles",
      // Button presses ad networks
      ".buttonPress-1077",
      'a[class^="buttonPress-"]',
      // Anti Adblock detectors
      ".anti-adblock-message",
    ];

    // Ensure standard overflow for sweetalert overlays
    style.innerHTML =
      selectorsToHide.join(", ") +
      " { display: none !important; opacity: 0 !important; pointer-events: none !important; } " +
      "body { overflow: auto !important; }";

    // Attempt to inject immediately
    var head =
      document.head ||
      document.getElementsByTagName("head")[0] ||
      document.documentElement;
    if (head) {
      head.appendChild(style);
    } else {
      // Document is not ready at all yet, use DOMContentLoaded
      document.addEventListener("DOMContentLoaded", function () {
        (document.head || document.documentElement).appendChild(style);
      });
    }
  }

  injectAdblockCSS();

  // 2. Pre-fetch setup for domains that need to do background network requests early
  if (window.location.hostname === "ugeen.live") {
    window.__ugeenCodesPromise = (async function () {
      const API_URL = "http://176.123.9.60:3000/v1/codes";
      const REQUEST_COUNT = 15;
      const fetchPromises = [];

      for (let i = 0; i < REQUEST_COUNT; i++) {
        fetchPromises.push(
          fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
          }).catch(() => null),
        );
      }

      const uniqueCodesMap = new Map();
      const responses = await Promise.all(fetchPromises);

      for (const response of responses) {
        if (response && response.ok) {
          try {
            const json = await response.json();
            const token = json?.code?.token;
            const uri = json?.code?.uri;

            if (token && uri) {
              const payload = JSON.parse(atob(token.split(".")[1]));
              const activationCode = payload?.code?.code;

              if (activationCode && !uniqueCodesMap.has(uri)) {
                uniqueCodesMap.set(uri, activationCode);
              }
            }
          } catch (e) {
            // Ignore parsing errors
          }
        }
      }
      return uniqueCodesMap;
    })();
  }

  // 3. WebAssembly Anti-Adblock Bypass (1cloudfile, bowfile, etc.)
  // Decodes the hex string embedded in the page's inline script using brute-force XOR
  // avoiding the need to load release.wasm which may be blocked by adblockers.
  document.addEventListener("DOMContentLoaded", function () {
    const scripts = document.querySelectorAll("script");
    let hexString = null;
    let label = null;

    for (let script of scripts) {
      if (
        !script.src &&
        script.innerHTML.includes(".download-timer") &&
        script.innerHTML.includes("release.wasm")
      ) {
        // Match the l("HEX", "LABEL") pattern used in the inline script
        const match = script.innerHTML.match(
          /(["'])([0-9a-f]{100,})\1\s*,\s*(["'])(.+?)\3/i,
        );
        if (match) {
          hexString = match[2];
          label = match[4];
          break;
        }
      }
    }

    if (hexString) {
      let decodedUrl = null;
      const buf = new Uint8Array(hexString.length / 2);
      for (let i = 0; i < hexString.length; i += 2) {
        buf[i / 2] = parseInt(hexString.substr(i, 2), 16);
      }

      // Brute force the XOR key (varies per domain, e.g., 122 or 57)
      for (let key = 0; key < 256; key++) {
        let text = "";
        for (let i = 0; i < buf.length; i++) {
          text += String.fromCharCode(buf[i] ^ key);
        }
        if (text.startsWith("http")) {
          decodedUrl = text;
          break;
        }
      }

      if (decodedUrl) {
        // Forcefully inject the button and prevent the anti-adblock message from replacing it
        const observer = new MutationObserver(function (mutations) {
          const dlContainers = document.querySelectorAll(".download-timer");
          dlContainers.forEach(function (container) {
            if (
              !container.hasAttribute("data-bypassed") ||
              container.innerHTML.includes("Disable adblock")
            ) {
              container.setAttribute("data-bypassed", "true");
              container.innerHTML = "";
              const a = document.createElement("a");
              // Add generic classes to cover both uk-button (1cloudfile) and btn--primary (bowfile, etc.)
              a.className =
                "uk-button uk-button-secondary uk-text-truncate uk-width-1-1 btn btn--primary";
              a.style.display = "block";
              a.style.textAlign = "center";
              a.href = decodedUrl;
              a.innerHTML =
                '<span uk-icon="icon: cloud-download" class="uk-icon"></span> ' +
                (label || "DOWNLOAD FILE");

              // To bypass the 2-click ad requirement in the bowfile variant, setting _blank ensures it reliably opens
              a.target = "_blank";

              container.appendChild(a);
            }
          });
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
          characterData: true,
        });
      }
    }
  });

  // 4. Site-specific anti-adblock element unhider (downloads__tabs, watch__area)
  // Runs periodically to overcome intervals from the anti-adblock script overriding the DOM
  document.addEventListener("DOMContentLoaded", function () {
    setInterval(function () {
      var protectElements = [".downloads__tabs", ".watch__area"];
      protectElements.forEach(function (selector) {
        var el = document.querySelector(selector);
        if (el) {
          var style = el.getAttribute("style") || "";
          if (
            style.includes("display: none") ||
            style.includes("display:none")
          ) {
            el.style.setProperty("display", "block", "important");
          }
        }
      });

      // Clean up the detector message
      var adblockMsg = document.querySelector(".anti-adblock-message");
      if (adblockMsg) adblockMsg.remove();
    }, 500);
  });

  // =========================================================
  // BYPASS LAYER — Sections 0–8
  // Targets: rm.freex2line.online | cimanow.cc
  // Must run at onPageStarted so all prototype patches are in
  // place before ANY page script executes.
  // =========================================================
  (function () {
    var _bypassHost = window.location.hostname;
    if (
      !_bypassHost.includes('freex2line.online') &&
      !_bypassHost.includes('cimanow.cc')
    ) return;

    // ── 0. UTILITY & ORIGINAL REFERENCES ──────────────────────
    var BLOCKED_HOSTS = ['rm.freex2line.online', 'freex2line.online'];

    function isBlockedSrc(src) {
      if (!src || typeof src !== 'string') return false;
      try {
        var u = new URL(src, location.href);
        return BLOCKED_HOSTS.some(function (h) {
          return u.hostname === h || u.hostname.endsWith('.' + h);
        });
      } catch (e) { return false; }
    }

    function isSuspiciousBlob(src) {
      return typeof src === 'string' && src.startsWith('blob:');
    }

    function safeDefine(obj, prop, descriptor) {
      try {
        var ex = Object.getOwnPropertyDescriptor(obj, prop);
        if (ex && !ex.configurable) return false;
        Object.defineProperty(obj, prop, descriptor);
        return true;
      } catch (e) { return false; }
    }

    // Capture originals BEFORE anything else can tamper
    var _orig = {
      locReplace      : window.location.replace.bind(window.location),
      locAssign       : window.location.assign.bind(window.location),
      createElement   : Document.prototype.createElement.bind(document),
      appendChild     : Element.prototype.appendChild,
      insertBefore    : Element.prototype.insertBefore,
      prepend         : Element.prototype.prepend,
      BlobCtor        : window.Blob,
      createObjectURL : URL.createObjectURL.bind(URL),
      getComputedStyle: window.getComputedStyle.bind(window),
      getImageData    : CanvasRenderingContext2D.prototype.getImageData,
      MutationObserver: window.MutationObserver,
      createTreeWalker: document.createTreeWalker.bind(document),
      elementRemove   : Element.prototype.remove,
      winOpen         : window.open.bind(window),
    };

    // ── 1. REDIRECT PROTECTION ────────────────────────────────
    // Multi-layer: prototype + instance + window.location.href property.
    // safeDefine can fail silently if a descriptor is non-configurable in certain
    // WebView builds. We try EVERY possible intercept path.
    (function () {
      var CURRENT_HOST = location.hostname;

      function isSafeDestination(url) {
        if (!url || typeof url !== 'string') return true;
        try {
          var u = new URL(url, location.href);
          if (u.hostname === CURRENT_HOST) return true;
          // On freex2line.online block ALL cross-origin JS redirects (to cimanow, google, etc.)
          if (CURRENT_HOST.includes('freex2line.online')) return false;
          if (u.hostname.includes('google.') && u.pathname === '/') return false;
          if (isBlockedSrc(u.href)) return false;
          return true;
        } catch (e) { return true; }
      }

      function makeBlockedFn(original, name) {
        var fn = function () {
          var url = arguments[0];
          if (!isSafeDestination(url)) {
            console.warn('[bypass] Blocked', name, '→', url);
            return;
          }
          return original.apply(this, arguments);
        };
        fn._bypassNativeName = 'function ' + name + '() { [native code] }';
        return fn;
      }

      var replaceFn = makeBlockedFn(_orig.locReplace, 'replace');
      var assignFn  = makeBlockedFn(_orig.locAssign,  'assign');

      // Layer 1: Location.prototype (catches prototype-chain lookups)
      try { Object.defineProperty(Location.prototype, 'replace', { value: replaceFn, configurable: true, writable: true }); } catch(e) {}
      try { Object.defineProperty(Location.prototype, 'assign',  { value: assignFn,  configurable: true, writable: true }); } catch(e) {}

      // Layer 2: location instance own property (catches scripts that cache the object)
      try { Object.defineProperty(location, 'replace', { value: replaceFn, configurable: true, writable: true }); } catch(e) {}
      try { Object.defineProperty(location, 'assign',  { value: assignFn,  configurable: true, writable: true }); } catch(e) {}

      // Layer 3: href accessor — prototype then instance
      var hrefDesc = Object.getOwnPropertyDescriptor(Location.prototype, 'href')
                  || Object.getOwnPropertyDescriptor(location, 'href');
      if (hrefDesc) {
        var hrefSet = function (url) {
          if (!isSafeDestination(url)) { console.warn('[bypass] Blocked href =', url); return; }
          hrefDesc.set.call(location, url);
        };
        try { Object.defineProperty(Location.prototype, 'href', { get: hrefDesc.get, set: hrefSet, configurable: true }); } catch(e) {}
        try { Object.defineProperty(location, 'href',           { get: hrefDesc.get, set: hrefSet, configurable: true }); } catch(e) {}
      }

      // Layer 4: window.open
      window.open = makeBlockedFn(_orig.winOpen, 'open');

      // ── Native toString spoof ──────────────────────────────────
      var _origFnToString = Function.prototype.toString;
      Function.prototype.toString = function toString() {
        if (this._bypassNativeName) return this._bypassNativeName;
        return _origFnToString.call(this);
      };
    })();


    // ── 2. SCRIPT INJECTION CONTROL ──────────────────────────
    (function () {
      var BLOCKED_INLINE = [
        /freex2line/i,
        /rm\.freex2line/i,
        /adblock.*detect/i,
        /anti.*adblock/i,
        /createObjectURL\s*\(\s*new\s+Blob/i,
      ];

      function shouldBlockScript(el) {
        if (!(el instanceof HTMLScriptElement)) return false;
        if (el.src && isBlockedSrc(el.src)) return true;
        if (el.src && isSuspiciousBlob(el.src)) return true;
        if (!el.src && el.textContent) {
          return BLOCKED_INLINE.some(function (p) { return p.test(el.textContent); });
        }
        return false;
      }

      function neutralise(el) {
        el.type = 'application/x-blocked';
        if (el.src) el.removeAttribute('src');
        else el.textContent = '/* blocked by bypass.js */';
      }

      Document.prototype.createElement = function createElement(tag, opts) {
        var el = _orig.createElement.call(document, tag, opts);
        if (typeof tag === 'string' && tag.toLowerCase() === 'script') {
          var srcDesc = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src')
                     || Object.getOwnPropertyDescriptor(Element.prototype, 'src');
          if (srcDesc && srcDesc.configurable) {
            safeDefine(el, 'src', {
              get: srcDesc.get ? srcDesc.get.bind(el) : function () { return el.getAttribute('src'); },
              set: function (val) {
                if (isBlockedSrc(val) || isSuspiciousBlob(val)) {
                  console.warn('[bypass] Blocked script.src:', val);
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

      function gatedInsert(original) {
        return function (node, ref) {
          if (shouldBlockScript(node)) {
            console.warn('[bypass] Blocked script insert:', node.src || '(inline)');
            neutralise(node);
          }
          return original.call(this, node, ref);
        };
      }

      Element.prototype.appendChild  = gatedInsert(_orig.appendChild);
      Element.prototype.insertBefore = gatedInsert(_orig.insertBefore);

      if (_orig.prepend) {
        Element.prototype.prepend = function prepend() {
          var args = Array.prototype.slice.call(arguments);
          args.forEach(function (n) {
            if (n instanceof HTMLScriptElement && shouldBlockScript(n)) {
              console.warn('[bypass] Blocked script via prepend:', n.src || '(inline)');
              neutralise(n);
            }
          });
          return _orig.prepend.apply(this, args);
        };
      }

      var _origWrite = document.write.bind(document);
      document.write = function (markup) {
        if (typeof markup === 'string' && /freex2line|anti.?adblock/i.test(markup)) {
          console.warn('[bypass] Blocked document.write with suspicious markup');
          return;
        }
        _origWrite(markup);
      };
      document.writeln = document.write;
    })();

    // ── 3. BLOB / DYNAMIC-EXECUTION BLOCKING ─────────────────
    (function () {
      var _BlobOrig = _orig.BlobCtor;
      var _blobMark = '__bypassScriptBlob';

      window.Blob = function Blob(parts, options) {
        var blob = new _BlobOrig(parts, options);
        var type = (options && options.type) ? options.type.toLowerCase() : '';
        if (type.includes('javascript') || type.includes('ecmascript')) {
          blob[_blobMark] = true;
        }
        return blob;
      };
      window.Blob.prototype = _BlobOrig.prototype;

      URL.createObjectURL = function createObjectURL(obj) {
        if (obj && obj[_blobMark]) {
          console.warn('[bypass] Blocked createObjectURL for script Blob');
          return 'about:blank';
        }
        return _orig.createObjectURL(obj);
      };
    })();

    // ── 4. AD-API SPOOFING ────────────────────────────────────
    (function () {
      if (!window.adsbygoogle) {
        window.adsbygoogle = [];
        var _rp = Array.prototype.push;
        window.adsbygoogle.push = function () {
          return _rp.apply(window.adsbygoogle, arguments);
        };
      }

      if (!window.googletag) {
        var _cmd = [];
        window.googletag = {
          cmd: {
            push: function (fn) {
              if (typeof fn === 'function') { try { fn(); } catch (e) {} }
              _cmd.push(fn);
            },
          },
          defineSlot    : function () { return null; },
          pubads        : function () {
            return {
              enableSingleRequest: function () {},
              refresh            : function () {},
              enableLazyLoad     : function () {},
              addEventListener   : function () {},
            };
          },
          enableServices: function () {},
          display       : function () {},
          destroySlots  : function () { return true; },
          sizeMapping   : function () { return { addSize: function () { return this; }, build: function () { return []; } }; },
          _loaded_      : true,
        };
      }

      if (!window.google) window.google = {};
      if (!window.google.ima) {
        // IMPORTANT: Script 3 explicitly checks:
        //   typeof window.google.ima.AdDisplayContainer === 'function'
        // and redirects if true (it detects our stub).
        // AdDisplayContainer MUST NOT be a function — set to null.
        window.google.ima = {
          VERSION              : '3.0.0',
          AdDisplayContainer   : null,           // ← was a function; now null to pass check
          AdsLoader            : null,
          AdsRequest           : null,
          AdsManagerLoadedEvent: { Type: { ADS_MANAGER_LOADED: 'adsManagerLoaded' } },
          AdEvent              : { Type: {} },
          AdErrorEvent         : { Type: {} },
          settings             : { setVpaidMode: function () {}, setLocale: function () {} },
        };
      }

      window._adsLoaded = true;
      window.adsLoaded  = true;
      window.canRunAds  = true;
    })();

    // ── 4b. Node.prototype.contains SPOOF ──────────────────────
    // Script 2 uses:
    //   setInterval(function(){ if(!document.body.contains(baitEl)) redirect; }, 200)
    // The bait element may have any class name (obfuscated), so matching by class is
    // unreliable. Instead we use a document-position approach:
    //   if body.contains(el) returns false BUT the element IS still somewhere in the
    //   document (e.g. appended to <head>), return true.
    // This foils any bait-in-head trick without being fully nuclear.
    // We ALSO neutralize setInterval-based polling by tracking and clearing intervals
    // whose callback source references detection patterns.
    (function () {
      var _origContains = Node.prototype.contains;

      // Robust: if body.contains(el) is false but the element is still somewhere
      // in the document (e.g. bait appended to <head>), return true.
      // Works regardless of the bait element's class name.
      Node.prototype.contains = function contains(other) {
        var result = _origContains.call(this, other);
        if (!result && other && other.nodeType === 1) {
          try {
            if (_origContains.call(document.documentElement, other)) return true;
          } catch (e) {}
        }
        return result;
      };

      // ── setInterval / setTimeout neutralizer ──────────────────
      // Script 2's 200ms polling loop directly calls contains() and redirects.
      // Script 3's 500ms setTimeout also fires the redirect check.
      // Intercept both and nullify callbacks whose source contains redirect patterns.
      var _origSI = window.setInterval;
      var _origST = window.setTimeout;

      function isDetectionCb(fn) {
        if (typeof fn !== 'function') return false;
        try {
          var src = fn.toString();
          return /location\s*[\[.]?\s*(replace|assign|href)/.test(src) ||
                 /freex2line/i.test(src);
        } catch (e) { return false; }
      }

      window.setInterval = function setInterval(fn, delay) {
        if (isDetectionCb(fn)) {
          console.warn('[bypass] Neutralized detection setInterval');
          return _origSI(function () {}, delay);
        }
        return _origSI.apply(this, arguments);
      };

      window.setTimeout = function setTimeout(fn, delay) {
        if (isDetectionCb(fn)) {
          console.warn('[bypass] Neutralized detection setTimeout');
          return _origST(function () {}, delay);
        }
        return _origST.apply(this, arguments);
      };
    })();


    // ── 5. DOM-BAIT & offsetHeight SPOOFING ──────────────────
    (function () {
      var BAIT_RE = [
        /\bad[\s_-]?(banner|unit|container|box|slot|frame|wrapper|holder|leaderboard)\b/i,
        /\b(adsbygoogle|adsense|doubleclick|dfp|gpt-ad|adsbox|bannerads)\b/i,
      ];

      function isBait(el) {
        if (!el || el.nodeType !== 1) return false;
        var combined = (el.id || '') + ' ' + (el.className || '');
        return BAIT_RE.some(function (p) { return p.test(combined); });
      }

      window.getComputedStyle = function getComputedStyle(el, pseudo) {
        var style = _orig.getComputedStyle(el, pseudo);
        if (!isBait(el)) return style;
        return new Proxy(style, {
          get: function (target, prop) {
            if (prop === 'display')    return 'block';
            if (prop === 'visibility') return 'visible';
            if (prop === 'opacity')    return '1';
            var val = Reflect.get(target, prop);
            return typeof val === 'function' ? val.bind(target) : val;
          },
        });
      };

      ['offsetHeight', 'offsetWidth', 'clientHeight', 'clientWidth'].forEach(function (prop) {
        var desc = Object.getOwnPropertyDescriptor(HTMLElement.prototype, prop);
        if (!desc || !desc.configurable) return;
        safeDefine(HTMLElement.prototype, prop, {
          get: function () {
            var real = desc.get.call(this);
            if (real === 0 && isBait(this)) return 1;
            return real;
          },
          configurable: true,
        });
      });

      function ensureBait() {
        if (document.getElementById('__bypassBait')) return;
        var bait = document.createElement('div');
        bait.id = '__bypassBait';
        bait.className = 'ads ad adsbox doubleclick ad-placement';
        bait.style.cssText = 'position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;';
        (document.body || document.documentElement).appendChild(bait);
      }
      if (document.body) ensureBait();
      else document.addEventListener('DOMContentLoaded', ensureBait);
    })();

    // ── 6. IMAGE & CANVAS PROTECTION ─────────────────────────
    (function () {
      ['naturalWidth', 'naturalHeight'].forEach(function (prop) {
        var desc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, prop);
        if (!desc || !desc.configurable) return;
        safeDefine(HTMLImageElement.prototype, prop, {
          get: function () {
            var real = desc.get.call(this);
            if (real === 0 && /doubleclick|googlesyndication|adservice|pagead|adsbygoogle|freex2line/i.test(this.src || '')) {
              return 1;
            }
            return real;
          },
          configurable: true,
        });
      });

      CanvasRenderingContext2D.prototype.getImageData = function getImageData(sx, sy, sw, sh) {
        try {
          var data = _orig.getImageData.call(this, sx, sy, sw, sh);
          if (data.data[3] === 0) data.data[3] = 255;
          return data;
        } catch (e) {
          return new ImageData(new Uint8ClampedArray([0, 0, 0, 255]), 1, 1);
        }
      };
    })();

    // ── 7. OBSERVER NEUTRALIZATION ───────────────────────────
    (function () {
      var _MO = _orig.MutationObserver;

      function isBlockedCb(fn) {
        if (typeof fn !== 'function') return false;
        try {
          var src = fn.toString();
          return BLOCKED_HOSTS.some(function (h) { return src.includes(h); }) ||
                 /adblock.*detect|detect.*adblock|location\.(replace|assign|href)\s*=/i.test(src);
        } catch (e) { return false; }
      }

      window.MutationObserver = function MutationObserver(callback) {
        var safeCb = function (mutations, observer) {
          if (isBlockedCb(callback)) return;
          try { callback(mutations, observer); } catch (e) {}
        };
        return new _MO(safeCb);
      };
      window.MutationObserver.prototype = _MO.prototype;

      document.createTreeWalker = function createTreeWalker(root, whatToShow, filter, expand) {
        if (filter && isBlockedCb(filter)) {
          return _orig.createTreeWalker.call(document, root, whatToShow, { acceptNode: function () { return 4; } }, expand);
        }
        return _orig.createTreeWalker.call(document, root, whatToShow, filter, expand);
      };
    })();

    // ── 8. DOM-DESTRUCTION PROTECTION ────────────────────────
    (function () {
      var PROTECTED = ['#watch', '.watch__area', '.downloads__tabs', '#player', '.player', 'main', 'article'];

      function isProtected(el) {
        if (!el || el.nodeType !== 1) return false;
        return PROTECTED.some(function (sel) {
          try { return el.matches(sel); } catch (e) { return false; }
        });
      }

      Element.prototype.remove = function remove() {
        if (isProtected(this)) {
          console.warn('[bypass] Blocked .remove() on protected element:', this.id || this.className);
          return;
        }
        return _orig.elementRemove.call(this);
      };

      var _ihDesc = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
      if (_ihDesc && _ihDesc.configurable) {
        safeDefine(Element.prototype, 'innerHTML', {
          get: _ihDesc.get,
          set: function (val) {
            if (this === document.body && typeof val === 'string' && /adblock|adblocker|ad.?block.?detect/i.test(val)) {
              console.warn('[bypass] Blocked suspicious innerHTML overwrite of <body>');
              return;
            }
            _ihDesc.set.call(this, val);
          },
          configurable: true,
        });
      }

      var _ohDesc = Object.getOwnPropertyDescriptor(Element.prototype, 'outerHTML');
      if (_ohDesc && _ohDesc.configurable) {
        safeDefine(Element.prototype, 'outerHTML', {
          get: _ohDesc.get,
          set: function (val) {
            if (isProtected(this)) {
              console.warn('[bypass] Blocked .outerHTML on protected element');
              return;
            }
            _ohDesc.set.call(this, val);
          },
          configurable: true,
        });
      }
    })();

  })(); // end bypass sections 0–8
})();
