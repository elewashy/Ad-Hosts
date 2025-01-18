(function() {
    // اظهار العنصر الأول
    var button = document.getElementById('btn');
    if (button) {
        button.style.display = 'block';
        button.style.visibility = 'visible';
        button.style.opacity = '1';
    }
    
    // اظهار زر التحميل
    var downloadBtn = document.getElementById('downloadbtn');
    if (downloadBtn) {
        downloadBtn.style.display = 'block';
        downloadBtn.style.visibility = 'visible';
        downloadBtn.style.opacity = '1';
    }
    
    // اخفاء العنصر clickme وزر start
    var clickMe = document.getElementById('clickme');
    if (clickMe) {
        clickMe.style.display = 'none';
    }
    
    var startBtn = document.getElementById('start');
    if (startBtn) {
        startBtn.style.display = 'none';
    }

    var myButton = document.getElementById('myButton');

    if (myButton) {
        // حفظ وظيفة الزر القديم (إذا كانت موجودة)
        var oldFunction = myButton.onclick;
    
        // إخفاء الزر الحالي
        myButton.style.display = 'none';
    
        // إنشاء زر جديد
        var newButton = document.createElement('button');
        newButton.id = 'newButton';
    
        // تصميم الزر الجديد
        newButton.style.backgroundColor = '#007bff';
        newButton.style.color = '#fff';
        newButton.style.border = 'none';
        newButton.style.borderRadius = '5px';
        newButton.style.padding = '10px 20px';
        newButton.style.fontSize = '16px';
        newButton.style.cursor = 'pointer';
        newButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        newButton.style.transition = 'background-color 0.3s ease';
    
        // تغيير لون الخلفية عند التمرير
        newButton.addEventListener('mouseover', function () {
            newButton.style.backgroundColor = '#0056b3';
        });
        newButton.addEventListener('mouseout', function () {
            newButton.style.backgroundColor = '#007bff';
        });
    
        // النص
        newButton.innerText = 'تحميل الآن';
    
        // تطبيق وظيفة الزر القديم على الزر الجديد
        if (oldFunction) {
            newButton.onclick = oldFunction;
        } else {
            // إذا لم يكن للزر القديم وظيفة، أضف وظيفة افتراضية
            newButton.addEventListener('click', function () {
                alert('تم الضغط على الزر الجديد!');
            });
        }
    
        // إضافة الزر الجديد إلى نفس المكان
        myButton.parentNode.appendChild(newButton);
    }
        
    var alertElement = document.querySelector('.alert.alert-info');
    if (alertElement) {
        alertElement.style.display = 'none';
    }
    var cardElement = document.querySelector('.card.my-4');
    if (cardElement) {
        cardElement.style.display = 'none';
    }
   
    // تفعيل زر تحميل مجاني
    var downloadBtnFree = document.querySelector('.downloadbtnfree');
    if (downloadBtnFree) {
        downloadBtnFree.disabled = false; // تفعيل الزر
        downloadBtnFree.innerText = 'Download Now'; // تغيير النص إلى "تحميل الآن" أو أي نص تريده
    }

    // إخفاء عنصر العد التنازلي
    var countdown = document.getElementById('countdown');
    if (countdown) {
        countdown.style.display = 'none'; // إخفاء العنصر
    }

    // إخفاء عنصر كود الكابتشا
    var captcha = document.getElementById('free-captcha');
    if (captcha) {
        captcha.style.display = 'none'; // إخفاء العنصر
    }

    // إزالة الإعلانات
    var adDivs = [
        "div[id^='div-gpt-ad']",
        "#fixedban7",
        "div[id^='div-gpt-ad-1731043087246-0']",
        "div[id^='div-gpt-ad-1735626645597-0']",
        "div[id^='div-gpt-ad-1735626655940-0']",
        "#downloadButton",

    ];

    adDivs.forEach(function(selector) {
        var adDiv = document.querySelector(selector);
        if (adDiv) {
            adDiv.remove();
        }
    });

    // إخفاء iframe الذي يبدأ بـ 'data:text/html;charset=utf-8;base64'
    document.querySelectorAll('iframe').forEach(function(iframe) {
        if (iframe.src && iframe.src.startsWith('data:text/html;charset=utf-8;base64')) {
            iframe.style.display = 'none'; // إخفاء الـ iframe
            iframe.remove(); // أو يمكنك إزالته تمامًا
        }   
    });

    // تحقق إذا كان الرابط يحتوي على domain ma3refa.online
    if (window.location.href.includes("ma3refa.online/ta7mel")) {
        // الحصول على الرابط النهائي
        const urlParams = new URLSearchParams(window.location.search);
        const redirectedUrl = urlParams.get("postUrl");
    
        // إعادة توجيه المستخدم إلى الرابط النهائي إذا وجد
        if (redirectedUrl) {
            window.location.href = decodeURIComponent(redirectedUrl);
        }
    }
    
    // إخفاء العنصر normal-box
    var normalBox = document.getElementById('normal-box');
    if (normalBox) {
        normalBox.style.display = 'none'; // إخفاء العنصر
    }
    
    // إخفاء العنصر الذي يحتوي على صورة الروابط
    var adBox = document.querySelector('div[style="text-align: center;padding: 20px 0 10px;"]');
    if (adBox) {
        adBox.style.display = 'none'; // إخفاء العنصر
    }

    // إخفاء العنصر الذي يحتوي على الرابط والصورة f1-1.gif
    var adBox2 = document.querySelector('div[style="text-align: center;padding: 0 0 30px;"]');
    if (adBox2) {
        adBox2.style.display = 'none'; // إخفاء العنصر
    }

    // إخفاء العنصر الذي يحتوي على الصورة Phone.jpg
    var adBox3 = document.querySelector('div[style="text-align: center;padding: 20px 0 0;"]');
    if (adBox3) {
        adBox3.style.display = 'none'; // إخفاء العنصر
    }
    
})();
    const links = document.querySelectorAll('.btns a');
    links.forEach(link => {
        if (link.href.includes('new.cimanow.online')) {
            link.href = 'watching';
        }
    });
    const links_2 = document.querySelectorAll('.Download--Wecima--Single .hoverable.activable');
    links_2.forEach(link => {
        if (link.href.includes('tgb4.top15top.shop')) {
            // أولاً، خلي الرابط نفس رابط الصفحة الحالية
            link.href = window.location.href;
    
            // بعد كده، استبدل "wecima.movie/watch" بـ "wecima-app.vercel.app/download"
            link.href = link.href.replace('wecima.stream/watch', 'wecima-app.vercel.app/download');
        }
    });
            
(function() {
    // العثور على العنصر body
    var element = document.body;

    // إزالة الكلاسات المحددة من العنصر
    element.classList.remove(
        "post-template-default", 
        "single", 
        "single-post", 
        "postid-2288", 
        "single-format-standard", 
        "right-sidebar", 
        "post-layout-modern", 
        "post-cat-10", 
        "has-lb", 
        "has-lb-sm", 
        "has-sb-sep", 
        "layout-normal", 
        "-style-compact", 
        "-blur", 
        "vsc-initialized"

    );
})();

(function() {
    // إخفاء الزرار
    var downloadButton = document.getElementById('downloadbtnfree');
    if (downloadButton) {
        downloadButton.style.display = 'none'; // إخفاء الزرار
    }

    // إنشاء زرار جديد بنفس الوظيفة
    var newButton = document.createElement('button');
    newButton.innerHTML = 'DOWNLOAD NOW'; // النص داخل الزرار
    newButton.className = 'btn btn-primary btn-lg btn-block'; // إضافة الكلاسات المطلوبة
    newButton.id = 'newDownloadBtn'; // إعطاء الزرار ID جديد

    // إضافة الحدث عند الضغط على الزرار
    newButton.onclick = function() {
        return freeDownload(); // نفس الوظيفة
    };

    // إضافة الزرار إلى الصفحة (مثلاً في نفس الـ div)
    var parentDiv = document.querySelector('.download-btn.mb-4');
    if (parentDiv) {
        parentDiv.appendChild(newButton); // إضافة الزرار في نفس المكان
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // حفظ العنصر المطلوب فقط
    var targetElement = document.querySelector("center.oto");

    // تحقق إذا كان العنصر موجود
    if (targetElement) {
    // حذف جميع العناصر داخل الـ body
    document.body.innerHTML = "";

    // إعادة إضافة العنصر المطلوب فقط
    document.body.appendChild(targetElement);

    // تعديل خصائص CSS للتأكد من ظهور العنصر
    var progressBarContainer = document.getElementById("progressBarContainer");
    var nextButton = document.getElementById("nextbutton");

    if (progressBarContainer) {
        progressBarContainer.style.display = "block"; // إظهار شريط التقدم
    }
    if (nextButton) {
        nextButton.style.display = "inline-block"; // إظهار الزر
        nextButton.removeAttribute("disabled"); // إزالة التعطيل عن الزر

        // تكبير الزر
        nextButton.style.padding = "20px 40px"; // جعل الزر أكبر
        nextButton.style.fontSize = "22px"; // زيادة حجم الخط
        nextButton.style.borderRadius = "10px"; // إضافة حواف دائرية للزر

        // جعل الزر في منتصف الصفحة
        nextButton.style.position = "absolute"; // تعيين الموقع بشكل مطلق
        nextButton.style.top = "50%"; // منتصف الصفحة عموديًا
        nextButton.style.left = "50%"; // منتصف الصفحة أفقيًا
        nextButton.style.transform = "translate(-50%, -50%)"; // ضبط المركز الدقيق
    }

    console.log("تم الإبقاء على العنصر المحدد فقط وتم تعديله ليظهر في منتصف الصفحة.");
    } else {
    console.log("العنصر المطلوب غير موجود.");
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // البحث عن جميع الروابط التي تبدأ بـ "https://liteapks.com/download"
    var links = document.querySelectorAll("a[href^='https://liteapks.com/download']");

    // التحقق إذا كانت هناك روابط تطابق الشرط
    if (links.length > 0) {
    links.forEach(function (link) {
        // الحصول على الرابط الأصلي
        var originalUrl = link.href;

        // التحقق إذا كان الرابط ينتهي بـ "/رقم"
        if (/\/\d+$/.test(originalUrl)) {
        // إنشاء الرابط الجديد
        var newUrl =
            "https://linkjust.com/st?api=f4426315f58a6685a00e3c27b6447b5df9594950&url=" +
            originalUrl;

        // تحديث الرابط في العنصر
        link.href = newUrl;

        console.log("تم تعديل الرابط:", originalUrl, "إلى", newUrl);
        }
    });
    } else {
    console.log("لم يتم العثور على روابط تبدأ بـ 'https://liteapks.com/download'.");
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////                                               
    // البحث عن الزر المطلوب
    var targetForm = document.querySelector("#wpsafelink-landing");
    var targetButton = document.querySelector("#wpsafelinkhuman");

    // التحقق إذا كان الفورم والزر موجودين
    if (targetForm && targetButton) {
    // حذف جميع العناصر داخل الـ body
    document.body.innerHTML = "";

    // إعادة إضافة الفورم بالكامل مع محتوياته
    document.body.appendChild(targetForm);

    // تعديل خصائص CSS للتوسيط
    targetForm.style.display = "flex";
    targetForm.style.flexDirection = "column";
    targetForm.style.justifyContent = "center";
    targetForm.style.alignItems = "center";
    targetForm.style.height = "100vh"; // ملء الشاشة عموديًا

    // التأكد من أن الزر يظهر في منتصف الصفحة
    targetButton.style.display = "block";
    targetButton.style.margin = "0 auto"; // للتوسيط الأفقي

    console.log("تم الإبقاء على النموذج والزر المطلوب فقط.");
    } else {
    console.log("لم يتم العثور على الفورم أو الزر المطلوب.");
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const safeLink = document.getElementById("wpsafe-link");

    if (safeLink) {
        // إزالة جميع العناصر في الصفحة
        document.body.innerHTML = "";

        // إضافة زر wpsafe-link مرة أخرى
        document.body.appendChild(safeLink);

        // ضبط الأنماط لجعل الزر في منتصف الصفحة
        document.body.style.display = "flex";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
        document.body.style.height = "100vh"; // ارتفاع الصفحة بالكامل
        document.body.style.margin = "0"; // إزالة الهوامش الافتراضية

        safeLink.style.display = "block";
        safeLink.style.textAlign = "center";
    } else {
        console.error("لم يتم العثور على العنصر wpsafe-link!");
    }
    const banners = document.querySelectorAll('.banner, .ad');
    banners.forEach(function(banner) {
        banner.remove();
    });
///////////////////////////////////////////////////////////////////////////////////////////
    // الحصول على العنصر الذي يحتوي على id = go_down
    const goDown = document.getElementById("go_down");

    if (goDown) {
        // إزالة كل محتوى الصفحة
        document.body.innerHTML = "";

        // إعادة إضافة عنصر go_down فقط
        document.body.appendChild(goDown);

        // ضبط التنسيقات لجعل العنصر يظهر بشكل طبيعي على الصفحة
        document.body.style.display = "flex";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
        document.body.style.height = "100vh"; // ملء ارتفاع الصفحة بالكامل
        document.body.style.margin = "0"; // إزالة الهوامش الافتراضية
        document.body.style.backgroundColor = "#f9f9f9"; // لون خلفية افتراضي

        // التأكد من عرض شريط التحميل وزر "Next - تخطي"
        const loadingBarContainer = document.getElementById("loadingBarContainer");
        const goD = document.getElementById("go_d");

        if (loadingBarContainer) {
            loadingBarContainer.style.display = "block"; // عرض شريط التحميل
        }

        if (goD) {
            goD.style.display = "block"; // عرض الزر

            // تطبيق تنسيقات جديدة على الزر
            goD.style.backgroundColor = "#007bff"; // لون أزرق جذاب
            goD.style.color = "#fff"; // لون النص أبيض
            goD.style.padding = "10px 20px"; // مساحة داخلية مريحة
            goD.style.border = "none"; // إزالة الحدود
            goD.style.borderRadius = "5px"; // جعل الزر مستدير الزوايا
            goD.style.fontSize = "16px"; // حجم الخط
            goD.style.fontWeight = "bold"; // خط عريض
            goD.style.cursor = "pointer"; // مؤشر الفأرة يصبح يدًا عند المرور
            goD.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"; // تأثير ظل خفيف

            // تأثير عند تمرير الماوس على الزر
            goD.onmouseover = function () {
                goD.style.backgroundColor = "#0056b3"; // لون أزرق أغمق عند التمرير
            };
            goD.onmouseout = function () {
                goD.style.backgroundColor = "#007bff"; // إعادة اللون الأصلي عند الخروج
            };
        }

        // إضافة تنسيق إضافي إذا لزم
        goDown.style.textAlign = "center"; // ضبط المحاذاة إلى المنتصف
    } else {
        console.error("العنصر الذي يحمل id='go_down' غير موجود!");
    }
///////////////////////////////////////////////////////////////////////////////////////////
    // البحث عن العناصر المطلوبة
    const loadingScreen = document.getElementById("loading-screen");
    const getLinkButton = document.querySelector("a#yuidea-btmbtn");

    // التحقق من وجود الرابط في العناصر
    const hasLinkInLoadingScreen = loadingScreen && loadingScreen.querySelector("button[onclick]");
    const hasLinkInGetLinkButton = getLinkButton && getLinkButton.href;

    // إذا وجدنا الروابط، نعرض العناصر ونزيل الباقي
    if (hasLinkInLoadingScreen || hasLinkInGetLinkButton) {
        // إزالة كل محتوى الصفحة
        document.body.innerHTML = "";

        // إضافة العناصر المطلوبة فقط
        if (hasLinkInLoadingScreen) {
            document.body.appendChild(loadingScreen);

            // تحسين زر "Click here to continue"
            const continueButton = loadingScreen.querySelector("#continue-button");
            if (continueButton) {
                continueButton.disabled = false; // جعل الزر مفعلاً دائمًا
                continueButton.style.padding = "15px 30px";
                continueButton.style.borderRadius = "8px";
                continueButton.style.fontSize = "18px";
                continueButton.style.fontWeight = "bold";
                continueButton.style.color = "#fff";
                continueButton.style.backgroundColor = "#28a745"; // لون أخضر جميل
                continueButton.style.border = "none";
                continueButton.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                continueButton.style.cursor = "pointer";
                continueButton.style.transition = "background-color 0.3s, transform 0.2s";

                // تأثير عند تمرير الماوس
                continueButton.onmouseover = function () {
                    continueButton.style.backgroundColor = "#218838"; // أخضر أغمق عند التمرير
                    continueButton.style.transform = "scale(1.05)"; // تكبير الزر قليلاً
                };
                continueButton.onmouseout = function () {
                    continueButton.style.backgroundColor = "#28a745"; // إعادة اللون الأصلي
                    continueButton.style.transform = "scale(1)"; // إعادة الحجم الأصلي
                };

                // عند الضغط على الزر، إخفاء الزر وإظهار الرابط
                continueButton.onclick = function () {
                    continueButton.style.display = "none"; // إخفاء الزر
                    if (getLinkButton) {
                        getLinkButton.style.display = "block"; // عرض الرابط
                    }
                };
            }
        }

        if (hasLinkInGetLinkButton) {
            document.body.appendChild(getLinkButton);
            // تحسين مظهر الزر "Destination Page"
            const destinationButton = getLinkButton.querySelector("button");
            if (destinationButton) {
                destinationButton.style.padding = "15px 30px";
                destinationButton.style.borderRadius = "8px";
                destinationButton.style.fontSize = "18px";
                destinationButton.style.fontWeight = "bold";
                destinationButton.style.backgroundColor = "#007bff"; // اللون الأزرق
                destinationButton.style.color = "#fff";
                destinationButton.style.border = "none";
                destinationButton.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                destinationButton.style.cursor = "pointer";
                destinationButton.style.transition = "background-color 0.3s, transform 0.2s";

                // تأثير عند تمرير الماوس
                destinationButton.onmouseover = function () {
                    destinationButton.style.backgroundColor = "#0056b3"; // لون أزرق أغمق عند التمرير
                    destinationButton.style.transform = "scale(1.05)"; // تكبير الزر قليلاً
                };
                destinationButton.onmouseout = function () {
                    destinationButton.style.backgroundColor = "#007bff"; // إعادة اللون الأصلي
                    destinationButton.style.transform = "scale(1)"; // إعادة الحجم الأصلي
                };
            }
        }

        // ضبط التنسيقات لجعل المحتوى يظهر بشكل صحيح في منتصف الصفحة
        document.body.style.display = "flex";
        document.body.style.flexDirection = "column";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
        document.body.style.height = "100vh"; // ملء الصفحة عموديًا
        document.body.style.margin = "0"; // إزالة الهوامش الافتراضية
        document.body.style.backgroundColor = "#f9f9f9"; // لون خلفية افتراضي
    } else {
        console.error("لا توجد روابط صالحة في العناصر المحددة!");
    }
/////////////////////////////////////////////////////////////////////////////////////
    /// التحقق من الرابط الحالي للموقع
    if (window.location.href === "https://telegram.org/faq") {
        // إزالة محتوى الصفحة بالكامل
        document.body.innerHTML = "";

        // إنشاء iframe لإضافة الرابط المطلوب
        const iframe = document.createElement("iframe");
        iframe.src = "https://t.me/EgyFilm_code/18?embed=1&mode=tme"; // الرابط الجديد
        iframe.style.width = "100vw"; // عرض كامل الشاشة
        iframe.style.height = "100vh"; // ارتفاع كامل الشاشة
        iframe.style.border = "none"; // إزالة الحدود

        // إضافة iframe إلى الصفحة
        document.body.appendChild(iframe);

        // ضبط التنسيقات
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.body.style.overflow = "hidden"; // منع التمرير
    }
/////////////////////////////////////////////////////////////////////////////////////
    const oldButton = document.getElementById('downloadbtn');
        
    if (oldButton) {
        // إخفاء الزر القديم
        oldButton.style.display = 'none';

        // إنشاء زر جديد
        const newButton = document.createElement('button');
        newButton.id = 'newDownloadBtn';
        newButton.textContent = 'Download Now'; // النص داخل الزر الجديد
        newButton.style.cssText = `
            display: inline-block;
            padding: 10px 20px;
            background-color:rgb(4, 65, 178);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            position: ${getComputedStyle(oldButton).position};
            top: ${oldButton.offsetTop}px;
            left: ${oldButton.offsetLeft}px;
        `;

        // إضافة الزر الجديد إلى نفس المكان
        oldButton.parentNode.insertBefore(newButton, oldButton.nextSibling);

        console.log('زر جديد تم إنشاؤه بنجاح!');
    } else {
        console.error('لم يتم العثور على الزر القديم downloadbtn!');
    }
/////////////////////////////////////////////////////////////////////////////////////
    const form = document.getElementById('userForm');

    // إذا كان الفورم يحتوي على hCaptcha
    if (form && form.querySelector('.h-captcha')) {
        // استبدال الكود بـ الفورم الجديد
        form.innerHTML = `
            <input type="hidden" name="no-recaptcha-noresponse" value="true">
            <button style="display: none;" onclick="helloSweetie()" class="pfbutton-primary">Next article</button>
            <button class="pfbutton-primary" style="margin-top: 5px; font-size:18px!important;" onclick="formulaSend(event)" onmouseover="isHoverDone = true;" id="cbt" type="submit">Next article</button>
        `;
        console.log('تم استبدال الفورم بنجاح!');
    } else {
        console.log('لم يتم العثور على hCaptcha في الفورم');
    }

})();
