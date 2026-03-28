// script_2.js - Injected on onPageStarted
(function() {
    // 1. Inject CSS early to hide ads and annoyances and prevent flickering
    function injectAdblockCSS() {
        var style = document.createElement('style');
        style.id = 'egyfilm-adblock-css';
        
        var selectorsToHide = [
            // Classes
            '.pm-ads-banner', '.ad-container', '.singular--bg', '.telegram_themexCom', 
            '.comp-hide.AlbaE3lan.table_top', '.separator', '.banner-inner', '.ad-unit', 
            '.hydratv', '.blog-item', 'arlionz--slider', '.live-ad-container',
            '.afcceb-bebeea', '.fjojw-ihdwiiwd', '.faded-in.nindo-popup-content-wrapper',
            '.faded-in.nindo-popup-overlay', '.afcceb-afdacf', '.swal2-container',
            '.Switcher--Watch', '.alert.alert-info', '.card.my-4', '#free-captcha',
            // Specific styles used for ads
            'div[style*="text-align: center;padding: 20px 0 10px;"]',
            'div[style*="text-align: center;padding: 0 0 30px;"]',
            'div[style*="text-align: center;padding: 20px 0 0;"]',
            // IDs
            '#tme', '#aplr-notic', '#adsx', '#hidx', '#ad_position_box', '#rewardModal', 
            '#tme-alert', '#lm-slideup', '#popup', '#ad-popup', '#ad-container', 
            '#fixedban5', '#popupOverlay', '#w3c5', '#Advert1', '#ad-unit-1', 
            '#adContainer', '#adsLionz', '#xqeqjp', '#xqeqjp1', '#xqeqjp3', '.shr-ads-container',
            'div[id^="div-gpt-ad"]', '#fixedban7', '#downloadButton', '#normal-box',
            '#appStickyBanner', '.app-install-promo', 'a[href*="arablionztv.ink"]',
            // section--titles
            'section--titles', '.Section--Titles',
            // Button presses ad networks
            '.buttonPress-1077', 'a[class^="buttonPress-"]',
            // Anti Adblock detectors
            '.anti-adblock-message'
        ];
        
        // Ensure standard overflow for sweetalert overlays
        style.innerHTML = selectorsToHide.join(', ') + ' { display: none !important; opacity: 0 !important; pointer-events: none !important; } ' +
                          'body { overflow: auto !important; }';
        
        // Attempt to inject immediately
        var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
        if (head) {
            head.appendChild(style);
        } else {
            // Document is not ready at all yet, use DOMContentLoaded
            document.addEventListener('DOMContentLoaded', function() {
                (document.head || document.documentElement).appendChild(style);
            });
        }
    }
    
    injectAdblockCSS();

    // 2. Pre-fetch setup for domains that need to do background network requests early
    if (window.location.hostname === 'ugeen.live') {
        window.__ugeenCodesPromise = (async function() {
            const API_URL = 'http://176.123.9.60:3000/v1/codes';
            const REQUEST_COUNT = 15;
            const fetchPromises = [];
            
            for (let i = 0; i < REQUEST_COUNT; i++) {
                fetchPromises.push(
                    fetch(API_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({})
                    }).catch(() => null)
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
                            const payload = JSON.parse(atob(token.split('.')[1]));
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
    document.addEventListener('DOMContentLoaded', function() {
        const scripts = document.querySelectorAll('script');
        let hexString = null;
        let label = null;
        
        for (let script of scripts) {
            if (!script.src && script.innerHTML.includes('.download-timer') && script.innerHTML.includes('release.wasm')) {
                // Match the l("HEX", "LABEL") pattern used in the inline script
                const match = script.innerHTML.match(/(["'])([0-9a-f]{100,})\1\s*,\s*(["'])(.+?)\3/i);
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
            for(let i=0; i < hexString.length; i += 2) {
                buf[i/2] = parseInt(hexString.substr(i, 2), 16);
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
                const observer = new MutationObserver(function(mutations) {
                    const dlContainers = document.querySelectorAll('.download-timer');
                    dlContainers.forEach(function(container) {
                        if (!container.hasAttribute('data-bypassed') || container.innerHTML.includes('Disable adblock')) {
                            container.setAttribute('data-bypassed', 'true');
                            container.innerHTML = "";
                            const a = document.createElement("a");
                            // Add generic classes to cover both uk-button (1cloudfile) and btn--primary (bowfile, etc.)
                            a.className = "uk-button uk-button-secondary uk-text-truncate uk-width-1-1 btn btn--primary";
                            a.style.display = "block";
                            a.style.textAlign = "center";
                            a.href = decodedUrl;
                            a.innerHTML = '<span uk-icon="icon: cloud-download" class="uk-icon"></span> ' + (label || "DOWNLOAD FILE");
                            
                            // To bypass the 2-click ad requirement in the bowfile variant, setting _blank ensures it reliably opens
                            a.target = "_blank";
                            
                            container.appendChild(a);
                        }
                    });
                });
                
                observer.observe(document.body, { childList: true, subtree: true, characterData: true });
            }
        }
    });
    
    // 4. Site-specific anti-adblock element unhider (downloads__tabs, watch__area)
    // Runs periodically to overcome intervals from the anti-adblock script overriding the DOM
    document.addEventListener('DOMContentLoaded', function() {
        setInterval(function() {
            var protectElements = ['.downloads__tabs', '.watch__area'];
            protectElements.forEach(function(selector) {
                var el = document.querySelector(selector);
                if (el) {
                    var style = el.getAttribute('style') || '';
                    if (style.includes('display: none') || style.includes('display:none')) {
                        el.style.setProperty('display', 'block', 'important');
                    }
                }
            });
            
            // Clean up the detector message
            var adblockMsg = document.querySelector('.anti-adblock-message');
            if (adblockMsg) adblockMsg.remove();
        }, 500);
    });

    // 5. Early Redirect Link Capture (Loadon)
    // (function captureEarly() {
    //     const STORAGE_KEY = 'rm_decoded_link';
    //     const url = new URL(window.location.href);
    //     if (url.pathname.includes('/loadon')) {
    //         const encoded = url.searchParams.get('link');
    //         if (encoded) {
    //             try {
    //                 // Optimized Base64 decode
    //                 let b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    //                 while (b64.length % 4) b64 += '=';
    //                 let decoded = decodeURIComponent(escape(atob(b64)));
    //                 if (decoded && decoded.startsWith('http')) {
    //                     localStorage.setItem(STORAGE_KEY, decoded);
    //                     sessionStorage.setItem(STORAGE_KEY, decoded);
    //                 }
    //             } catch(e) {
    //                 try {
    //                     let decoded = atob(encoded.replace(/-/g, '+').replace(/_/g, '/'));
    //                     if (decoded && decoded.startsWith('http')) {
    //                         localStorage.setItem(STORAGE_KEY, decoded);
    //                         sessionStorage.setItem(STORAGE_KEY, decoded);
    //                     }
    //                 } catch(err) {}
    //             }
    //         }
    //     }
    // })();

    // ============================================================
    // CimaNow & Jetload Ultimate Bypass (Early)
    // ============================================================
    const hostname = window.location.hostname;
    const isMatchedDomain = /cimanow\.cc|freex2line\.online|jetload\.pp\.ua/.test(hostname);

    if (isMatchedDomain) {
        // 1. UA and Referrer Spoofing
        const originalUA = navigator.userAgent;
        Object.defineProperty(navigator, "userAgent", { get: () => originalUA + " smart-tv", configurable: true });
        Object.defineProperty(document, "referrer", { get: () => "https://rm.freex2line.online/", configurable: true });

        // 2. Mocks
        if (!navigator.brave) {
            Object.defineProperty(navigator, "brave", { value: { isBrave: async () => false }, configurable: true });
        }
        window.adsbygoogle = window.adsbygoogle || [];
        if (!window.adsbygoogle.push || window.adsbygoogle.push !== Array.prototype.push) {
            window.adsbygoogle.push = Array.prototype.push;
        }

        // 3. Neutralize SweetAlert
        const neutralizeSwal = (obj) => {
            if (obj && obj.fire) {
                obj.fire = function () {
                    console.log("[BYPASS] Neutralized Swal call");
                    return { then: (cb) => { if (cb) cb({ isConfirmed: true }); return { catch: () => {} }; }, close: () => {} };
                };
            }
        };
        if (window.Swal) neutralizeSwal(window.Swal);
        let _swal = window.Swal;
        Object.defineProperty(window, "Swal", {
            get: () => _swal,
            set: (val) => { neutralizeSwal(val); _swal = val; },
            configurable: true,
        });

        // 4. Jetload Trigger
        const triggerName = "oHyarjtXcSSgcRkIUWjwsCUG";
        Object.defineProperty(window, triggerName, {
            get: () => function(reason) { console.log("[BYPASS] Blocked Jetload trigger:", reason); return false; },
            set: (val) => {},
            configurable: false,
        });

        // 5. createElement Interception
        const blockedScriptIds = ["dgjdg", "StopDoingThat"];
        const originalCreateElement = document.createElement.bind(document);
        document.createElement = function (tagName) {
            const element = originalCreateElement(tagName);
            if (tagName.toLowerCase() === "script") {
                const originalSetAttribute = element.setAttribute.bind(element);
                element.setAttribute = function (name, value) {
                    if (name === "id" && blockedScriptIds.includes(value)) {
                        return originalSetAttribute.call(this, name, "blocked-" + value);
                    }
                    return originalSetAttribute.call(this, name, value);
                };
                Object.defineProperty(element, "src", {
                    get() { return this._src || ""; },
                    set(value) {
                        if (value && value.startsWith("blob:")) {
                            console.log("[BYPASS] Blocked blob script injection");
                            this._src = "data:text/javascript,";
                            return;
                        }
                        this._src = value;
                    },
                });
            }
            return element;
        };

        // 6. Block obfuscated detection functions
        const blockedFunctions = [
            "rj$OkiqbwdpKXrZ", "pR_QzOmRS_ZXne", "ZNUfqx$aTXzUvxe_wzH",
            "hSIBgOvXtOWBDAhauqHkmvRL", "pBxfn_jzxUSTEY_MSsYWrGs",
            "CkTDLaIzZ_FyuaVEib", "KXwTIukSXaz$AzvAoUL_xVLuM",
            "KL$KurViyzvBGGmsvGhwv_a", "DGyAcBThMvwIajuaocjfWckbl",
            "kqdbQqPkuRKnDjQONPPPdWLLM", "ojA_KrMmpFORShJZzEOkBV$dh",
            "ROhUOpXaMiCXb_YWpOssO", "dRz$vi$xSda", "zSC$h$hfEuXBKneSnwOB",
            "_0x5d11", "_0x1e2f",
        ];
        blockedFunctions.forEach((funcName) => {
            try {
                Object.defineProperty(window, funcName, {
                    value: function () { console.log("[BYPASS] Blocked detection function:", funcName); return function () {}; },
                    writable: false,
                    configurable: true,
                });
            } catch (e) {}
        });

        // 7. Lie about dimensions
        const lieCheck = (el) => el.id === "ad1" || el.id === "ad-container" || (el.id && el.id.startsWith("xqeqjp")) || (el.className && typeof el.className === "string" && el.className.includes("ads-box"));
        const originalOH = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetHeight")?.get;
        if (originalOH) {
            Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
                get() { return lieCheck(this) ? 100 : originalOH.call(this); },
                configurable: true,
            });
        }
        const originalOW = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetWidth")?.get;
        if (originalOW) {
            Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
                get() { return lieCheck(this) ? 100 : originalOW.call(this); },
                configurable: true,
            });
        }
        const originalOP = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetParent")?.get;
        if (originalOP) {
            Object.defineProperty(HTMLElement.prototype, "offsetParent", {
                get() { 
                    const res = originalOP.call(this);
                    if (res === null && lieCheck(this)) return document.body;
                    return res;
                },
                configurable: true,
            });
        }
        const originalGCS = window.getComputedStyle;
        window.getComputedStyle = function (el, pseudoElt) {
            const style = originalGCS.call(this, el, pseudoElt);
            if (lieCheck(el)) {
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

        // 8. Protect elements from removal
        const originalRemove = Element.prototype.remove;
        Element.prototype.remove = function () {
            if ((this.tagName === "LI" && this.closest("ul.btns")) || (this.tagName === "SECTION" && this.getAttribute("aria-label") === "details")) {
                console.log("[BYPASS] Blocked removal of critical element");
                return;
            }
            return originalRemove.apply(this, arguments);
        };
        const originalRemoveChild = Element.prototype.removeChild;
        Element.prototype.removeChild = function (child) {
            if (child && child.tagName === "LI" && child.closest("ul.btns")) {
                console.log("[BYPASS] Blocked child removal");
                return child;
            }
            return originalRemoveChild.apply(this, arguments);
        };

        // 9. document.write interception
        const originalWrite = document.write;
        document.write = function (content) {
            if (typeof content === "string") {
                const sanitized = content
                    .replace(/<script[^>]*id=["'](dgjdg|StopDoingThat)["'][^>]*>[\s\S]*?<\/script>/gi, "<!-- blocked script -->")
                    .replace(/setTimeout\(function\(\)\{var _0x22dd=document\[_0x3a1b\[5\]\]\(_0x3a1b\[1\]\);/g, "setTimeout(function(){console.log('[BYPASS] Blocked ad1 check');");
                return originalWrite.call(this, sanitized);
            }
            return originalWrite.apply(this, arguments);
        };
        document.writeln = document.write;

        // 10. Image construction
        const OriginalImage = window.Image;
        const fakeImageDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAD6CAYAAAD9m+LSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3wAAAFGSURBVHhe7cExAQAAAMKg9U9tCy8gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwGzNcAAElUw9mAAAAAElFTkSuQmCC";
        window.Image = function () {
            const img = new OriginalImage();
            let _src = "";
            Object.defineProperty(img, "src", {
                get() { return _src; },
                set(value) {
                    _src = value;
                    const isAdRequest = value && (value.includes("pagead") || value.includes("googlesyndication") || value.includes("doubleclick") || value.includes("adsbygoogle"));
                    if (isAdRequest) {
                        OriginalImage.prototype.__lookupSetter__("src").call(img, fakeImageDataURL);
                        Object.defineProperty(img, "naturalWidth", { get: () => 300, configurable: true });
                        Object.defineProperty(img, "naturalHeight", { get: () => 250, configurable: true });
                        Object.defineProperty(img, "complete", { get: () => true, configurable: true });
                        setTimeout(() => img.dispatchEvent(new Event("load")), 1);
                    } else {
                        OriginalImage.prototype.__lookupSetter__("src").call(img, value);
                    }
                },
                configurable: true,
            });
            return img;
        };
        window.Image.prototype = OriginalImage.prototype;
        Object.setPrototypeOf(window.Image, OriginalImage);

        // 11. Canvas getImageData
        const originalGID = CanvasRenderingContext2D.prototype.getImageData;
        CanvasRenderingContext2D.prototype.getImageData = function (sx, sy, sw, sh) {
            const imageData = originalGID.call(this, sx, sy, sw, sh);
            if (sw <= 10 || sh <= 10) {
                for (let i = 0; i < imageData.data.length; i += 4) {
                    imageData.data[i] = Math.min(255, imageData.data[i] + Math.floor(Math.random() * 10));
                    imageData.data[i + 1] = Math.min(255, imageData.data[i + 1] + Math.floor(Math.random() * 10));
                    imageData.data[i + 2] = Math.min(255, imageData.data[i + 2] + Math.floor(Math.random() * 10));
                }
            }
            return imageData;
        };

        // 12. Network Interception
        const isAdURL = (url) => {
            if (!url) return false;
            const s = url.toString().toLowerCase();
            return s.includes("pagead") || s.includes("googlesyndication") || s.includes("adsbygoogle") || s.includes("doubleclick") || s.includes("proads") || s.includes("popads") || s.includes("viiukuhe.com") || s.includes("bvtpk.com");
        };
        const originalFetch = window.fetch;
        window.fetch = function (...args) {
            const url = typeof args[0] === "string" ? args[0] : args[0]?.url;
            if (isAdURL(url)) {
                return Promise.resolve(new Response("window.adsbygoogle = window.adsbygoogle || [];", { status: 200, statusText: "OK", headers: { "Content-Type": "application/javascript" } }));
            }
            return originalFetch.apply(this, args);
        };
        const originalXHR = window.XMLHttpRequest;
        window.XMLHttpRequest = function () {
            const xhr = new originalXHR();
            const originalOpen = xhr.open;
            xhr.open = function (method, url) {
                if (isAdURL(url)) return originalOpen.call(this, method, "data:text/javascript,");
                return originalOpen.apply(this, arguments);
            };
            return xhr;
        };
        window.XMLHttpRequest.prototype = originalXHR.prototype;
        if (navigator.sendBeacon) {
            const originalBeacon = navigator.sendBeacon;
            navigator.sendBeacon = function (url, data) {
                if (isAdURL(url)) return true;
                return originalBeacon.call(this, url, data);
            };
        }

        // 13. appendChild script blocking
        const originalAppendChild = Element.prototype.appendChild;
        Element.prototype.appendChild = function (child) {
            if (child.tagName === "SCRIPT") {
                const scriptId = child.id || "";
                const scriptSrc = child.src || "";
                const scriptText = child.textContent || "";
                if (blockedScriptIds.includes(scriptId) || scriptSrc.startsWith("blob:") || scriptSrc.includes("bvtpk.com") || (scriptText.includes("pagead") && scriptText.includes("canvas") && scriptText.length > 500)) {
                    console.log("[BYPASS] Blocked script appendChild");
                    return child;
                }
            }
            return originalAppendChild.call(this, child);
        };
    }
})();
