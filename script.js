// script.js - Injected on onPageFinished
(function() {
    // ---- HELPER FUNCTIONS ----
    
    // Helper to completely isolate an element, center it, and optionally process it
    function isolateElement(selector, onIsolated) {
        var el = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (el) {
            document.body.innerHTML = "";
            document.body.appendChild(el);
            
            // Apply centering styles
            document.body.style.display = "flex";
            document.body.style.flexDirection = "column";
            document.body.style.justifyContent = "center";
            document.body.style.alignItems = "center";
            document.body.style.height = "100vh";
            document.body.style.margin = "0";
            document.body.style.backgroundColor = "#f9f9f9";
            
            if (onIsolated) onIsolated(el);
            return true;
        }
        return false;
    }

    function decodeBase64(str) {
        if (!str) return null;
        try {
            // Standardize URL-safe Base64 and add padding
            var b64 = str.replace(/-/g, '+').replace(/_/g, '/');
            while (b64.length % 4) b64 += '=';
            return decodeURIComponent(escape(atob(b64)));
        } catch (e) {
            try { 
                var b64_2 = str.replace(/-/g, '+').replace(/_/g, '/');
                while (b64_2.length % 4) b64_2 += '=';
                return atob(b64_2); 
            } catch (err) { return null; }
        }
    }

    function styleButton(btn) {
        btn.style.backgroundColor = "#1e88e5";
        btn.style.color = "#fff";
        btn.style.padding = "20px 40px";
        btn.style.fontSize = "20px";
        btn.style.border = "none";
        btn.style.borderRadius = "8px";
        btn.style.cursor = "pointer";
        btn.style.boxShadow = "0 0 20px rgba(30,136,229,0.6)";
        btn.style.textAlign = "center";
        btn.style.display = "inline-block";
        btn.style.textDecoration = "none";
        btn.style.fontFamily = "Arial, sans-serif";
        
        btn.onmouseover = function() { btn.style.backgroundColor = "#1565c0"; };
        btn.onmouseout = function() { btn.style.backgroundColor = "#1e88e5"; };
    }

    function clickWhenReady(selector, intervalMs = 500) {
        var btn = document.querySelector(selector);
        if (btn) btn.click();
    }

    // ---- AD BLOCKING & CLEANUP ----
    
    function removeAnnoyances() {
        // Remove known ad selectors to free memory
        var ads = document.querySelectorAll(`
            .pm-ads-banner, .ad-container, .singular--bg, .telegram_themexCom, 
            .comp-hide.AlbaE3lan.table_top, .separator, .banner-inner, .ad-unit, 
            .hydratv, #tme, #aplr-notic, #adsx, #hidx, #ad_position_box, #rewardModal, 
            #tme-alert, iframe[src^="data:text/html"], div[style*="text-align: center;padding: 20px 0 10px;"],
            div[style*="text-align: center;padding: 0 0 30px;"], div[style*="text-align: center;padding: 20px 0 0;"],
            .banner, .ad, #lm-slideup, #popup, #ad-popup, #ad-container, #fixedban5, 
            #popupOverlay, #w3c5, #Advert1, #ad-unit-1, #adContainer, #adsLionz,
            section--titles, .Section--Titles, .live-ad-container, .afcceb-bebeea, .fjojw-ihdwiiwd, .swal2-container,
            a[href="https://tinyurl.com/lionzlink"], a[href*="arablionztv.ink"], #appStickyBanner, .app-install-promo,
            .buttonPress-1077, a[class^="buttonPress-"], script[src*="tfnvuckb.pro"]
        `);
        ads.forEach(function(el) { if (el) el.remove(); });

        // Targeted removal for elements labeled as advertisement (Arabic and English)
        document.querySelectorAll('div, span, p, a, button').forEach(function(el) {
            var text = (el.textContent || '').trim();
            var keywords = ['إعلان', 'إعلانات', 'Advertisement', 'Ads', 'Promoted', 'Sponsor'];
            if (keywords.some(k => text === k)) {
                // If the element has a small parent or is isolated, it's likely a label or ad block
                if (el.parentElement && el.parentElement.children.length <= 3) {
                    el.parentElement.remove();
                } else {
                    el.remove();
                }
            }
        });
        
        // Specific class removals from body
        if (document.body) {
            document.body.classList.remove("post-template-default", "single", "single-post", "postid-2288", "single-format-standard", "right-sidebar", "post-layout-modern", "post-cat-10", "has-lb", "has-lb-sm", "has-sb-sep", "layout-normal", "-style-compact", "-blur", "vsc-initialized", "afcceb-dbafdacfcb");
        }
    }
    removeAnnoyances();
    // Run repeatedly to catch late-loading ads/popups
    var annoyanceInterval = setInterval(removeAnnoyances, 2000);
    setTimeout(() => clearInterval(annoyanceInterval), 20000);

    // ---- DOMAIN SPECIFIC LOGICS ----
    var hostname = window.location.hostname;
    var href = window.location.href;

    // Yallateri Adblock detect bypass
    if (hostname.includes("yallateri.com")) {
        function removeAdblockElementsSmart() {
            document.querySelectorAll("div, section, aside").forEach(el => {
                const text = (el.textContent || "").toLowerCase();
                const html = (el.innerHTML || "").toLowerCase();
                if (text.includes("ads blocker") || text.includes("block ads") || 
                    (text.includes("disable") && text.includes("ads")) || 
                    html.includes("chp-ads-block-detector")) {
                    el.remove();
                }
            });
        }
        var adblockInterval = setInterval(removeAdblockElementsSmart, 1500);
        setTimeout(() => clearInterval(adblockInterval), 30000);
        removeAdblockElementsSmart();
    }
    
    // ---- LOADON / REDIRECT BYPASS ----
    (function handleLoadon() {
        const STORAGE_KEY = 'rm_decoded_link';
        const savedLink = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
        
        if (savedLink && savedLink.startsWith('http')) {
            localStorage.removeItem(STORAGE_KEY);
            sessionStorage.removeItem(STORAGE_KEY);

            // Clean page and show direct button
            document.documentElement.innerHTML = '<html><head><title>فتح الرابط</title></head><body></body></html>';
            document.body.style.cssText = "margin:0;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0f0f0f;font-family:Arial,sans-serif;color:#fff;";

            const msg = document.createElement('div');
            msg.textContent = "جاري تحويلك... (Redirecting)";
            msg.style.marginBottom = "30px";
            msg.style.fontSize = "18px";
            document.body.appendChild(msg);

            const btn = document.createElement('a');
            btn.href = savedLink;
            btn.textContent = 'فتح الرابط';
            btn.style.cssText = "padding:20px 40px;font-size:24px;color:#fff;background:#1e88e5;text-decoration:none;border-radius:8px;box-shadow:0 0 20px rgba(30,136,229,0.6);";
            document.body.appendChild(btn);

            setTimeout(() => { 
                if (window.location.href !== savedLink) window.location.href = savedLink; 
            }, 800);
            
            throw new Error("Redirecting...");
        }
    })();
    
    // Khabrnew redirect
    if (href.includes("khabrnew.store/ta7mel")) {
        const urlParams = new URLSearchParams(window.location.search);
        const redirectedUrl = urlParams.get("postUrl");
        if (redirectedUrl) window.location.href = decodeURIComponent(redirectedUrl);
    }
    
    // Cimanow links
    document.querySelectorAll('.btns a').forEach(link => {
        if (link.href.includes('mothaqaf.cimanow.online') || link.href.includes('new.cimanow.online')) {
            link.href = 'watching';
        }
    });
    
    // Animezid links
    if (hostname.includes("animezid.show") || hostname.includes("animezid.cam") || hostname.includes("animezid.cc")) {
        var playUrl = href.replace('/watch.', '/play.');
        var bibPlayerLinks = document.querySelectorAll('#BiBplayer a, .d-grid.gap-2 a');
        bibPlayerLinks.forEach(link => {
            link.href = playUrl;
            link.removeAttribute('onclick');
        });
    }

    // TukTukHD / TukTukCinema theme link fix (Smart External Links)
    // Fixes links traps in data-real-url or Chrome Intent protocols
    document.querySelectorAll('a.smart-external-link[data-real-url]').forEach(function(link) {
        var realUrl = link.getAttribute('data-real-url');
        if (realUrl) {
            // Force normal URL behavior and remove intent traps
            link.href = realUrl;
            link.classList.remove('smart-external-link'); // Remove the target for their internal JS
            link.removeAttribute('onclick');
            
            // Re-enable clicks on child elements if the site disabled them
            var innerItem = link.querySelector('.download--item');
            if (innerItem) {
                innerItem.style.pointerEvents = 'auto';
                innerItem.style.cursor = 'pointer';
            }
        }
    });

    // Ugeen live codes (relies on window.__ugeenCodesPromise set in script_2.js)
    if (hostname === 'ugeen.live' && window.__ugeenCodesPromise) {
        window.__ugeenCodesPromise.then(uniqueCodesMap => {
            const linkElement = document.querySelector('a.header-button.navActionDownload');
            if (!linkElement || !linkElement.href) return;
            const matchingCode = uniqueCodesMap.get(linkElement.href);
            if (matchingCode) {
                const codeInput = document.querySelector('#code');
                const activateBtn = document.querySelector('#snd');
                if (codeInput) codeInput.value = matchingCode;
                if (activateBtn) setTimeout(() => activateBtn.click(), 200);
            }
        });
    }

    // Nitro link / Swiftlnx headers hiding
    if (href === "https://nitro-link.com/KnIw" || 
        href === "https://swiftlnx.com/EgyFilm_Code" ||
        href === "https://best-cash.net/EgyFilmCode") {
        var h = document.querySelector('header');
        var f = document.querySelector('footer');
        if(h) h.style.display = 'none';
        if(f) f.style.display = 'none';
    }

    // Telegram FAQ link toggle
    if (href === "https://telegram.org/faq") {
        const links = ["https://swiftlnx.com/EgyFilm_Code"];
        let currentIndex = parseInt(localStorage.getItem("linkToggleIndex") || "0");
        const currentLink = links[currentIndex % links.length];
        localStorage.setItem("linkToggleIndex", ((currentIndex + 1) % links.length).toString());
        
        document.body.innerHTML = "";
        const btn = document.createElement("button");
        btn.textContent = "اضغط للمتابعة";
        styleButton(btn);
        btn.style.position = "fixed";
        btn.style.top = "50%";
        btn.style.left = "50%";
        btn.style.transform = "translate(-50%, -50%)";
        btn.onclick = () => window.location.href = currentLink;
        document.body.appendChild(btn);
        btn.click();
    }

    // frdl domain replacement
    document.querySelectorAll("a").forEach(link => {
        if (link.href.includes("frdl.to")) {
            link.href = link.href.replace("frdl.to", "frdl.io");
        }
    });

    // Cima Now video server selection
    (function () {
        const watchList = document.querySelector('#watch');
        if (!watchList || watchList.querySelector('li[data-index="00"]')) return;
        const otherServer = watchList.querySelector('li[data-id]');
        if (!otherServer) return;

        const dataId = otherServer.getAttribute('data-id');
        const cimaNowLi = document.createElement('li');
        cimaNowLi.setAttribute('data-index', "00");
        cimaNowLi.setAttribute('data-id', dataId);
        cimaNowLi.textContent = 'Cima Now';
        cimaNowLi.className = otherServer.className;

        cimaNowLi.addEventListener('click', function () {
            document.querySelectorAll('#watch li[data-id]').forEach(li => li.classList.remove('active'));
            this.classList.add('active');
            
            fetch(`https://cimanow.cc/wp-content/themes/Cima%20Now%20New/core.php?action=switch&index=00&id=${dataId}`)
                .then(res => res.text())
                .then(response => {
                    const doc = new DOMParser().parseFromString(response, 'text/html');
                    const newIframe = doc.querySelector('iframe');
                    const embedLi = document.querySelector('#watch li[aria-label="embed"]');
                    if (embedLi && newIframe) {
                        embedLi.innerHTML = '';
                        embedLi.appendChild(newIframe);
                        
                        // Extract direct download links from the server source
                        const iframeSrc = newIframe.src;
                        if (iframeSrc) {
                            fetch(iframeSrc)
                                .then(r => r.text())
                                .then(serverHtml => {
                                    const baseUrl = new URL(iframeSrc).origin;
                                    
                                    // Extract the "file" part from Playerjs config
                                    const fileMatch = serverHtml.match(/"file"\s*:\s*\[(.*?)\]/s);
                                    const directLinks = [];
                                    
                                    if (fileMatch) {
                                        const segments = fileMatch[1].split('",');
                                        segments.forEach(seg => {
                                            const cleanSeg = seg.replace(/^[ "'\[]+|[ "'\]]+$/g, '').trim();
                                            const qMatch = cleanSeg.match(/\[?(\d+p)\]?/);
                                            const quality = qMatch ? qMatch[1] : null;
                                            let link = cleanSeg.replace(/\[.*?\]\s*/, '').trim();
                                            
                                            if (link && quality) {
                                                const fullLink = link.startsWith('http') ? link : baseUrl + link;
                                                // Correctly encode spaces in the URL
                                                const finalLink = encodeURI(fullLink);
                                                if (!directLinks.some(dl => dl.quality === quality)) {
                                                    directLinks.push({ quality, link: finalLink });
                                                }
                                            }
                                        });
                                    }

                                    if (directLinks.length > 0) {
                                        // Sort by quality descending
                                        directLinks.sort((a, b) => parseInt(b.quality) - parseInt(a.quality));
                                        
                                        // Inject a standalone download button
                                        let dlBtn = document.getElementById('cimanow-dl-shortcut');
                                        if (!dlBtn) {
                                            dlBtn = document.createElement('button');
                                            dlBtn.id = 'cimanow-dl-shortcut';
                                            dlBtn.innerHTML = '<i class="fal fa-cloud-download-alt" style="margin-left:8px;"></i>تحميل CimaNow';
                                            dlBtn.style.cssText = `
                                                display: block;
                                                width: 100%;
                                                background: #1e88e5;
                                                color: #fff;
                                                border: none;
                                                padding: 15px;
                                                border-radius: 8px;
                                                cursor: pointer;
                                                margin-top: 15px;
                                                font-weight: bold;
                                                font-size: 16px;
                                                box-shadow: 0 4px 15px rgba(30,136,229,0.3);
                                                transition: transform 0.2s;
                                            `;
                                            dlBtn.onmousedown = () => dlBtn.style.transform = "scale(0.98)";
                                            dlBtn.onmouseup = () => dlBtn.style.transform = "scale(1)";
                                            
                                            const watch = document.querySelector('#watch');
                                            if (watch) watch.parentNode.insertBefore(dlBtn, watch.nextSibling);
                                        }

                                        // Modal handler
                                        dlBtn.onclick = () => {
                                            const overlay = document.createElement('div');
                                            overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:999999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(5px);";
                                            
                                            const modal = document.createElement('div');
                                            modal.style.cssText = "background:#1a1a1a;padding:30px;border-radius:15px;width:90%;max-width:400px;box-shadow:0 0 30px rgba(30,136,229,0.3);border:1px solid #333;color:#fff;font-family:Arial,sans-serif;direction:rtl;";
                                            
                                            let html = `<h3 style="margin-top:0;text-align:center;color:#1e88e5;margin-bottom:20px;">تحميل مباشر - CimaNow</h3>`;
                                            directLinks.forEach(dl => {
                                                html += `
                                                    <a href="${dl.link}" target="_blank" style="display:flex;align-items:center;justify-content:space-between;background:#252525;color:#fff;padding:15px;margin:10px 0;text-decoration:none;border-radius:8px;font-weight:bold;border:1px solid #333;">
                                                        <span><i class="fas fa-download" style="margin-left:10px;color:#1e88e5;"></i>تحميل بجودة ${dl.quality}</span>
                                                        <span style="font-size:12px;opacity:0.6;">Direct Link</span>
                                                    </a>`;
                                            });
                                            
                                            const closeBtn = document.createElement('button');
                                            closeBtn.textContent = 'إغلاق';
                                            closeBtn.style.cssText = "width:100%;padding:10px;margin-top:15px;background:transparent;color:#888;border:none;cursor:pointer;font-size:14px;";
                                            closeBtn.onclick = () => overlay.remove();
                                            
                                            modal.innerHTML = html;
                                            modal.appendChild(closeBtn);
                                            overlay.appendChild(modal);
                                            overlay.onclick = (e) => { if(e.target === overlay) overlay.remove(); };
                                            document.body.appendChild(overlay);
                                        };
                                    }
                                }).catch(e => {});
                        }
                    }
                });
        });
        watchList.insertBefore(cimaNowLi, watchList.firstChild);
    })();

    // ---- UI MODIFICATIONS & ISOLATIONS ----

    // Specific button modifications or clicking
    var myBtn = document.getElementById('myButton');
    if (myBtn) {
        myBtn.style.display = 'none';
        var newBtn = document.createElement('button');
        newBtn.id = 'newButton';
        newBtn.innerText = 'تحميل الآن';
        styleButton(newBtn);
        newBtn.onclick = myBtn.onclick || function() {};
        myBtn.parentNode.appendChild(newBtn);
    }

    function bypassDownloadButtons() {
        // download-button bypass
        var dlButton = document.getElementById('download-button');
        if (dlButton) {
            var downloadLoading = document.getElementById('download-loading');
            if(downloadLoading) downloadLoading.style.display = 'none';
            dlButton.style.setProperty("display", "inline-block", "important");
            
            var dlButtonText = document.getElementById('download-button-text');
            if (dlButtonText) dlButtonText.style.setProperty("display", "inline-block", "important");
            
            var dataHref = dlButton.getAttribute('data-href');
            if(dataHref) {
                try { dlButton.href = atob(dataHref); } 
                catch(e) { dlButton.href = dataHref; }
            }
        }

        // d-button bypass
        var dBtn = document.getElementById('d-button');
        if (dBtn) {
            var dLoading = document.getElementById('d-loading');
            if(dLoading) dLoading.style.display = 'none';
            dBtn.style.setProperty("display", "inline-block", "important");
            
            var dBtnText = document.getElementById('d-button-text');
            if (dBtnText) dBtnText.style.setProperty("display", "inline-block", "important");
            
            var dDataHref = dBtn.getAttribute('data-href');
            if(dDataHref) {
                try { dBtn.href = atob(dDataHref); } 
                catch(e) { dBtn.href = dDataHref; }
            }
        }
    }
    bypassDownloadButtons();
    var bypassInterval = setInterval(bypassDownloadButtons, 1000);
    setTimeout(() => clearInterval(bypassInterval), 20000);

    // "Get Link" auto clicker
    var getLinkInterval = setInterval(() => {
        var btn = document.querySelector('a.get-link:not(.disabled)');
        if (btn && btn.textContent.trim().toLowerCase() === "get link") {
            clearInterval(getLinkInterval);
            btn.click();
        }
    }, 500);

    // Isolate Center Oto
    if (isolateElement("center.oto", function(el) {
        var pb = document.getElementById("progressBarContainer");
        var nb = document.getElementById("nextbutton");
        if(pb) pb.style.display = "block";
        if(nb) {
            styleButton(nb);
            nb.removeAttribute("disabled");
            nb.click();
        }
    })) return;

    // Isolate wpsafelink-landing
    if (isolateElement("#wpsafelink-landing", function(el) {
        var btn = document.querySelector("#wpsafelinkhuman");
        if(btn) {
            styleButton(btn);
            btn.click();
        }
    })) return;

    // Isolate downloadContainer10
    if (isolateElement(".mt-4.flex.justify-center.items-center.flex-col", function(el) {
        var b = el.querySelector("[download-button]");
        if(b) {
            b.classList.remove("hidden");
            styleButton(b);
        }
    })) return;

    // Isolate #form-container form
    var wrapper = document.querySelector(".wrapper");
    if (wrapper) {
        var form = wrapper.querySelector("#form-container form");
        if (isolateElement(form, function(el) {
            var b = el.querySelector("button[type='submit']");
            if(b) styleButton(b);
        })) return;
    }

    // Isolate form[name='tp'] or #btn6
    var formTp = document.querySelector("form[name='tp']");
    var btn6 = document.querySelector("#btn6");
    if (formTp) {
        isolateElement(formTp, function() { if(btn6) styleButton(btn6); });
        return;
    } else if (btn6) {
        var parentLink = btn6.closest("a") || btn6;
        isolateElement(parentLink, function() { styleButton(btn6); });
        return;
    }

    // Isolate hmVrfy
    if (isolateElement("#hmVrfy", function(el) {
        var nBtn = el.querySelector("a.button.pstL");
        if(nBtn) {
            styleButton(nBtn);
            nBtn.style.display = "none";
            setTimeout(() => {
                el.querySelectorAll("button, a:not(.pstL)").forEach(b => b.style.display = "none");
                nBtn.style.display = "block";
            }, 5000);
        }
    })) return;

    // Isolate go_down
    if (isolateElement("#go_down", function(el) {
        var loadContainer = document.getElementById("loadingBarContainer");
        var goD = document.getElementById("go_d");
        if(loadContainer) loadContainer.style.display = "block";
        if(goD) {
            styleButton(goD);
            goD.click();
        }
    })) return;
    
    // Isolate loading-screen or getLinkButton
    var loadingScreen = document.getElementById("loading-screen");
    var getLBtn = document.querySelector("a#yuidea-btmbtn");
    var hasLS = loadingScreen && loadingScreen.querySelector("button[onclick]");
    if (hasLS || getLBtn) {
        document.body.innerHTML = "";
        document.body.style.display = "flex";
        document.body.style.flexDirection = "column";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
        document.body.style.height = "100vh";
        document.body.style.margin = "0";
        document.body.style.backgroundColor = "#f9f9f9";

        let contBtn = null;
        if(hasLS) {
            document.body.appendChild(loadingScreen);
            contBtn = loadingScreen.querySelector("#continue-button");
            if(contBtn) {
                contBtn.disabled = false;
                styleButton(contBtn);
            }
        }
        if(getLBtn) {
            document.body.appendChild(getLBtn);
            var destBtn = getLBtn.querySelector("button") || getLBtn;
            styleButton(destBtn);
        }
        if(contBtn) contBtn.click();
        if(getLBtn) getLBtn.click();
        return;
    }

    // Isolate secondSection (hidden section)
    var secSection = document.getElementById('secondSection');
    if (secSection) {
        secSection.classList.remove('hidden');
        isolateElement(secSection, function(el) {
            el.classList.remove('b0g-white');
            el.classList.add('bg-white');
            var b = el.querySelector('a');
            if(b) {
                styleButton(b);
                b.click();
            }
        });
        return;
    }

    // Isolate wpsafe-link
    var safeLink = document.getElementById("wpsafe-link");
    if (safeLink) {
        isolateElement(safeLink, function(el) {
            styleButton(el);
            var a = el.querySelector("a");
            if(a) a.click();
        });
        return;
    }

    // Isolate redirectBtn
    var redirectBtn = document.getElementById("redirectBtn");
    if (redirectBtn) {
        isolateElement(redirectBtn, function(el) {
            styleButton(el);
            var a = el.querySelector("a");
            if(a) { a.click(); a.click(); }
        });
        return;
    }

    // Isolate safeGoL button
    var safeGoL = document.querySelector("a.button.safeGoL");
    if (safeGoL) {
        var hrefLink = safeGoL.href;
        document.body.innerHTML = "";
        var newBtn = document.createElement("a");
        newBtn.href = hrefLink;
        newBtn.textContent = "Go to Link";
        styleButton(newBtn);
        newBtn.style.position = "fixed";
        newBtn.style.top = "50%";
        newBtn.style.left = "50%";
        newBtn.style.transform = "translate(-50%, -50%)";
        document.body.appendChild(newBtn);
        return;
    }

    // DownloadMainContent countdown bypass (in-place)
    var dlMainContent = document.querySelector(".DownloadMainContent");
    if (dlMainContent) {
        var countDown = dlMainContent.querySelector("#countdown");
        var clickMe = dlMainContent.querySelector("#clickme");
        var finalBtn = dlMainContent.querySelector("#btn");
        
        if (countDown) countDown.style.display = "none";
        if (clickMe) clickMe.style.display = "none";
        
        if (finalBtn) {
            finalBtn.style.setProperty("display", "inline-block", "important");
        }
    }

})();
