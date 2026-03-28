// script_2.js - Injected on onPageStarted
(function () {
  // --- ANTI-ADBLOCK DETECTION BYPASS (PRE-LOAD) ---
  (function() {
    const noop = function() {};
    const trueProp = { get: () => true, enumerable: true };
    const oneProp = { get: () => 1, enumerable: true };
    const emptyObjProp = { get: () => ({}), enumerable: true };
    const emptyArrProp = { get: () => [], enumerable: true };

    // 1. Mock Google Ad Objects
    const mockObjects = {
      google: {
        ima: {
          AdDisplayContainer: noop,
          AdsLoader: noop,
          AdsRequest: noop,
          AdsRenderingSettings: noop,
          ViewMode: {},
          AdEvent: { Type: {} },
          AdErrorEvent: { Type: {} },
          loaded: true
        },
        tag: { apiReady: true },
        afc: { loaded: true }
      },
      adsbygoogle: Object.assign([], { loaded: true }),
      googletag: {
        apiReady: true,
        pubadsReady: true,
        cmd: Object.assign([], { push: (fn) => { if (typeof fn === 'function') fn(); return 1; } }),
        pubads: () => ({
          addEventListener: noop,
          setTargeting: noop,
          enableSingleRequest: noop,
          collapseEmptyDivs: noop,
          disableInitialLoad: noop,
          getSlots: () => [],
          refresh: noop
        }),
        enableServices: noop,
        display: noop,
        defineSlot: () => ({ addService: () => ({ setTargeting: noop }) })
      },
      canRunAds: true,
      psuperat: true,
      blockAdBlock: {
        on: noop,
        onDetected: noop,
        onNotDetected: (fn) => { if (typeof fn === 'function') fn(); },
        check: noop
      }
    };

    // Safely apply mocks
    for (const [key, value] of Object.entries(mockObjects)) {
      if (!(key in window)) {
        try {
          Object.defineProperty(window, key, {
            value: value,
            writable: true,
            configurable: true,
            enumerable: true
          });
        } catch (e) {}
      }
    }

    // Additional checks for properties detection scripts use
    if (window.google) {
      if (!window.google.ima) window.google.ima = mockObjects.google.ima;
      window.google.ima.loaded = true;
    }
    
    // 1.5 'Native Code' spoofing for bypassed functions (for Snippet 2/5 detection)
    const nativeCodeStr = 'function () { [native code] }';
    const originalToString = Function.prototype.toString;
    Function.prototype.toString = function() {
        if (this === window.fetch || this === window.location.replace || this === MutationObserver.prototype.observe) {
            return nativeCodeStr.replace('()', ' ' + this.name + '()');
        }
        return originalToString.apply(this, arguments);
    };

    // 2. Prevent common detection redirection methods
    const originalReplace = window.location.replace;
    window.location.replace = function(url) {
      if (typeof url === 'string' && (url.includes('google.com') || url.includes('about:blank'))) {
        console.warn('Blocked anti-adblock redirect to:', url);
        return;
      }
      return originalReplace.apply(this, arguments);
    };

    // 3. Mock Bait/Detection element behavior
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
      const el = originalCreateElement.apply(this, arguments);
      if (tagName && tagName.toLowerCase() === 'div') {
        Object.defineProperties(el, {
          offsetHeight: { get: () => 10, configurable: true },
          offsetWidth: { get: () => 10, configurable: true },
          clientHeight: { get: () => 10, configurable: true },
          clientWidth: { get: () => 10, configurable: true }
        });
        el.getBoundingClientRect = function() {
           return { top: 10, left: 10, bottom: 20, right: 20, width: 10, height: 10, x: 10, y: 10 };
        };
      }
      return el;
    };

    // 4. Mock getComputedStyle for ad-related elements
    const originalGCS = window.getComputedStyle;
    window.getComputedStyle = function(el) {
       const style = originalGCS.apply(this, arguments);
       if (el && el.nodeType === 1) {
          const id = el.id || '';
          const className = (typeof el.className === 'string' ? el.className : '');
          const isProbablyBait = id.toLowerCase().includes('ad') || className.toLowerCase().includes('ad') || el.style.display === 'none';
          if (isProbablyBait) {
             return new Proxy(style, {
                get(target, prop) {
                   if (prop === 'display') return target.display === 'none' ? 'block' : target.display;
                   if (prop === 'visibility') return 'visible';
                   if (prop === 'opacity') return '1';
                   return target[prop];
                }
             });
          }
       }
       return style;
    };

    // 5. Mock Fetch/XHR to spoof successful ad-loading
    const adPattern = /ads|google-analytics|doubleclick|googlesyndication|iva-ads/i;
    
    const originalFetch = window.fetch;
    window.fetch = function(input, init) {
      const url = typeof input === 'string' ? input : (input && input.url);
      if (url && adPattern.test(url)) {
        return Promise.resolve(new Response('', { status: 200, statusText: 'OK', headers: new Headers() }));
      }
      return originalFetch.apply(this, arguments);
    };

    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
      if (typeof url === 'string' && adPattern.test(url)) {
        this.__isAdRequest = true;
      }
      return originalOpen.apply(this, arguments);
    };

    const originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function() {
      if (this.__isAdRequest) {
        Object.defineProperty(this, 'readyState', { value: 4 });
        Object.defineProperty(this, 'status', { value: 200 });
        Object.defineProperty(this, 'responseText', { value: '' });
        if (this.onreadystatechange) this.onreadystatechange();
        if (this.onload) this.onload();
        return;
      }
      return originalSend.apply(this, arguments);
    };
  })();

  // 1. Inject CSS early to hide ads and annoyances and prevent flickering
  function injectAdblockCSS() {
    if (window.location.hostname.includes("freex2line.online")) {
      return;
    }
    var style = document.createElement("style");
    style.id = "s" + Math.random().toString(36).substr(2, 9);

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
})();
