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
// document.querySelector('a.btn-primary').className = 'btn btn-custom';
// document.querySelector('a.btn-custom').innerHTML = '<i class="bi bi-cloud-download-fill"></i> Start Download';
// document.querySelector('a.btn-custom').style.cssText = `
//     background-color:rgb(46, 40, 167);
//     color: white;
//     padding: 15px 30px;
//     border-radius: 25px;
//     font-size: 1.2rem;
//     text-align: center;
//     text-decoration: none;
//     display: inline-block;
//     transition: all 0.3s ease-in-out;
// `;
// document.querySelector('a.btn-custom').onmouseover = function() {
//     this.style.backgroundColor = '#218838';
// };
// document.querySelector('a.btn-custom').onmouseout = function() {
//     this.style.backgroundColor = '#28a745';
// };

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

})();
(function() {
    // قائمة الأنماط المحظورة
    const blockedPatterns = ['/xads.js', '/inc.js'];

    // الرابط الحالي
    const currentUrl = window.location.href;

    // التحقق إذا كان الرابط يحتوي على أي من الأنماط المحظورة
    for (const pattern of blockedPatterns) {
        if (currentUrl.includes(pattern)) {
            // منع الصفحة من العمل
            document.body.innerHTML = ''; // حذف المحتوى
            window.stop(); // إيقاف تحميل الصفحة
            return; // الخروج من السكربت
        }
    }
})();
