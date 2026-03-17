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
            '#adContainer', '#adsLionz', '#xqeqjp', '#xqeqjp1', '#xqeqjp3',
            'div[id^="div-gpt-ad"]', '#fixedban7', '#downloadButton', '#normal-box',
            '#appStickyBanner', '.app-install-promo'
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
    
    // (Optional) WebAssembly or window properties intercepts can be placed here
})();
