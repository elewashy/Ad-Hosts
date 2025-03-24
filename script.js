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
   


    // إخفاء عنصر العد التنازلي
    // var countdown = document.getElementById('countdown');
    // if (countdown) {
    //     countdown.style.display = 'none'; // إخفاء العنصر
    // }

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
    if (window.location.href.includes("khabrnew.store/ta7mel")) {
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
        if (link.href.includes('mothaqaf.cimanow.online')) {
            link.href = 'watching';
        }
    });
    const links2 = document.querySelectorAll('.btns a');
    links2.forEach(link => {
        if (link.href.includes('new.cimanow.online')) {
            link.href = 'watching';
        }
    });
    // const links3 = document.querySelectorAll('.btns a');
    // links3.forEach(link => {
    //     if (link.href.includes('rm.freex2line.online')) {
    //         link.href = 'watching';
    //     }
    // });

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
////////////////////////////////////////////////////////////////////////////////
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
    // var links = document.querySelectorAll("a[href^='https://liteapks.com/download']");

    // // التحقق إذا كانت هناك روابط تطابق الشرط
    // if (links.length > 0) {
    // links.forEach(function (link) {
    //     // الحصول على الرابط الأصلي
    //     var originalUrl = link.href;

    //     // التحقق إذا كان الرابط ينتهي بـ "/رقم"
    //     if (/\/\d+$/.test(originalUrl)) {
    //     // إنشاء الرابط الجديد
    //     var newUrl =
    //         "https://linkjust.com/st?api=f4426315f58a6685a00e3c27b6447b5df9594950&url=" +
    //         originalUrl;

    //     // تحديث الرابط في العنصر
    //     link.href = newUrl;

    //     console.log("تم تعديل الرابط:", originalUrl, "إلى", newUrl);
    //     }
    // });
    // } else {
    // console.log("لم يتم العثور على روابط تبدأ بـ 'https://liteapks.com/download'.");
    // }
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
    // تحديد جميع العناصر التي تحتوي على الكلاس "blog-item"
    var blogItems = document.querySelectorAll('.blog-item');

    // إخفاء كل عنصر يحتوي على الكلاس
    blogItems.forEach(function(item) {
        item.style.display = 'none';
    });
/////////////////////////////////////////////////////////////////////////////////////
    // let verifyButton = document.querySelector('#hmVrfy .pstL');
    // let goToLinkContainer = document.querySelector('.aSlB.vsbl');

    // if (verifyButton || goToLinkContainer) {  
    //     // إخفاء كل عناصر الصفحة
    //     document.body.childNodes.forEach(node => {
    //         if (node.nodeType === 1) { // يتحقق إنه عنصر HTML
    //             node.style.display = 'none';
    //         }
    //     });

    //     // إنشاء كونتينر جديد لتجميع العناصر المطلوبة
    //     let container = document.createElement('div');
    //     container.style.display = 'flex';
    //     container.style.flexDirection = 'column';
    //     container.style.justifyContent = 'center';
    //     container.style.alignItems = 'center';
    //     container.style.height = '100vh';
    //     container.style.gap = '15px'; // مسافة بين العناصر

    //     // إضافة زر "I am not a Robot" لو موجود
    //     if (verifyButton) {
    //         verifyButton.style.display = 'block';
    //         container.appendChild(verifyButton);
    //     }

    //     // إضافة زر "Go to Link" مع الكونتينر بتاعه لو موجود
    //     if (goToLinkContainer) {
    //         goToLinkContainer.style.display = 'block';
    //         container.appendChild(goToLinkContainer);
    //     }

    //     document.body.appendChild(container);
    // }
/////////////////////////////////////////////////////////////////////////////////////
    const section = document.querySelector('section#secondSection'); // البحث عن القسم
    const button = section?.querySelector(
        'a[href="https://yourdoctor.site?cdf_plus=EgyFilm_Code"], a[href="https://swiftlnx.com/EgyFilm_Code"]'
    ); // البحث عن أي زر يحتوي على أحد الرابطين
    
    if (button) {
        // مسح كل محتويات الصفحة
        document.body.innerHTML = '';

        // إنشاء قسم جديد يحتوي فقط على الزر
        const newSection = document.createElement('section');
        newSection.id = 'newSection';
        newSection.classList.add('py-16', 'bg-white', 'text-center');

        const newButton = document.createElement('a');
        newButton.href = button.href; // إضافة نفس الرابط
        newButton.textContent = 'Go Next'; // النص
        newButton.className = button.className; // نسخ الفئات (CSS)

        // إضافة الزر إلى القسم الجديد
        newSection.appendChild(newButton);

        // إضافة القسم الجديد إلى الصفحة
        document.body.appendChild(newSection);
    }
    const slideUpAd = document.getElementById('lm-slideup');

    if (slideUpAd) {
        slideUpAd.remove();
    }
    const popup = document.getElementById('popup');

    if (popup) {
        popup.remove();
    }
    const adpopupheader = document.getElementById('ad-popup');
    if (adpopupheader) {
        adpopupheader.remove();
    }
    const adcontainer = document.getElementById('ad-container');
    if (adcontainer) {
        adcontainer.remove();
    }
    const fixedban5 = document.getElementById('fixedban5');
    if (fixedban5) {
        fixedban5.remove();
    }
    const Advert1 = document.getElementById('Advert1');
    if (Advert1) {
        Advert1.remove();
    }
    const adunit1 = document.getElementById('ad-unit-1');
    if (adunit1) {
        adunit1.remove();
    }
    const adContainer = document.getElementById('adContainer');
    if (adContainer) {
        adContainer.remove();
    }
    var adBlockWarning1 = document.querySelector('.live-ad-container');
    if (adBlockWarning1) {
        adBlockWarning1.remove();
    }
    var adBlockWarning2 = document.querySelector('.ad-unit ad-unit__top');
    if (adBlockWarning2) {
        adBlockWarning2.remove();
    }
    var adBlockWarning = document.querySelector('.afcceb-bebeea');
    if (adBlockWarning) {
        adBlockWarning.remove();
    }
    var adBlockDiv = document.querySelector('.fjojw-ihdwiiwd#owjojw-du2');
    if (adBlockDiv) {
        adBlockDiv.remove();
    }
    var adBlockDiv1 = document.querySelector('.faded-in.nindo-popup-content-wrapper');
    if (adBlockDiv1) {
        adBlockDiv1.remove();
    }
    var adBlockDiv2 = document.querySelector('.faded-in.nindo-popup-overlay');
    if (adBlockDiv2) {
        adBlockDiv2.remove();
    }    
    var adOverlay = document.querySelector('.afcceb-afdacf');
    if (adOverlay) {
        adOverlay.remove();
    }

    document.body.classList.remove('afcceb-dbafdacfcb');

/////////////////////////////////////////////////////////////////////////////////////
    const downloadContainer = document.querySelector('div[download-button]');

    if (downloadContainer) {
      // التأكد من أن العنصر ليس مخفيًا
      downloadContainer.style.display = "block"; // التأكد من ظهور العنصر
    }
/////////////////////////////////////////////////////////////////////////////////////
    var allLinks = document.querySelectorAll("a");

    allLinks.forEach(function(link) {
        if (link.href.includes("frdl.to")) {
            link.href = link.href.replace("frdl.to", "frdl.io");
        }
    });
    function removeElements() {
        var elementsToRemove = ["xqeqjp", "xqeqjp1"];
        
        for (var i = 0; i < elementsToRemove.length; i++) {
            var elementId = elementsToRemove[i];
            var element = document.getElementById(elementId);
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
                console.log("Removed element with ID: " + elementId);
            } else {
                console.log("Element with ID: " + elementId + " not found");
            }
        }
    }
    
    // Execute the function
    removeElements();
})();
// كود مباشر لإزالة مربع SweetAlert2 بالضبط
(function() {
    // استهداف بالتحديد وبطرق مختلفة
    
    // طريقة 1: الإزالة المباشرة بناءً على الكلاس
    var sweetAlertBox = document.querySelector('.swal2-container.swal2-rtl.swal2-center.swal2-backdrop-show');
    if (sweetAlertBox) {
        sweetAlertBox.remove();
        console.log("تمت إزالة مربع SweetAlert (طريقة 1)");
        document.body.style.overflow = 'auto';
        return; // توقف إذا نجحت هذه الطريقة
    }
    
    // طريقة 2: البحث عن جميع حاويات SweetAlert وإزالتها
    var allSwalContainers = document.querySelectorAll('[class*="swal2-container"]');
    if (allSwalContainers.length > 0) {
        for (var i = 0; i < allSwalContainers.length; i++) {
            allSwalContainers[i].remove();
        }
        console.log("تمت إزالة " + allSwalContainers.length + " من مربعات SweetAlert (طريقة 2)");
        document.body.style.overflow = 'auto';
        return;
    }
    
    // طريقة 3: محاولة إزالة العنصر من خلال إخفائه
    var swalByTitle = document.querySelector('h2#swal2-title');
    if (swalByTitle) {
        var container = swalByTitle.closest('.swal2-container');
        if (container) {
            container.style.display = 'none';
            console.log("تم إخفاء مربع SweetAlert (طريقة 3)");
            document.body.style.overflow = 'auto';
            return;
        }
    }
    
    console.log("لم نتمكن من العثور على مربع SweetAlert بالطرق العادية");
    
    // طريقة 4: كتابة مباشرة للغاية - إنشاء تداخل CSS يخفي العنصر
    var style = document.createElement('style');
    style.innerHTML = `
        .swal2-container { display: none !important; }
        body { overflow: auto !important; }
    `;
    document.head.appendChild(style);
    console.log("تم إضافة CSS لإخفاء أي مربعات SweetAlert (طريقة 4)");
})();
(function() {
    var delay_done = 1;
    $('#blk1').hide(); // إخفاء العنصر مباشرةً بدون انتظار

    if (!$.cookie('ads')) {
        $.cookie('ads', -1, { expires: 1 });
    }

    var count = parseInt($.cookie('ads'));
    var count2 = 0;
})();
// ==UserScript==
// @name         سكربت متقدم لمنع الروابط المخفية وإعادة التوجيه
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  يمنع جميع أنواع إعادة التوجيه والروابط المخفية داخل iframes والنصوص البرمجية
// @author       Claude
// @match        *://*/*
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    // تخزين النسخ الأصلية من الوظائف التي سنعدلها
    const original = {
        assign: window.location.assign,
        replace: window.location.replace,
        href: Object.getOwnPropertyDescriptor(window.Location.prototype, 'href'),
        open: window.open,
        createElement: document.createElement,
        appendChild: Element.prototype.appendChild,
        setAttribute: Element.prototype.setAttribute,
        addEventListener: EventTarget.prototype.addEventListener,
        eval: window.eval,
        setTimeout: window.setTimeout,
        setInterval: window.setInterval,
        Function: window.Function,
        postMessage: window.postMessage
    };

    // منع تغيير المواقع
    window.location.assign = function(url) {
        console.log('🛑 تم منع assign إلى: ' + url);
        return null;
    };

    window.location.replace = function(url) {
        console.log('🛑 تم منع replace إلى: ' + url);
        return null;
    };
    
    // منع تغيير location.href
    Object.defineProperty(window.Location.prototype, 'href', {
        set: function(url) {
            console.log('🛑 تم منع تغيير location.href إلى: ' + url);
            return null;
        },
        get: function() {
            return original.href.get.call(this);
        }
    });

    // منع فتح النوافذ
    window.open = function(url) {
        console.log('🛑 تم منع فتح نافذة: ' + url);
        return {
            focus: function(){},
            close: function(){}
        };
    };
    
    // التعامل مع نصوص جافاسكربت مخفية
    window.eval = function(code) {
        if (code && typeof code === 'string') {
            // منع أكواد إعادة التوجيه المخفية
            if (code.includes('location') || code.includes('window.open') || 
                code.includes('href') || code.includes('document.write')) {
                console.log('🛑 تم منع تنفيذ كود eval مشبوه');
                return null;
            }
        }
        return original.eval.call(window, code);
    };
    
    // منع الدوال التي تنشئ من النصوص
    window.Function = function() {
        const args = Array.from(arguments);
        const body = args.pop();
        if (typeof body === 'string') {
            if (body.includes('location') || body.includes('window.open') || 
                body.includes('href') || body.includes('document.write')) {
                console.log('🛑 تم منع إنشاء دالة مشبوهة');
                return function() { return null; };
            }
        }
        return original.Function.apply(this, arguments);
    };

    // التعامل مع setTimeout و setInterval
    window.setTimeout = function(func, delay) {
        if (typeof func === 'string') {
            if (func.includes('location') || func.includes('window.open') || 
                func.includes('href') || func.includes('document.write')) {
                console.log('🛑 تم منع setTimeout مشبوه');
                return -1;
            }
        }
        return original.setTimeout.apply(this, arguments);
    };
    
    window.setInterval = function(func, delay) {
        if (typeof func === 'string') {
            if (func.includes('location') || func.includes('window.open') || 
                func.includes('href') || func.includes('document.write')) {
                console.log('🛑 تم منع setInterval مشبوه');
                return -1;
            }
        }
        return original.setInterval.apply(this, arguments);
    };

    // اعتراض إنشاء عناصر يمكن استخدامها لإعادة التوجيه
    document.createElement = function(tagName) {
        const element = original.createElement.call(document, tagName);
        
        if (tagName.toLowerCase() === 'iframe' || tagName.toLowerCase() === 'frame') {
            // تسجيل إنشاء إطار
            console.log('⚠️ تم إنشاء إطار، سيتم مراقبته');
            
            // تعطيل src الأصلية
            Object.defineProperty(element, 'src', {
                set: function(value) {
                    console.log('🛑 تم منع تعيين src للإطار: ' + value);
                },
                get: function() {
                    return 'about:blank';
                }
            });
            
            // مراقبة المحتوى بعد تحميله
            element.addEventListener('load', function() {
                try {
                    if (element.contentWindow) {
                        // تطبيق نفس الحماية على الإطار
                        element.contentWindow.location.assign = window.location.assign;
                        element.contentWindow.location.replace = window.location.replace;
                        element.contentWindow.open = window.open;
                        
                        // الوصول إلى النصوص البرمجية داخل الإطار
                        if (element.contentDocument) {
                            const scripts = element.contentDocument.querySelectorAll('script');
                            scripts.forEach(script => {
                                // إزالة النصوص المشبوهة
                                if (script.textContent.includes('location') || 
                                    script.textContent.includes('window.open') ||
                                    script.textContent.includes('href')) {
                                    console.log('🛑 تم إزالة نص برمجي مشبوه من الإطار');
                                    script.textContent = '';
                                }
                            });
                        }
                    }
                } catch (e) {
                    // تجاهل أخطاء نفس المصدر
                }
            });
        }
        
        if (tagName.toLowerCase() === 'script') {
            // منع الروابط المخفية في النصوص البرمجية
            Object.defineProperty(element, 'src', {
                set: function(value) {
                    if (value && !value.startsWith('data:') && !value.includes('jquery') && !value.includes('static')) {
                        console.log('⚠️ تم منع سكربت خارجي: ' + value);
                        return;
                    }
                    element.setAttribute('data-original-src', value);
                },
                get: function() {
                    return element.getAttribute('data-original-src') || '';
                }
            });
            
            // منع النصوص البرمجية المخفية
            Object.defineProperty(element, 'textContent', {
                set: function(value) {
                    if (value && (value.includes('location') || value.includes('window.open') || value.includes('href'))) {
                        console.log('🛑 تم منع نص برمجي مشبوه');
                        element.setAttribute('data-original-content', value);
                        return '';
                    }
                    element.setAttribute('data-original-content', value);
                },
                get: function() {
                    return element.getAttribute('data-original-content') || '';
                }
            });
        }
        
        if (tagName.toLowerCase() === 'a') {
            // منع تعيين href للروابط
            Object.defineProperty(element, 'href', {
                set: function(value) {
                    console.log('⚠️ تم منع رابط: ' + value);
                    element.setAttribute('data-original-href', value);
                    return null;
                },
                get: function() {
                    return element.getAttribute('data-original-href') || '#';
                }
            });
        }
        
        return element;
    };

    // منع إضافة العناصر التي قد تحتوي على روابط مخفية
    Element.prototype.appendChild = function(element) {
        if (element.tagName && (element.tagName.toLowerCase() === 'script' || element.tagName.toLowerCase() === 'iframe')) {
            // فحص السكربتات قبل إضافتها
            if (element.tagName.toLowerCase() === 'script') {
                // التحقق من وجود كود مشبوه
                if (element.textContent && (
                    element.textContent.includes('location') || 
                    element.textContent.includes('window.open') || 
                    element.textContent.includes('href')
                )) {
                    console.log('🛑 تم منع إضافة سكربت مشبوه');
                    return document.createComment('Script blocked by anti-redirect');
                }
                
                // التحقق من المصادر الخارجية
                if (element.src && !element.src.startsWith('data:') && !element.src.includes('jquery') && !element.src.includes('static')) {
                    console.log('⚠️ تم منع سكربت خارجي: ' + element.src);
                    return document.createComment('External script blocked: ' + element.src);
                }
            }
        }
        
        return original.appendChild.call(this, element);
    };

    // منع تعديل السمات للعناصر مثل src و href
    Element.prototype.setAttribute = function(name, value) {
        if (name.toLowerCase() === 'href' || name.toLowerCase() === 'src') {
            if (this.tagName && (
                this.tagName.toLowerCase() === 'a' || 
                this.tagName.toLowerCase() === 'iframe' || 
                this.tagName.toLowerCase() === 'frame' || 
                this.tagName.toLowerCase() === 'script'
            )) {
                console.log(`⚠️ تم منع تعيين ${name} إلى: ${value}`);
                return;
            }
        }
        
        if (name.toLowerCase() === 'onclick' || name.toLowerCase() === 'onload') {
            if (value && (
                value.includes('location') || 
                value.includes('window.open') || 
                value.includes('href')
            )) {
                console.log(`🛑 تم منع معالج حدث مشبوه: ${name}`);
                return;
            }
        }
        
        original.setAttribute.call(this, name, value);
    };

    // منع أحداث النقر والتحميل التي قد تحتوي على إعادة توجيه
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (type.toLowerCase() === 'click' || type.toLowerCase() === 'load') {
            const safeListener = function(event) {
                // منع التنقل الافتراضي للروابط
                if (event.target.tagName === 'A' || event.target.closest('a')) {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log('🛑 تم منع نقرة على رابط');
                    return false;
                }
                
                // تنفيذ المستمع الأصلي مع التقاط الأخطاء
                try {
                    return listener.apply(this, arguments);
                } catch (e) {
                    console.log('⚠️ خطأ في معالج الحدث:', e);
                    return false;
                }
            };
            
            return original.addEventListener.call(this, type, safeListener, options);
        }
        
        return original.addEventListener.call(this, type, listener, options);
    };

    // منع الإتصال بين النوافذ/الإطارات
    window.postMessage = function(message, targetOrigin, transfer) {
        if (typeof message === 'object' && message !== null) {
            // التحقق من وجود أوامر إعادة توجيه
            if (message.action && (
                message.action.includes('redirect') || 
                message.action.includes('navigate') || 
                message.action.includes('open')
            )) {
                console.log('🛑 تم منع رسالة postMessage مشبوهة:', message);
                return;
            }
        }
        
        return original.postMessage.call(this, message, targetOrigin, transfer);
    };

    // مراقب DOM لمعالجة العناصر الجديدة
    function setupMutationObserver() {
        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                if (mutation.addedNodes && mutation.addedNodes.length) {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === 1) {  // عنصر HTML
                            // مراقبة الإطارات الجديدة
                            if (node.tagName === 'IFRAME' || node.tagName === 'FRAME') {
                                try {
                                    node.src = 'about:blank';
                                    if (node.contentWindow) {
                                        node.contentWindow.location.assign = window.location.assign;
                                        node.contentWindow.location.replace = window.location.replace;
                                        node.contentWindow.open = window.open;
                                    }
                                } catch (e) {
                                    // تجاهل أخطاء نفس المصدر
                                }
                            }
                            
                            // مسح النصوص البرمجية المشبوهة
                            if (node.tagName === 'SCRIPT') {
                                if (node.textContent && (
                                    node.textContent.includes('location') || 
                                    node.textContent.includes('window.open') || 
                                    node.textContent.includes('href')
                                )) {
                                    node.textContent = '';
                                    console.log('🛑 تم مسح نص برمجي مشبوه');
                                }
                            }
                            
                            // منع النقر على الروابط
                            if (node.tagName === 'A') {
                                node.href = '#';
                                node.target = '_self';
                                node.addEventListener('click', function(e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    return false;
                                }, true);
                            }
                            
                            // البحث عن المزيد من العناصر المشبوهة
                            const frames = node.querySelectorAll('iframe, frame');
                            frames.forEach(frame => {
                                try {
                                    frame.src = 'about:blank';
                                } catch (e) {}
                            });
                            
                            const scripts = node.querySelectorAll('script');
                            scripts.forEach(script => {
                                if (script.textContent && (
                                    script.textContent.includes('location') || 
                                    script.textContent.includes('window.open') || 
                                    script.textContent.includes('href')
                                )) {
                                    script.textContent = '';
                                }
                            });
                            
                            const links = node.querySelectorAll('a');
                            links.forEach(link => {
                                link.href = '#';
                                link.target = '_self';
                                link.addEventListener('click', function(e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    return false;
                                }, true);
                            });
                        }
                    }
                }
            }
        });
        
        // بدء المراقبة
        document.addEventListener('DOMContentLoaded', function() {
            observer.observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        });
    }

    // التعامل مع المحتوى الموجود حاليًا والمستقبلي
    function handleExistingContent() {
        // منع أي انتقال مباشر
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🛑 تم منع النقر على رابط');
                return false;
            }
        }, true);
    }

    // تنفيذ كل الوظائف
    setupMutationObserver();
    handleExistingContent();

    // كتابة رسالة تأكيد
    console.log('✅ تم تفعيل سكربت منع إعادة التوجيه والروابط المخفية بنجاح');

})();