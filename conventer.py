# قراءة محتويات ملف الهوستات
with open('AdguardDNS.txt', 'r') as file:
    lines = file.readlines()

# تحويل كل سطر إلى صيغة فلتر
filters = []
for line in lines:
    line = line.strip()  # إزالة المسافات الزائدة
    if line and not line.startswith("#"):  # تجاهل الأسطر الفارغة أو التعليقات
        domain = line.split()[1]  # استخراج النطاق
        filters.append(f"||{domain}^")

# كتابة الفلاتر إلى ملف جديد
with open('filters.txt', 'w') as file:
    file.write("\n".join(filters))

print("تم تحويل الهوستات إلى صيغة فلتر بنجاح!")
