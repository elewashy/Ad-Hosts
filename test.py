import requests
import re

# الرابط الذي يحتوي على البيانات
url = "https://ublockorigin.pages.dev/filters/filters.min.txt"

# اسم الملف الناتج
output_file = "all_hosts.txt"

try:
    # تحميل محتوى الملف
    response = requests.get(url)
    response.raise_for_status()
    content = response.text

    # استخراج جميع الهوستس باستخدام تعبير منتظم
    # يبحث عن كلمات تبدو كهوست (مثل domain.com أو sub.domain.com)
    hosts = re.findall(r'([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})', content)

    # إزالة التكرارات وتنسيق الهوستس
    unique_hosts = sorted(set(hosts))
    formatted_hosts = [f"||{host}^" for host in unique_hosts]

    # حفظ الهوستس في ملف نصي
    with open(output_file, "w", encoding="utf-8") as file:
        file.write("\n".join(formatted_hosts))

    print(f"تم استخراج {len(unique_hosts)} هوست وحفظها في الملف: {output_file}")
except Exception as e:
    print(f"حدث خطأ أثناء التنفيذ: {e}")
