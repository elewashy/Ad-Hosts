/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Script to remove elements using a list of selectors
(function() {
    // List of selectors you want to remove
    // You can add more selectors here in the future
    var selectorsToRemove = [
        '.pm-ads-banner',        // Example: ad banner
        '.ad-container',
        '.singular--bg',
        '.telegram_themexCom',
        '.comp-hide AlbaE3lan table_top',
        '.comp-hide.AlbaE3lan.table_top',
        '.separator',
        '.banner-inner',
        '.ad-unit',
        '.hydratv',
        // Add more selectors here, such as:
        // '.another-ad-class',
        // '#specific-ad-id',
        // 'div[data-ad-type]'
    ];
    
    // Function to remove elements based on the selector list
    function removeElements() {
        // Iterate through each selector in the list
        for (var i = 0; i < selectorsToRemove.length; i++) {
            var selector = selectorsToRemove[i];
            
            // Find all elements that match the current selector
            var elements = document.querySelectorAll(selector);
            
            // Remove each found element
            for (var j = 0; j < elements.length; j++) {
                if (elements[j] && elements[j].parentNode) {
                    elements[j].parentNode.removeChild(elements[j]);
                }
            }
        }
    }
    
    // Execute the function immediately
    removeElements();
})();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Script to remove elements using a list of IDs
(function() {
    // List of IDs you want to remove
    // You can add more IDs here in the future
    var idsToRemove = [
        'tme',       // Example: download button ID
        'aplr-notic',
        'adsx',
        'hidx',
        // Add more IDs here, such as:
        // 'popup-container',
        // 'newsletter-signup'
    ];
    
    // Function to remove elements based on the ID list
    function removeElementsById() {
        // Iterate through each ID in the list
        for (var i = 0; i < idsToRemove.length; i++) {
            var id = idsToRemove[i];
            
            // Find the element with the current ID
            var element = document.getElementById(id);
            
            // Remove the element if found
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
    }
    
    // Execute the function immediately
    removeElementsById();
})();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
(function() {
    // استبدال WebAssembly.compileStreaming
    const originalCompileStreaming = WebAssembly.compileStreaming;
    WebAssembly.compileStreaming = function(response) {
    return Promise.resolve({});
    };

    // // استبدال WebAssembly.instantiate
    const originalInstantiate = WebAssembly.instantiate;
    WebAssembly.instantiate = function(module, importObject) {
    
    // إنشاء كائن زائف يحاكي وظائف WebAssembly
    return Promise.resolve({
        exports: {
        memory: { buffer: new ArrayBuffer(1024) },
        __new: function() { return 1; },
        check: function(input) {
            // إرجاع قيمة تمثل عنوان URL صالح
            // هذا سيخدع النظام ليظن أنه لا يوجد مانع إعلانات
            return 42;  // رقم عشوائي سيتم تفسيره كمؤشر للذاكرة
        }
        }
    });
    };

    // الاحتفاظ بنسخة من الدالة الأصلية u قبل استبدالها
    const originalU = window.u;

    // إعادة تعريف دالة u لتعيد وعدًا ناجحًا دائمًا
    window.u = function(str) {
    return Promise.resolve("success-url-placeholder");
    };

    // تعريض دالة نقطة انطلاق لنسخة مزيفة من check
    setTimeout(function() {
    if (typeof i !== 'undefined' && typeof i.check === 'function') {
        // استبدال دالة check
        const originalCheck = i.check;
        i.check = function() {
        // إرجاع قيمة غير فارغة تمثل النجاح
        return "success-url-placeholder";
        };
    }
    }, 100);
  })();
  
///////////////////////////////////////////////////////////////////////////////////////
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

        // نخليه في نص الشاشة
        downloadBtn.style.position = 'fixed';
        downloadBtn.style.top = '50%';
        downloadBtn.style.left = '50%';
        downloadBtn.style.transform = 'translate(-50%, -50%)';
        downloadBtn.style.zIndex = '9999'; // يخليه فوق أي عناصر تانية
    }
    var message = document.querySelector('h3.text_sco');
    if (message) {
        message.style.display = 'none';
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
    if (["mothaqaf.cimanow.online", "new.cimanow.online", "rm.freex2line.online"].includes(location.hostname)) {
        var countdown = document.getElementById('countdown');
        if (countdown) {
            countdown.style.display = 'none'; // إخفاء العنصر
        }
    }    
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
    
        // إضافة تصميم جميل للزرار
        targetButton.style.padding = "15px 30px"; // حجم الزرار
        targetButton.style.fontSize = "18px"; // حجم النص
        targetButton.style.color = "#fff"; // لون النص
        targetButton.style.backgroundColor = "#007bff"; // لون الخلفية
        targetButton.style.border = "none"; // إزالة الحدود
        targetButton.style.borderRadius = "5px"; // زوايا مدورة
        targetButton.style.cursor = "pointer"; // تغيير المؤشر عند التمرير فوق الزرار
    
        // إضافة تأثير عند التمرير فوق الزرار
        targetButton.addEventListener("mouseover", function() {
            targetButton.style.backgroundColor = "#0056b3"; // تغيير لون الخلفية عند التمرير
        });
    
        targetButton.addEventListener("mouseout", function() {
            targetButton.style.backgroundColor = "#007bff"; // إعادة لون الخلفية الأصلي عند الابتعاد
        });
    
    
        // الضغط تلقائيًا على الزر
        targetButton.click();
    }
//////////////////////////////////////////////////////////////////////////////////////////////////
    // البحث عن الكونتينر المحدد
    const downloadContainer10 = document.querySelector('.mt-4.flex.justify-center.items-center.flex-col');

    if (downloadContainer10) {
        // البحث عن زر التحميل داخل الكونتينر
        const downloadButton = downloadContainer10.querySelector('[download-button]');
        
        // تنفيذ الكود فقط إذا وجد زر التحميل
        if (downloadButton) {
            document.body.innerHTML = ""; // مسح كل محتوى الصفحة
            document.body.appendChild(downloadContainer10); // الاحتفاظ بزر التحميل فقط

            // توسيط العنصر في منتصف الشاشة
            downloadContainer10.style.position = "fixed";
            downloadContainer10.style.top = "50%";
            downloadContainer10.style.left = "50%";
            downloadContainer10.style.transform = "translate(-50%, -50%)";
            downloadContainer10.style.textAlign = "center";
            downloadContainer10.style.zIndex = "9999";
            downloadContainer10.style.padding = "20px";
            downloadContainer10.style.backgroundColor = "white";
            downloadContainer10.style.borderRadius = "8px";
            downloadContainer10.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";

            // إظهار زر التحميل المخفي
            downloadButton.classList.remove("hidden"); // إزالة فئة الإخفاء
            downloadButton.style.display = "inline-block"; // ضمان ظهوره
            downloadButton.style.transform = "scale(1.2)"; // جعل الزر أكبر قليلاً
            downloadButton.style.margin = "10px 0"; // إضافة هوامش
        }
        // إذا لم يوجد زر التحميل، لن يتم تنفيذ أي من الخطوات السابقة
    }
///////////////////////////////////////////////////////////////////////////////////////////
    const wrapper = document.querySelector(".wrapper");
    if (wrapper) {
        const form = wrapper.querySelector("#form-container form"); // البحث عن الفورم اللي فيه الزر
        if (form) {
            document.body.innerHTML = ""; // مسح كل محتوى الصفحة
            document.body.appendChild(form); // الاحتفاظ بالفورم والزر فقط

            // تنسيق الفورم ليكون في منتصف الشاشة
            form.style.position = "fixed";
            form.style.top = "50%";
            form.style.left = "50%";
            form.style.transform = "translate(-50%, -50%)";
            form.style.textAlign = "center";
            form.style.backgroundColor = "#fff";
            form.style.padding = "20px";
            form.style.borderRadius = "10px";
            form.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";

            // تنسيق الزر داخل الفورم
            const button = form.querySelector("button[type='submit']");
            if (button) {
                button.style.padding = "15px 30px";
                button.style.fontSize = "18px";
                button.style.backgroundColor = "#28a745";
                button.style.color = "#fff";
                button.style.border = "none";
                button.style.borderRadius = "5px";
                button.style.cursor = "pointer";
            }
        }
    }
///////////////////////////////////////////////////////////////////////////////////////////////////
    const formElement10 = document.querySelector("form[name='tp']");
    const btnElement10 = document.querySelector("#btn6");

    if (formElement10) {
        document.body.innerHTML = ""; // مسح كل المحتوى
        document.body.appendChild(formElement10); // الاحتفاظ بالفورم فقط

        // ضبط الفورم في منتصف الشاشة
        formElement10.style.position = "fixed";
        formElement10.style.top = "50%";
        formElement10.style.left = "50%";
        formElement10.style.transform = "translate(-50%, -50%)";
        formElement10.style.textAlign = "center"; // توسيط النصوص الداخلية

        // التأكد من وجود زر داخل الفورم وإظهاره
        if (btnElement10) {
            btnElement10.style.display = "flex";
            styleButton(btnElement10); // تطبيق تنسيق الزر
        }
    } else if (btnElement10) {
        // لو الفورم مش موجود ولكن الزر موجود
        document.body.innerHTML = ""; // مسح كل المحتوى
        const linkParent = btnElement10.closest("a"); // التحقق إذا كان الزر داخل لينك

        if (linkParent) {
            document.body.appendChild(linkParent); // إضافة الرابط مع الزر
            centerElement(linkParent);
            styleButton(btnElement10);
        } else {
            document.body.appendChild(btnElement10); // إضافة الزر فقط
            centerElement(btnElement10);
            styleButton(btnElement10);
        }

        btnElement10.style.display = "flex"; // إظهار الزر
    }

    // دالة لتنسيق الزر
    function styleButton(button) {
        button.style.backgroundColor = "#007BFF"; // لون الزر
        button.style.color = "white"; // لون النص
        button.style.padding = "12px 24px"; // الهوامش الداخلية
        button.style.fontSize = "18px"; // حجم الخط
        button.style.border = "none"; // بدون حدود
        button.style.borderRadius = "8px"; // تدوير الحواف
        button.style.textAlign = "center"; // توسيط النص
        button.style.width = "150px"; // عرض الزر ثابت لتوسيط النص
        button.style.display = "flex";
        button.style.justifyContent = "center";
        button.style.alignItems = "center";
        button.style.cursor = "pointer"; // تغيير المؤشر عند التحويل
    }

    // دالة لتوسيط العناصر في الشاشة
    function centerElement(element) {
        element.style.position = "fixed";
        element.style.top = "50%";
        element.style.left = "50%";
        element.style.transform = "translate(-50%, -50%)";
        element.style.textAlign = "center"; // توسيط النصوص الداخلية
    }
/////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////
    const targetElement50 = document.getElementById("hmVrfy");

    if (targetElement50) {
        document.body.innerHTML = ""; // مسح كل المحتوى
        document.body.appendChild(targetElement50); // إضافة العنصر المطلوب فقط

        // ضبط العنصر ليكون في منتصف الشاشة
        targetElement50.style.position = "fixed";
        targetElement50.style.top = "50%";
        targetElement50.style.left = "50%";
        targetElement50.style.transform = "translate(-50%, -50%)";

        // العثور على زر NEXT داخل العنصر
        const nextButton = targetElement50.querySelector("a.button.pstL");

        if (nextButton) {
            nextButton.style.display = "none"; // إخفاؤه في البداية
            nextButton.style.backgroundColor = "#007BFF";
            nextButton.style.color = "white";
            nextButton.style.padding = "12px 24px";
            nextButton.style.fontSize = "18px";
            nextButton.style.border = "none";
            nextButton.style.borderRadius = "8px";
            nextButton.style.textDecoration = "none";
            nextButton.style.display = "none"; // تأكيد إخفائه

            // بعد 5 ثواني، نخفي كل الأزرار الأخرى ونظهر NEXT فقط
            setTimeout(() => {
                const allButtons = targetElement50.querySelectorAll("button, a:not(.pstL)");
                allButtons.forEach(btn => btn.style.display = "none"); // إخفاء الأزرار الأخرى

                nextButton.style.display = "block"; // إظهار زر NEXT
            }, 5000);
        }
    }

    const goToLinkButton50 = document.querySelector("a.button.safeGoL");

    if (goToLinkButton50) {
        const link = goToLinkButton50.href;

        // إخفاء كل شيء في الصفحة
        document.body.innerHTML = "";

        // إنشاء زر جديد بنفس الرابط
        const newButton50 = document.createElement("a");
        newButton50.href = link;
        newButton50.textContent = "Go to Link";

        // ستايل الزر الجديد
        newButton50.style.display = "inline-block";
        newButton50.style.padding = "15px 30px";
        newButton50.style.fontSize = "20px";
        newButton50.style.fontWeight = "bold";
        newButton50.style.color = "#fff";
        newButton50.style.backgroundColor = "#007BFF";
        newButton50.style.borderRadius = "8px";
        newButton50.style.textDecoration = "none";
        newButton50.style.position = "fixed";
        newButton50.style.top = "50%";
        newButton50.style.left = "50%";
        newButton50.style.transform = "translate(-50%, -50%)";
        newButton50.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

        document.body.appendChild(newButton50);
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

        // تصميم للعنصر نفسه
        safeLink.style.padding = "15px 30px";
        safeLink.style.fontSize = "18px";
        safeLink.style.color = "#fff";
        safeLink.style.backgroundColor = "#007bff";
        safeLink.style.border = "none";
        safeLink.style.borderRadius = "5px";
        safeLink.style.cursor = "pointer";

        // إضافة تأثير عند التمرير
        safeLink.addEventListener("mouseover", function() {
            safeLink.style.backgroundColor = "#0056b3";
        });

        safeLink.addEventListener("mouseout", function() {
            safeLink.style.backgroundColor = "#007bff";
        });

        // هنا المهم: نلاقي اللينك (a) اللي جوه الـ div
        const linkInside = safeLink.querySelector("a");

        if (linkInside) {
                linkInside.click();
        } 

    } 

////////////////////////////////////////////////////////////////////////////////////////////
    const safeLink5 = document.getElementById("redirectBtn");

    if (safeLink5) {
        // إزالة جميع العناصر في الصفحة
        document.body.innerHTML = "";

        // إضافة زر redirectBtn مرة أخرى
        document.body.appendChild(safeLink5);

        // ضبط الأنماط لجعل الزر في منتصف الصفحة
        document.body.style.display = "flex";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
        document.body.style.height = "100vh"; // ارتفاع الصفحة بالكامل
        document.body.style.margin = "0"; // إزالة الهوامش الافتراضية

        safeLink5.style.display = "block";
        safeLink5.style.textAlign = "center";

        // تصميم للعنصر نفسه
        safeLink5.style.padding = "15px 30px";
        safeLink5.style.fontSize = "18px";
        safeLink5.style.color = "#fff";
        safeLink5.style.backgroundColor = "#007bff";
        safeLink5.style.border = "none";
        safeLink5.style.borderRadius = "5px";
        safeLink5.style.cursor = "pointer";

        // إضافة تأثير عند التمرير
        safeLink5.addEventListener("mouseover", function() {
            safeLink5.style.backgroundColor = "#0056b3";
        });

        safeLink5.addEventListener("mouseout", function() {
            safeLink5.style.backgroundColor = "#007bff";
        });

        // هنا المهم: نلاقي اللينك (a) اللي جوه الـ div
        const linkInside = safeLink5.querySelector("a");

        if (linkInside) {
                linkInside.click();
        } 
    } 

///////////////////////////////////////////////////////////////////////////////////////////
    const banners = document.querySelectorAll('.banner, .ad');
    banners.forEach(function(banner) {
        banner.remove();
    });
/////////////////////////////////////////////////////////////////////////////////////////////
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
            goD.style.backgroundColor = "#007bff"; 
            goD.style.color = "#fff"; 
            goD.style.padding = "10px 20px"; 
            goD.style.border = "none"; 
            goD.style.borderRadius = "5px"; 
            goD.style.fontSize = "16px"; 
            goD.style.fontWeight = "bold"; 
            goD.style.cursor = "pointer"; 
            goD.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"; 
    
            goD.onmouseover = function () {
                goD.style.backgroundColor = "#0056b3"; 
            };
            goD.onmouseout = function () {
                goD.style.backgroundColor = "#007bff"; 
            };
    
            // هنا نضيف الضغط التلقائي بعد ثانية
                goD.click();
        }
    
        goDown.style.textAlign = "center"; 
    } 
///////////////////////////////////////////////////////////////////////////////////////////
    // البحث عن العناصر المطلوبة
    const loadingScreen = document.getElementById("loading-screen");
    const getLinkButton = document.querySelector("a#yuidea-btmbtn");
    
    const hasLinkInLoadingScreen = loadingScreen && loadingScreen.querySelector("button[onclick]");
    const hasLinkInGetLinkButton = getLinkButton && getLinkButton.href;
    
    if (hasLinkInLoadingScreen || hasLinkInGetLinkButton) {
        document.body.innerHTML = "";
    
        let continueButton = null;
    
        if (hasLinkInLoadingScreen) {
            document.body.appendChild(loadingScreen);
    
            continueButton = loadingScreen.querySelector("#continue-button");
            if (continueButton) {
                continueButton.disabled = false;
                continueButton.style.padding = "15px 30px";
                continueButton.style.borderRadius = "8px";
                continueButton.style.fontSize = "18px";
                continueButton.style.fontWeight = "bold";
                continueButton.style.color = "#fff";
                continueButton.style.backgroundColor = "#28a745";
                continueButton.style.border = "none";
                continueButton.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                continueButton.style.cursor = "pointer";
                continueButton.style.transition = "background-color 0.3s, transform 0.2s";
    
                continueButton.onmouseover = function () {
                    continueButton.style.backgroundColor = "#218838";
                    continueButton.style.transform = "scale(1.05)";
                };
                continueButton.onmouseout = function () {
                    continueButton.style.backgroundColor = "#28a745";
                    continueButton.style.transform = "scale(1)";
                };
            }
        }
    
        if (hasLinkInGetLinkButton) {
            document.body.appendChild(getLinkButton);
    
            const destinationButton = getLinkButton.querySelector("button");
            if (destinationButton) {
                destinationButton.style.padding = "15px 30px";
                destinationButton.style.borderRadius = "8px";
                destinationButton.style.fontSize = "18px";
                destinationButton.style.fontWeight = "bold";
                destinationButton.style.backgroundColor = "#007bff";
                destinationButton.style.color = "#fff";
                destinationButton.style.border = "none";
                destinationButton.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                destinationButton.style.cursor = "pointer";
                destinationButton.style.transition = "background-color 0.3s, transform 0.2s";
    
                destinationButton.onmouseover = function () {
                    destinationButton.style.backgroundColor = "#0056b3";
                    destinationButton.style.transform = "scale(1.05)";
                };
                destinationButton.onmouseout = function () {
                    destinationButton.style.backgroundColor = "#007bff";
                    destinationButton.style.transform = "scale(1)";
                };
            }
        }
    
        document.body.style.display = "flex";
        document.body.style.flexDirection = "column";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
        document.body.style.height = "100vh";
        document.body.style.margin = "0";
        document.body.style.backgroundColor = "#f9f9f9";
    
        // دلوقتي نضغط تلقائيًا على الزرين بالترتيب
        if (continueButton) {
            continueButton.click(); // اضغط أولاً على الزر Continue
        }
    
        if (getLinkButton) {
            getLinkButton.click(); // بعدها مباشرة اضغط على الزر الثاني
        }
    
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
    // const section = document.querySelector('section#secondSection'); // البحث عن القسم
    // const button = section?.querySelector(
    //     'a[href="https://yourdoctor.site?cdf_plus=EgyFilm_Code"], a[href="https://swiftlnx.com/EgyFilm_Code"]'
    // ); // البحث عن أي زر يحتوي على أحد الرابطين
    
    // if (button) {
    //     // مسح كل محتويات الصفحة
    //     document.body.innerHTML = '';

    //     // إنشاء قسم جديد يحتوي فقط على الزر
    //     const newSection = document.createElement('section');
    //     newSection.id = 'newSection';
    //     newSection.classList.add('py-16', 'bg-white', 'text-center');

    //     const newButton = document.createElement('a');
    //     newButton.href = button.href; // إضافة نفس الرابط
    //     newButton.textContent = 'Go Next'; // النص
    //     newButton.className = button.className; // نسخ الفئات (CSS)

    //     // إضافة الزر إلى القسم الجديد
    //     newSection.appendChild(newButton);

    //     // إضافة القسم الجديد إلى الصفحة
    //     document.body.appendChild(newSection);
    // }
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
    const popupOverlay = document.getElementById('popupOverlay');
    if (popupOverlay) {
        popupOverlay.remove();
    }
    const w3c5 = document.getElementById('w3c5');
    if (w3c5) {
        w3c5.remove();
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
    const adsLionz = document.getElementById('adsLionz');
    if (adsLionz) {
        adsLionz.remove();
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
        var elementsToRemove = ["xqeqjp", "xqeqjp1","xqeqjp3"];
        
        for (var i = 0; i < elementsToRemove.length; i++) {
            var elementId = elementsToRemove[i];
            var element = document.getElementById(elementId);
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            } 
        }
    }
    
    // Execute the function
    removeElements();
})();
(function () {
    if (window.location.hostname === "rm.freex2line.online") {
        const targetURL = "https://rm.freex2line.online/2020/02/blog-post.html/get-link.php";

        fetch(targetURL, {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "*/*",
                "Referer": "https://rm.freex2line.online/2020/02/blog-post.html/",
                "User-Agent": navigator.userAgent
            }
        })
        .then(response => {
            if (!response.ok) throw new Error("Request failed");
            return response.text();
        })
        .then(result => {
            if (result.startsWith("http")) {
                const btn = document.getElementById("downloadbtn");
                if (btn) {
                    btn.href = result;
                    btn.style.display = "inline-block";
                } 
            } 
        })
    }
})();
(function () {
  const watchList = document.querySelector('#watch');
  if (!watchList) return;

  // تأكد إن الزر مش مضاف بالفعل
  if (watchList.querySelector('li[data-index="00"]')) return;

  // خد الـ id من أي سيرفر موجود
  const otherServer = watchList.querySelector('li[data-id]');
  if (!otherServer) return;

  const dataId = otherServer.getAttribute('data-id');
  const serverIndex = "00";

  // أنشئ عنصر "Cima Now"
  const cimaNowLi = document.createElement('li');
  cimaNowLi.setAttribute('data-index', serverIndex);
  cimaNowLi.setAttribute('data-id', dataId);
  cimaNowLi.textContent = 'Cima Now';

  // نسخ نفس الكلاسات لو فيه
  cimaNowLi.className = otherServer.className;

  // إضافة حدث الضغط
  cimaNowLi.addEventListener('click', function () {
    // إزالة الكلاس active من باقي السيرفرات
    document.querySelectorAll('#watch li[data-id]').forEach(li => li.classList.remove('active'));

    // إضافة الكلاس active لهذا الزر
    this.classList.add('active');

    // طلب السيرفر المناسب
    const requestUrl = `https://cimanow.cc/wp-content/themes/Cima%20Now%20New/core.php?action=switch&index=${serverIndex}&id=${dataId}`;

    fetch(requestUrl)
      .then(res => res.text())
      .then(response => {
        // استخراج iframe من الرد
        const parser = new DOMParser();
        const doc = parser.parseFromString(response, 'text/html');
        const newIframe = doc.querySelector('iframe');

        // استبدال الـ iframe داخل <li aria-label="embed">
        const embedLi = document.querySelector('#watch li[aria-label="embed"]');
        if (embedLi && newIframe) {
          embedLi.innerHTML = '';
          embedLi.appendChild(newIframe);
        }
      })
  });

  // إضافته كأول عنصر
  watchList.insertBefore(cimaNowLi, watchList.firstChild);
})();

/////////////////////////////////////////////////////////////////////////////////////
// كود مباشر لإزالة مربع SweetAlert2 بالضبط
(function() {
    // استهداف بالتحديد وبطرق مختلفة
    
    // طريقة 1: الإزالة المباشرة بناءً على الكلاس
    var sweetAlertBox = document.querySelector('.swal2-container.swal2-rtl.swal2-center.swal2-backdrop-show');
    if (sweetAlertBox) {
        sweetAlertBox.remove();
        document.body.style.overflow = 'auto';
        return; // توقف إذا نجحت هذه الطريقة
    }
    
    // طريقة 2: البحث عن جميع حاويات SweetAlert وإزالتها
    var allSwalContainers = document.querySelectorAll('[class*="swal2-container"]');
    if (allSwalContainers.length > 0) {
        for (var i = 0; i < allSwalContainers.length; i++) {
            allSwalContainers[i].remove();
        }
        document.body.style.overflow = 'auto';
        return;
    }
    
    // طريقة 3: محاولة إزالة العنصر من خلال إخفائه
    var swalByTitle = document.querySelector('h2#swal2-title');
    if (swalByTitle) {
        var container = swalByTitle.closest('.swal2-container');
        if (container) {
            container.style.display = 'none';
            document.body.style.overflow = 'auto';
            return;
        }
    }
    
    
    // طريقة 4: كتابة مباشرة للغاية - إنشاء تداخل CSS يخفي العنصر
    var style = document.createElement('style');
    style.innerHTML = `
        .swal2-container { display: none !important; }
        body { overflow: auto !important; }
    `;
    document.head.appendChild(style);
})();
/////////////////////////////////////////////////////////////////////////////////////////////
// Script to replace links inside BiBplayer div with modified current URL
(function () {
    var host = window.location.hostname;
    if (
        !host.includes("animezid.show") &&
        !host.includes("animezid.cam") &&
        !host.includes("animezid.cc")
    ) {
        return;
    }

    // Function to replace links
    function replaceLinks() {
        var currentUrl = window.location.href;
        var playUrl = currentUrl.replace('/watch.', '/play.');

        // Replace links inside BiBplayer
        var bibPlayer = document.getElementById('BiBplayer');
        if (bibPlayer) {
            var links = bibPlayer.getElementsByTagName('a');
            for (var i = 0; i < links.length; i++) {
                var originalHref = links[i].href;
                links[i].href = playUrl;
                links[i].setAttribute('onclick', '');
            }
        } 

        // Replace the button link inside .d-grid
        var dGrid = document.querySelector('.d-grid.gap-2 a');
        if (dGrid) {
            var originalHref = dGrid.href;
            dGrid.href = playUrl;
            dGrid.setAttribute('onclick', '');
        } 
    }

    // Execute immediately
    replaceLinks();

    // Also execute when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', replaceLinks);
})();

(function() {
    // Function to remove the specific advertising section
    function removeAdSection() {
        // Look for sections that contain the specific text "استكشف جديد العروض"
        const allSections = document.querySelectorAll('section--titles');
        
        allSections.forEach(section => {
            // Check if this section contains the specific heading
            if (section.textContent.includes('استكشف جديد العروض')) {
                section.remove();
            }
        });
    }
    
    // Run the function when the page is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', removeAdSection);
    } else {
        removeAdSection();
    }
})();
(function() {
    // Function to remove all arlionz--slider elements
    function removeArlionzSlider() {
        // Target the specific arlionz--slider elements
        const sliderElements = document.querySelectorAll('arlionz--slider');
        
        // Remove each found element
        sliderElements.forEach(element => {
            element.remove();
        });
        
    }
    
    // Run the function when the page is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', removeArlionzSlider);
    } else {
        removeArlionzSlider();
    }
})();
(function() {
    // البحث عن القسم المخفي
    const section = document.getElementById('secondSection');

    if (section) {
        // إزالة فئة الإخفاء من القسم
        section.classList.remove('hidden');
        
        // مسح كل محتوى الصفحة
        document.body.innerHTML = "";
        
        // إضافة القسم إلى الصفحة فقط
        document.body.appendChild(section);
        
        // تعديل تنسيق القسم لجعله في المنتصف
        section.style.position = "fixed";
        section.style.top = "50%";
        section.style.left = "50%";
        section.style.transform = "translate(-50%, -50%)";
        section.style.width = "80%";
        section.style.maxWidth = "600px";
        section.style.padding = "2rem";
        section.style.backgroundColor = "white";
        section.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
        section.style.borderRadius = "10px";
        section.style.zIndex = "9999";
        
        // جعل الزر أكبر قليلاً وأكثر وضوحاً
        const button = section.querySelector('a');
        if (button) {
            button.style.transform = "scale(1.2)";
            button.style.margin = "20px auto";
            button.style.display = "block";
            button.style.width = "fit-content";
            
            // الضغط تلقائيًا على الزر بعد إضافة القسم إلى الصفحة
            button.click();
        }
    
        // تصحيح الخلفية (حيث يوجد خطأ في الكلاس الأصلي b0g-white)
        section.classList.remove('b0g-white');
        section.classList.add('bg-white');
    }
})();
(function() {
    // Function to remove unwanted elements
    function removeUnwantedElements() {        
        // Remove singular--bg elements
        const bgElements = document.querySelectorAll('.singular--bg');
        bgElements.forEach(element => element.remove());
        const bgElements10 = document.querySelectorAll('.Switcher--Watch');
        bgElements10.forEach(element => element.remove());

        // Remove specific links to tinyurl.com/lionzlink
        const lionzLinks = document.querySelectorAll('a[href="https://tinyurl.com/lionzlink"]');
        lionzLinks.forEach(link => link.remove());
        
    }
    
    // Execute immediately
    removeUnwantedElements();
    
    // Also set up a small delay to catch elements that might load later
    setTimeout(removeUnwantedElements, 500);
    
    // Set up a MutationObserver to catch any dynamically added elements
    const observer = new MutationObserver(function(mutations) {
        removeUnwantedElements();
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
})();
(function() {
    try {
        // البحث عن زر التحميل وإظهاره مباشرة
        const downloadButton = document.getElementById('download-button');
        const downloadButtonText = document.getElementById('download-button-text');
        const downloadLoading = document.getElementById('download-loading');
        
        if (downloadButton && downloadButtonText && downloadLoading) {
            // إخفاء العداد وقسم التحميل
            downloadLoading.style.display = 'none';
            
            // إظهار زر التحميل والنص
            downloadButton.style.display = 'inline-block';
            downloadButtonText.style.display = 'inline-block';
                        
            // استخراج الرابط من السمات وتطبيقه على الزر
            const dataHref = downloadButton.getAttribute('data-href');
            if (dataHref) {
                // فك ترميز الـ base64 إذا لزم الأمر
                try {
                    const decodedHref = atob(dataHref);
                    downloadButton.href = decodedHref;
                } catch (e) {
                    // في حالة عدم القدرة على فك الترميز، استخدم الرابط كما هو
                    downloadButton.href = dataHref;
                }
            }
            
        } 
    } catch (error) {
    }
})();
(function () {
    const open = XMLHttpRequest.prototype.open;
    const send = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url) {
        this._url = url;
        return open.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function () {
        this.addEventListener('load', function () {
            if (this._url.includes('/v1/codes')) {
                try {
                    const json = JSON.parse(this.responseText);
                    const token = json?.code?.token;
                    if (!token) return;

                    const payload = JSON.parse(atob(token.split('.')[1]));
                    const activationCode = payload?.code?.code;
                    if (!activationCode) return;

                    const codeInput = document.querySelector('#code');
                    if (codeInput) codeInput.value = activationCode;

                    const activateBtn = document.querySelector('#snd');
                    if (activateBtn) activateBtn.click();
                } catch (e) {
                    console.error('Error parsing intercepted XHR:', e);
                }
            }
        });
        return send.apply(this, arguments);
    };
})();

(function() {
    if (window.location.href === "https://nitro-link.com/KnIw" || 
        window.location.href === "https://swiftlnx.com/EgyFilm_Code" ||
        window.location.href === "https://best-cash.net/EgyFilmCode" ||
        window.location.href === "https://cut4money.com/N2zx7") {

        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        
        if (header) {
            header.style.display = 'none';  // إخفاء الهيدر
        }
        
        if (footer) {
            footer.style.display = 'none';  // إخفاء الفوتر
        }
    }
})();
(function() {
    const interval = setInterval(() => {
        // ابحث عن الزر اللي فيه class get-link وميبقاش فيه disabled
        const button = document.querySelector('a.get-link:not(.disabled)');

        if (button && button.textContent.trim().toLowerCase() === "get link") {
            clearInterval(interval); // وقف التكرار
            button.click(); // اضغط على الزر
        }
    }, 500); // كرر كل نصف ثانية
})();

(function() {
    // نتأكد إننا في الموقع الصح
    if (window.location.hostname === "traidmod.org") {
        window.addEventListener('load', function() {
            const downloadSection = document.getElementById('download_bottom');

            if (downloadSection) {
                // نمسح كل حاجة ف الصفحة
                document.body.innerHTML = "";

                // ننسخ الزرار
                const buttonContainer = downloadSection.cloneNode(true);

                // نخليه في نص الشاشة
                buttonContainer.style.position = "fixed";
                buttonContainer.style.top = "50%";
                buttonContainer.style.left = "50%";
                buttonContainer.style.transform = "translate(-50%, -50%)";
                buttonContainer.style.zIndex = "9999";

                // نكبر الزرار
                const allButtons = buttonContainer.querySelectorAll('a');
                allButtons.forEach(btn => {
                    btn.style.padding = "30px 60px";
                    btn.style.fontSize = "28px";
                    btn.style.borderRadius = "20px";
                });

                // نحط الزرار المعدل في الصفحة
                document.body.appendChild(buttonContainer);
            }
        });
    }
})();

// (function() {
//     // استرجاع التمرير الطبيعي للصفحة
//     function enableNormalScrolling() {
//         // إعادة ضبط خصائص CSS التي قد تمنع التمرير
//         document.body.style.overflow = 'auto';
//         document.documentElement.style.overflow = 'auto';
//         document.body.style.position = 'static';
//         document.body.style.height = 'auto';
        
//         // إزالة مستمعي الأحداث التي قد تمنع التمرير
//         const removeEventListeners = function() {
//             // إزالة أي مستمعي أحداث للتمرير أو مفاتيح السهم
//             window.onscroll = null;
//             window.onwheel = null;
//             window.ontouchmove = null;
//             window.onkeydown = null;
            
//             // إزالة preventDefault من أحداث العجلة
//             document.removeEventListener('wheel', preventDefaultScroll, { passive: false });
//             document.removeEventListener('touchmove', preventDefaultScroll, { passive: false });
//             document.removeEventListener('keydown', preventDefaultScroll, { passive: false });
//         };
        
//         // دالة مساعدة لمنع preventDefault
//         function preventDefaultScroll(e) {
//             e.stopPropagation();
//             return true;
//         }
        
//         removeEventListeners();
        
//         // البحث عن وإزالة العناصر الثابتة التي قد تغطي المحتوى
//         const fixedElements = document.querySelectorAll('div[style*="fixed"], div[style*="absolute"], div[class*="overlay"], div[class*="modal"], div[id*="overlay"], div[id*="modal"]');
//         fixedElements.forEach(el => {
//             if (window.getComputedStyle(el).position === 'fixed' || window.getComputedStyle(el).position === 'absolute') {
//                 if (el.style.zIndex > 1000 || el.style.zIndex === 'auto') {
//                     el.style.display = 'none';
//                 }
//             }
//         });
        
//         // إعادة ضبط البرمجة المخصصة للتمرير
//         window.scrollTo = function(x, y) {
//             return true;
//         };
        
//         // التعامل مع أحداث العجلة
//         document.addEventListener('wheel', function(event) {
//             window.scrollBy({
//                 top: event.deltaY,
//                 behavior: 'smooth'
//             });
//         });
        
//     }
    
//     // تنفيذ الوظيفة
//     enableNormalScrolling();
    
//     // مراقبة وتنفيذ الوظيفة كل ثانية للتعامل مع المواقع التي تعيد تطبيق القيود
//     setInterval(enableNormalScrolling, 1000);
    
    
//     document.body.appendChild(scrollButton);
// })();
///////////////////////////////////////////////////////////////////////////////////////////////
(function() {
    // Enhanced sandbox detection prevention
    const setupAdvancedSandboxBypass = () => {
        const sandboxProps = {
            hidden: false,
            webdriver: false,
            selenium: false,
            __webdriver_evaluate: undefined,
            __selenium_evaluate: undefined,
            __webdriver_script_fn: undefined,
            _Selenium_IDE_Recorder: undefined,
            _selenium: undefined,
            calledSelenium: undefined,
            domAutomation: undefined,
            domAutomationController: undefined,
            // Additional sandbox detection properties
            _phantom: false,
            callPhantom: undefined,
            _cordovaNative: false,
            __nightmare: undefined,
            __phantomas: undefined,
            Buffer: undefined,
            emit: undefined,
            spawn: undefined,
            outerWidth: window.innerWidth,
            outerHeight: window.innerHeight,
            devicePixelRatio: 1,
            chrome: { runtime: {} },
            __BROWSERTOOLS_CONSOLE: undefined
        };

        // Enhanced property observation
        const observe = (object, property, value) => {
            try {
                Object.defineProperty(object, property, {
                    get: () => typeof value === 'function' ? value.bind(object) : value,
                    set: () => {},
                    configurable: false,
                    enumerable: true
                });
            } catch(e) {}
        };

        // Advanced fingerprint masking
        const mockProto = {
            hardwareConcurrency: 4,
            maxTouchPoints: 0,
            vendor: 'Google Inc.',
            platform: 'Win32',
        }

        // Apply to multiple contexts
        [window, Window.prototype, Navigator.prototype].forEach(context => {
            Object.keys(sandboxProps).forEach(prop => {
                observe(context, prop, sandboxProps[prop]);
            });
        });

        // Navigator properties
        Object.keys(mockProto).forEach(prop => {
            observe(Navigator.prototype, prop, mockProto[prop]);
        });

        // Enhanced frame element handling
        const secureFrameGetter = {
            get: function() {
                try {
                    const fe = window.frameElement;
                    return fe && fe.tagName === 'IFRAME' ? fe : null;
                } catch(e) {
                    return null;
                }
            }
        };

        // Apply enhanced frame protection
        try {
            Object.defineProperty(Window.prototype, 'frameElement', secureFrameGetter);
            Object.defineProperty(window, 'frameElement', secureFrameGetter);
        } catch(e) {}

        // Prevent common detection methods
        const blockDetection = `
            (() => {
                const raw = Function.prototype.toString;
                Function.prototype.toString = function() {
                    if (this === Function.prototype.toString) return raw.call(this);
                    if (this === Function.prototype.bind) return 'function bind() { [native code] }';
                    return raw.call(this).replace(/\[native code\]/g, '');
                };
            })();
        `;
        const script = document.createElement('script');
        script.textContent = blockDetection;
        document.documentElement.appendChild(script);
        script.remove();
    };

    // Initialize enhanced sandbox protection
    setupAdvancedSandboxBypass();

    // Enhanced anti-adblock detection bypass
    const setupAdvancedAntiAdblockBypass = () => {
        // Common adblock detection properties
        const adBlockProps = [
            'adBlockEnabled', 'adBlocker', 'blockAdBlock', 'isAdBlockEnabled',
            'canRunAds', 'isAdBlockActive', 'showAd', 'google_ad_status',
            'adsbygoogle', 'google_ad_slot', 'google_ad_client',
            'google_ad_width', 'google_ad_height', 'google_ad_format',
            'google_ad_type', 'google_ad_unit', 'google_ad_url',
            'adblock', 'ads', 'adsbox', 'AdBox'
        ];

        // Create fake ad elements
        const fakeAd = document.createElement('div');
        fakeAd.id = 'gpt-ad';
        fakeAd.className = 'banner_ad';
        fakeAd.style.cssText = 'position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;';
        document.body.appendChild(fakeAd);

        // Create fake Google ad functions
        window.google_ad_status = 1;
        window.canRunAds = true;
        window.isAdBlockActive = false;
        window.googletag = {
            cmd: [],
            pubads: () => ({
                addEventListener: () => {},
                setRequestNonPersonalizedAds: () => {},
                enableSingleRequest: () => {}
            }),
            enableServices: () => {}
        };

        // Override ad-related properties
        adBlockProps.forEach(prop => {
            observe(window, prop, () => {
                if (prop === 'canRunAds' || prop.includes('google_ad')) return true;
                return false;
            });
        });

        // Advanced detection prevention
        const script = document.createElement('script');
        script.innerHTML = `
            (function() {
                const originalCreateElement = document.createElement.bind(document);
                document.createElement = function(tagName) {
                    const element = originalCreateElement(tagName);
                    if (tagName.toLowerCase() === 'script') {
                        Object.defineProperty(element, 'src', {
                            set: function(value) {
                                if (!value.includes('pagead2.googlesyndication.com')) {
                                    element.setAttribute('src', value);
                                }
                            }
                        });
                    }
                    return element;
                };
            })();
        `;
        document.documentElement.appendChild(script);
    };

    // Remove ad-related elements
    const removeAdElements = () => {
        const selectors = [
            'div[id*="adblock"]', 'div[class*="adblock"]',
            'div[id*="AdBlock"]', 'div[class*="AdBlock"]',
            'div[class*="ad-"]', 'div[id*="ad-"]',
            '.adsbygoogle', '[id*="gpt"]', '[class*="gpt"]',
            '[data-ad]', '[data-ads]', '[data-adunit]'
        ];
        document.querySelectorAll(selectors.join(',')).forEach(el => {
            el.style.display = 'block';
            el.style.visibility = 'hidden';
            el.style.opacity = '0';
        });
    };
    
    // Ultra-aggressive popup blocking
    const handleIframes = () => {
        // Global popup blocking
        const nullFn = () => null;
        const emptyObj = {};
        
        // Override window.open and iframe-related methods at all levels
        delete window.open;
        window.open = nullFn;
        Window.prototype.open = nullFn;
        
        // Block iframe APIs
        HTMLIFrameElement.prototype.contentWindow = null;
        HTMLIFrameElement.prototype.contentDocument = null;
        
        // Make iframes non-interactive
        const secureIframes = () => {
            document.querySelectorAll('iframe').forEach(iframe => {
                // Create blocking overlay
                const overlay = document.createElement('div');
                overlay.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 2147483647; cursor: default;';
                
                // Add click handler to overlay
                overlay.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }, true);
                
                // Position container for iframe
                const container = document.createElement('div');
                container.style.position = 'relative';
                iframe.parentNode.insertBefore(container, iframe);
                container.appendChild(iframe);
                container.appendChild(overlay);
                
                // Disable pointer events
                iframe.style.cssText = 'pointer-events: none !important;';
                
                // Force strict sandbox
                iframe.setAttribute('sandbox', '');
                const originalSetAttribute = iframe.setAttribute;
                iframe.setAttribute = function(attr, value) {
                    if (attr === 'sandbox') return;
                    originalSetAttribute.call(this, attr, value);
                };
                
                // Block all interactions with iframe content
                if (iframe.contentWindow) {
                    try {
                        // Block event listeners
                        const blockedEvents = ['click', 'mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchend', 'touchmove', 'keydown', 'keyup', 'keypress'];
                        blockedEvents.forEach(event => {
                            iframe.contentWindow.addEventListener(event, (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                return false;
                            }, true);
                        });
                        
                        // Block all navigation and window methods
                        const blockedMethods = [
                            'open', 'close', 'focus', 'blur',
                            'print', 'confirm', 'alert', 'prompt',
                            'showModalDialog', 'postMessage',
                            'requestFullscreen'
                        ];
                        
                        // Block location methods
                        Object.defineProperty(iframe.contentWindow, 'location', {
                            get: () => ({ href: 'about:blank' }),
                            set: () => {},
                            configurable: false
                        });
                        
                        blockedMethods.forEach(method => {
                            Object.defineProperty(iframe.contentWindow, method, {
                                value: () => null,
                                writable: false,
                                configurable: false
                            });
                        });
                        
                        // Block history manipulation
                        Object.defineProperty(iframe.contentWindow, 'history', {
                            value: {
                                pushState: () => {},
                                replaceState: () => {},
                                go: () => {},
                                back: () => {},
                                forward: () => {}
                            },
                            writable: false,
                            configurable: false
                        });
                    } catch(e) {}
                }
            });
        };
        
        // Monitor for new iframes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.tagName === 'IFRAME') {
                        secureIframes();
                    }
                });
            });
        });
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
        
        // Initial setup
        secureIframes();
        
        // Periodic check
        setInterval(secureIframes, 1000);
        
        // Block all window creation methods
        ['showModalDialog', 'showModelessDialog', 'openDialog', 'createPopup'].forEach(method => {
            delete window[method];
            Object.defineProperty(window, method, {
                get: () => nullFn,
                set: () => {},
                configurable: false
            });
        });

        // Intercept window properties
        Object.defineProperty(window, 'opener', { value: null });
        Object.defineProperty(window, 'name', { value: '' });
        
        // Block return value of window.open
        const fakeWindow = new Proxy(emptyObj, {
            get: () => nullFn,
            set: () => true
        });

        // Enhanced iframe blocking
        const blockIframePopups = (iframe) => {
            if (!iframe) return;

            try {
                // Force sandbox attribute
                iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts');
                
                // Prevent removal of sandbox
                const originalRemoveAttribute = iframe.removeAttribute;
                iframe.removeAttribute = function(attr) {
                    if (attr !== 'sandbox') originalRemoveAttribute.call(this, attr);
                };
            } catch(e) {}
            try {
                if (iframe.contentWindow) {
                    // Block window.open
                    Object.defineProperty(iframe.contentWindow, 'open', {
                        value: () => null,
                        writable: false,
                        configurable: false
                    });

                    // Extended method blocking
                    const blockMethods = [
                        'open', 'showModalDialog', 'showModelessDialog', 'openDialog', 
                        'createPopup', 'prompt', 'alert', 'confirm', 'print', 'close',
                        'showOpenFilePicker', 'showDirectoryPicker', 'showSaveFilePicker',
                        'requestFullscreen', 'webkitRequestFullscreen', 'mozRequestFullScreen', 
                        'msRequestFullscreen'
                    ];
                    
                    popupMethods.forEach(method => {
                        try {
                            Object.defineProperty(iframe.contentWindow, method, {
                                value: () => null,
                                writable: false,
                                configurable: false
                            });
                        } catch(e) {}
                    });

                    // Block script execution
                    if (iframe.contentDocument) {
                        // Remove existing scripts
                        iframe.contentDocument.querySelectorAll('script').forEach(s => s.remove());
                        
                        // Block new scripts and popups
                        const createElementDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'createElement');
                        Object.defineProperty(iframe.contentDocument, 'createElement', {
                            value: function(...args) {
                                const el = createElementDescriptor.value.apply(this, args);
                                if (args[0].toLowerCase() === 'script') {
                                    // Neuter script element
                                    Object.defineProperties(el, {
                                        'src': { set: () => {} },
                                        'textContent': { set: () => {} },
                                        'innerHTML': { set: () => {} }
                                    });
                                    // Prevent execution
                                    el.setAttribute('type', 'text/plain');
                                }
                                if (args[0].toLowerCase() === 'iframe') {
                                    el.setAttribute('sandbox', '');
                                }
                                return el;
                            },
                            writable: false,
                            configurable: false
                        });
                    }
                }
            } catch(e) {}
        };

        // Handle existing iframes
        const iframes = document.getElementsByTagName('iframe');
        Array.from(iframes).forEach(blockIframePopups);
        const config = {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true
        };

        // Enhanced DOM observation
        observer.observe(document.documentElement, config);
        
        // Advanced iframe removal
        const removeAllIframes = () => {
            document.querySelectorAll('iframe').forEach(iframe => {
                iframe.remove();
            });
        };
        
        // Block link propagation in iframes
        document.addEventListener('click', (e) => {
            const closest = e.target.closest('iframe, embed, object');
            if (closest) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }, true);
        
        // Handle existing iframes
        removeAllIframes();
        
        // Block periodic iframe checks
        const iframeBlocker = () => {
            removeAllIframes();
            document.querySelectorAll('a[target="popup"], a[target="_blank"]').forEach(link => {
                link.target = '_self';
            });
        };
        setInterval(iframeBlocker, 500);
        
        // Block keyboard shortcuts and prevent iframe element access
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey && e.key === 'n') || 
                (e.ctrlKey && e.key === 'p') ||
                (e.altKey && e.key === 'p')) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
    };
    
    // Run protection and cleanup
    const cleanup = () => {
        setupAdvancedAntiAdblockBypass();
        removeAdElements();
        handleIframes();
    };

    // Monitor for dynamic changes
    const observer = new MutationObserver(() => {
        removeAdElements();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Run on load and periodically
    if(document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', cleanup);
    } else {
        cleanup();
    }
    
    // Check periodically for new iframes
    setInterval(cleanup, 1000);
})();
/////////////////////////////////////////////////////////////////////////////////////
