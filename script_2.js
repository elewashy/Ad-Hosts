// script_2.js - Injected on onPageStarted
(function () {
  // 0. Anti-Adblock Bypass for freex2line.online and related domains
  // This mocks common ad-related globals and intercepts network requests to fool detection scripts.
  (function() {
    // 1. Mock honeypot variables
    window.zJSYdQ = true; 
    
    // 2. Mock Google Adsense (tpc.googlesyndication.com)
    if (!window.adsbygoogle) {
        window.adsbygoogle = [];
        window.adsbygoogle.loaded = true;
        window.adsbygoogle.push = function(obj) {
            return 0;
        };
    }

    // 3. Mock Google Publisher Tag (securepubads.g.doubleclick.net)
    if (!window.googletag) {
        window.googletag = {
            cmd: [],
            apiReady: true,
            _slots: [],
            pubads: function() {
                return {
                    enableSingleRequest: function() {},
                    setTargeting: function() { return this; },
                    collapseEmptyDivs: function() {},
                    enableServices: function() {},
                    disableInitialLoad: function() {},
                    addEventListener: function() { return this; },
                    refresh: function() {},
                    clear: function() {},
                    getSlots: function() { return []; },
                    setCookieOptions: function() { return this; },
                    setTagForChildDirectedTreatment: function() { return this; },
                    setPublisherProvidedId: function() { return this; },
                    setRequestNonPersonalizedAds: function() { return this; },
                    setLocation: function() { return this; }
                };
            },
            defineSlot: function() {
                return {
                    addService: function() { return this; },
                    setTargeting: function() { return this; },
                    setClickUrl: function() { return this; },
                    setCollapseMode: function() { return this; },
                    setCategoryExclusion: function() { return this; },
                    set: function() { return this; },
                    get: function() { return null; },
                    getAttributeKeys: function() { return []; }
                };
            },
            enableServices: function() {},
            display: function() {},
            destroySlots: function() {},
            pubadsReady: true,
            getVersion: function() { return "1.0.0"; },
            openConsole: function() {},
            setConfig: function() {}
        };
        
        // Handle googletag.cmd.push immediately if it was already used
        if (Array.isArray(window.googletag.cmd)) {
            const oldPush = window.googletag.cmd.push;
            window.googletag.cmd.push = function(fn) {
                if (typeof fn === 'function') {
                    try { fn(); } catch(e) {}
                }
                return 0;
            };
            // Run existing items
            while (window.googletag.cmd.length > 0) {
                const fn = window.googletag.cmd.shift();
                if (typeof fn === 'function') {
                    try { fn(); } catch(e) {}
                }
            }
        }
    }

    // 4. Mock Google Analytics
    if (!window.ga) {
        window.ga = function() { (window.ga.q = window.ga.q || []).push(arguments); };
        window.ga.l = +new Date;
    }
    if (!window.google_analytics_mod) {
        window.google_analytics_mod = true;
    }

    // 5. Intercept network requests for ad scripts
    const adDomains = ['doubleclick.net', 'googlesyndication.com', 'google-analytics.com', 'openads.js', 'fundingchoicesmessages.google.com'];
    
    // Intercept fetch
    const originalFetch = window.fetch;
    window.fetch = function(input, init) {
        const url = typeof input === 'string' ? input : (input instanceof Request ? input.url : '');
        if (adDomains.some(domain => url.includes(domain))) {
            return Promise.resolve(new Response('', {
                status: 200,
                statusText: 'OK',
                headers: { 'Content-Type': 'application/javascript' }
            }));
        }
        return originalFetch.apply(this, arguments);
    };

    // Intercept XHR
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
        this._isAdRequest = adDomains.some(domain => typeof url === 'string' && url.includes(domain));
        return originalOpen.apply(this, arguments);
    };
    const originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function() {
        if (this._isAdRequest) {
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
})();
