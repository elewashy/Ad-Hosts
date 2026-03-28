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
      ".shr-ads-container",
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
  
  // 5. CimaNow & Jetload Ultimate Bypass
  (function () {
    // Spoof User-Agent and Referrer
    const oUA = navigator.userAgent;
    try {
      Object.defineProperty(navigator, "userAgent", {
        get: () => oUA + " smart-tv",
        configurable: true,
      });
      Object.defineProperty(document, "referrer", {
        get: () => "https://rm.freex2line.online/",
        configurable: true,
      });
    } catch (e) {}

    // Mock Brave and adsbygoogle
    if (!navigator.brave) {
      try {
        Object.defineProperty(navigator, "brave", {
          value: { isBrave: async () => false },
          configurable: true,
        });
      } catch (e) {}
    }
    window.adsbygoogle = window.adsbygoogle || [];
    if (
      !window.adsbygoogle.push ||
      window.adsbygoogle.push !== Array.prototype.push
    ) {
      window.adsbygoogle.push = Array.prototype.push;
    }

    // Neutralize Swal
    const neutralizeSwal = (obj) => {
      if (obj && obj.fire) {
        obj.fire = function () {
          return {
            then: (cb) => {
              if (cb) cb({ isConfirmed: true });
              return { catch: () => {} };
            },
            close: () => {},
          };
        };
      }
    };
    if (window.Swal) neutralizeSwal(window.Swal);
    let _swal = window.Swal;
    try {
      Object.defineProperty(window, "Swal", {
        get: () => _swal,
        set: (val) => {
          neutralizeSwal(val);
          _swal = val;
        },
        configurable: true,
      });
    } catch (e) {}

    // Block Jetload trigger
    const blockTrigger = () => {
      const triggerName = "oHyarjtXcSSgcRkIUWjwsCUG";
      try {
        Object.defineProperty(window, triggerName, {
          get: () => {
            return function () {
              return false;
            };
          },
          set: () => {},
          configurable: false,
        });
      } catch (e) {}
    };
    blockTrigger();

    // Block script IDs and blob URLs
    const blockedScriptIds = ["dgjdg", "StopDoingThat"];
    const origCE = document.createElement.bind(document);
    document.createElement = function (tagName) {
      const el = origCE(tagName);
      if (tagName.toLowerCase() === "script") {
        const origSA = el.setAttribute.bind(el);
        el.setAttribute = function (name, value) {
          if (name === "id" && blockedScriptIds.includes(value)) {
            return origSA.call(this, name, "blocked-" + value);
          }
          return origSA.call(this, name, value);
        };
        Object.defineProperty(el, "src", {
          get() {
            return this._src || "";
          },
          set(value) {
            if (value && value.startsWith("blob:")) {
              this._src = "data:text/javascript,";
              return;
            }
            this._src = value;
          },
        });
      }
      return el;
    };

    // Block detection functions
    const blockedFunctions = [
      "rj$OkiqbwdpKXrZ", "pR_QzOmRS_ZXne", "ZNUfqx$aTXzUvxe_wzH",
      "hSIBgOvXtOWBDAhauqHkmvRL", "pBxfn_jzxUSTEY_MSsYWrGs",
      "CkTDLaIzZ_FyuaVEib", "KXwTIukSXaz$AzvAoUL_xVLuM",
      "KL$KurViyzvBGGmsvGhwv_a", "DGyAcBThMvwIajuaocjfWckbl",
      "kqdbQqPkuRKnDjQONPPPdWLLM", "ojA_KrMmpFORShJZzEOkBV$dh",
      "ROhUOpXaMiCXb_YWpOssO", "dRz$vi$xSda", "zSC$h$hfEuXBKneSnwOB",
      "_0x5d11", "_0x1e2f",
    ];
    blockedFunctions.forEach((func) => {
      try {
        Object.defineProperty(window, func, {
          value: () => () => {},
          writable: false,
          configurable: true,
        });
      } catch (e) {}
    });

    // Lie about dimensions and visibility
    const isAdEl = (el) =>
      el.id === "ad1" ||
      el.id === "ad-container" ||
      (el.id && el.id.startsWith("xqeqjp")) ||
      (typeof el.className === "string" && el.className.includes("ads-box"));

    const propGet = (proto, prop) =>
      Object.getOwnPropertyDescriptor(proto, prop)?.get;

    const oOH = propGet(HTMLElement.prototype, "offsetHeight");
    if (oOH) {
      Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
        get() {
          return isAdEl(this) ? 100 : oOH.call(this);
        },
        configurable: true,
      });
    }
    const oOW = propGet(HTMLElement.prototype, "offsetWidth");
    if (oOW) {
      Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
        get() {
          return isAdEl(this) ? 100 : oOW.call(this);
        },
        configurable: true,
      });
    }
    const oOP = propGet(HTMLElement.prototype, "offsetParent");
    if (oOP) {
      Object.defineProperty(HTMLElement.prototype, "offsetParent", {
        get() {
          const res = oOP.call(this);
          return res === null && isAdEl(this) ? document.body : res;
        },
        configurable: true,
      });
    }
    const oGCS = window.getComputedStyle;
    window.getComputedStyle = function (el, pseudo) {
      const style = oGCS.call(this, el, pseudo);
      if (isAdEl(el)) {
        return new Proxy(style, {
          get(target, prop) {
            if (prop === "display") return "block";
            if (prop === "visibility") return "visible";
            if (prop === "opacity") return "1";
            return target[prop];
          },
        });
      }
      return style;
    };

    // Protect important elements
    const oRem = Element.prototype.remove;
    Element.prototype.remove = function () {
      if (this.tagName === "LI" && this.closest("ul.btns")) return;
      if (
        this.tagName === "SECTION" &&
        this.getAttribute("aria-label") === "details"
      )
        return;
      return oRem.apply(this, arguments);
    };
    const oRC = Element.prototype.removeChild;
    Element.prototype.removeChild = function (child) {
      if (child && child.tagName === "LI" && child.closest("ul.btns"))
        return child;
      return oRC.apply(this, arguments);
    };

    // document.write sanitization
    const oWrite = document.write;
    document.write = function (content) {
      if (typeof content === "string") {
        const sanitized = content
          .replace(/<script[^>]*id=["'](dgjdg|StopDoingThat)["'][^>]*>[\s\S]*?<\/script>/gi, "")
          .replace(/setTimeout\(function\(\)\{var _0x22dd=document\[_0x3a1b\[5\]\]\(_0x3a1b\[1\]\);/g, "setTimeout(function(){");
        return oWrite.call(this, sanitized);
      }
      return oWrite.apply(this, arguments);
    };
    document.writeln = document.write;

    // Image mocking
    const OImg = window.Image;
    const canv = document.createElement("canvas");
    canv.width = 300; canv.height = 250;
    const fCtx = canv.getContext("2d");
    fCtx.fillStyle = "#45B7D1";
    fCtx.fillRect(0, 0, 300, 250);
    const fakeData = canv.toDataURL("image/png");

    window.Image = function () {
      const img = new OImg();
      let _s = "";
      Object.defineProperty(img, "src", {
        get: () => _s,
        set(v) {
          _s = v;
          const isA = v && (v.includes("pagead") || v.includes("doubleclick") || v.includes("adsbygoogle"));
          if (isA) {
            OImg.prototype.__lookupSetter__("src").call(img, fakeData);
            Object.defineProperty(img, "naturalWidth", { get: () => 300 });
            Object.defineProperty(img, "naturalHeight", { get: () => 250 });
            Object.defineProperty(img, "complete", { get: () => true });
            setTimeout(() => img.dispatchEvent(new Event("load")), 1);
          } else {
            OImg.prototype.__lookupSetter__("src").call(img, v);
          }
        },
        configurable: true,
      });
      return img;
    };
    window.Image.prototype = OImg.prototype;

    // Canvas pixel noise
    const oGID = CanvasRenderingContext2D.prototype.getImageData;
    CanvasRenderingContext2D.prototype.getImageData = function (sx, sy, sw, sh) {
      const res = oGID.call(this, sx, sy, sw, sh);
      if (sw <= 10 || sh <= 10) {
        for (let i = 0; i < res.data.length; i += 4) {
          res.data[i] = Math.min(255, res.data[i] + Math.floor(Math.random() * 5));
        }
      }
      return res;
    };

    // Network interception
    const isAdU = (u) => {
      const s = String(u || "").toLowerCase();
      return ["pagead", "googlesyndication", "adsbygoogle", "doubleclick", "proads", "popads", "viiukuhe.com", "bvtpk.com"].some(k => s.includes(k));
    };
    const oFetch = window.fetch;
    window.fetch = function (...a) {
      const u = typeof a[0] === "string" ? a[0] : a[0]?.url;
      if (isAdU(u)) return Promise.resolve(new Response("", { status: 200 }));
      return oFetch.apply(this, a);
    };
    const OXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function () {
      const xhr = new OXHR();
      const oOpen = xhr.open;
      xhr.open = function (m, u) {
        return oOpen.call(this, m, isAdU(u) ? "data:," : u);
      };
      return xhr;
    };
    window.XMLHttpRequest.prototype = OXHR.prototype;

    // Content Protection Logic
    let protAct = false;
    const protect = () => {
      const sec = document.querySelector('section[aria-label="details"]');
      if (!sec || protAct) return;
      const orig = sec.cloneNode(true); protAct = true;
      const obs = new MutationObserver((muts) => {
        for (const m of muts) {
          if (m.type === "childList") {
            for (const n of m.addedNodes) {
              if (n.nodeType === 1 && (n.textContent.includes("الإعلانات") || n.textContent.includes("ad block"))) {
                sec.innerHTML = ""; sec.appendChild(orig.cloneNode(true)); return;
              }
            }
          }
        }
      });
      obs.observe(sec, { attributes: true, childList: true, subtree: true });
    };

    const cleanup = () => {
      document.querySelectorAll("script").forEach((s) => {
        if (blockedScriptIds.includes(s.id) || (s.src && s.src.startsWith("blob:"))) s.remove();
      });
    };

    setInterval(() => { protect(); cleanup(); }, 500);
  })();

})();
