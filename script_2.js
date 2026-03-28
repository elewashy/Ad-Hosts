// script_2.js - Injected on onPageStarted
(function () {
  // 1. Inject CSS early to hide ads and annoyances and prevent flickering
  function injectAdblockCSS() {
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
      ".arlionz--slider",
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

    // 1. Create a style element with a random ID or no ID to avoid detection
    var style = document.createElement("style");
    // No static ID, maybe a random one if we need to reference it
    style.dataset.type = "app-styles"; 

    // 2. Use a variety of hiding techniques. 
    // display:none is easily detected by checking offsetHeight.
    // Combinations of opacity, pointer-events, and positioning are harder to detect automatically.
    var cssRules = [
      // Primary stealth rule: invisible but still has dimensions in some cases
      selectorsToHide.join(", ") + " { " +
      "display: none !important; " + // Still the most effective, but we add fallbacks
      "opacity: 0 !important; " +
      "pointer-events: none !important; " +
      "visibility: hidden !important; " +
      "position: absolute !important; " +
      "left: -9999px !important; " +
      "height: 0 !important; " +
      "z-index: -1 !important; " +
      "} ",
      
      // Fix potential body lock issues caused by ad-detectors
      "html, body { overflow: auto !important; height: auto !important; position: static !important; } "
    ];

    style.textContent = cssRules.join("\n");

    // Attempt to inject as early as possible
    var target = document.head || document.documentElement;
    if (target) {
      target.appendChild(style);
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        (document.head || document.documentElement).appendChild(style);
      });
    }

    // 3. Persistent removal via MutationObserver
    // This catches elements that are dynamically added and bypasses some "is it hidden" checks
    // that only run once during page load.
    var observer = new MutationObserver(function(mutations) {
      selectorsToHide.forEach(function(selector) {
        try {
          var elements = document.querySelectorAll(selector);
          elements.forEach(function(el) {
            if (el && el.parentNode) {
              // Instead of just hiding, we can remove it entirely if it's not a detector bait
              // For detectors, sometimes it's better to just leave it hidden
              if (!selector.includes("anti-adblock")) {
                el.style.setProperty("display", "none", "important");
                el.style.setProperty("visibility", "hidden", "important");
                el.style.setProperty("pointer-events", "none", "important");
              } else {
                el.remove(); // Remove detector messages immediately
              }
            }
          });
        } catch (e) {}
      });
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
  injectAdblockCSS();

  // 1.1 Global Anti-Adblock Variable Spoofing
  // Many sites check for these to decide if they should show an "AdBlock Detected" message.
  (function spoofAntiAdblock() {
    const properties = [
      'canRunAds', 'isAdBlockActive', 'no_adblock', 'adblock', 'ad_blocked',
      'is_adblock', 'ads_blocked', 'blockAdblock', 'FuckAdBlock', 'SniffAdBlock'
    ];
    
    properties.forEach(prop => {
      try {
        // Define as true (or existing) to signal that ads ARE "working" (or at least blocker is "not" active)
        // Note: For some it should be false, for some true. Usually "canRunAds" = true.
        const val = prop.toLowerCase().includes('active') || prop.toLowerCase().includes('blocked') ? false : true;
        
        Object.defineProperty(window, prop, {
          get: () => val,
          set: () => {},
          enumerable: true,
          configurable: true
        });
      } catch (e) {}
    });

    // Mock Google AdSense/ad-networks presence
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.loaded = true;
    
    // Some sites check if certain functions exist
    window.ga = window.ga || function(){};
  })();

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
