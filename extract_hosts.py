import requests
import re

# الروابط
urls = [
    "https://raw.githubusercontent.com/AdguardTeam/FiltersRegistry/master/filters/filter_2_Base/filter.txt",
    "https://raw.githubusercontent.com/AdguardTeam/FiltersRegistry/master/filters/filter_15_DnsFilter/filter.txt",
    "https://adguardteam.github.io/AdGuardSDNSFilter/Filters/filter.txt",
    "https://raw.githubusercontent.com/uniartisan/adblock_list/refs/heads/master/adblock.txt",
    "https://filters.adtidy.org/extension/chromium/filters/14.txt",
    "https://filters.adtidy.org/extension/chromium/filters/3.txt",
    "https://filters.adtidy.org/extension/chromium/filters/4.txt",
    "https://easylist.to/easylist/easylist.txt",
    "https://ublockorigin.pages.dev/filters/filters.min.txt",
    "https://raw.githubusercontent.com/AdguardTeam/FiltersRegistry/master/filters/filter_11_Mobile/filter.txt",
    "https://raw.githubusercontent.com/AdguardTeam/FiltersRegistry/master/filters/filter_19_Annoyances_Popups/filter.txt"
]

# قائمة لتخزين الدومينات بدون تكرار
ad_domains = set()

# استخراج الدومينات من كل رابط
for url in urls:
    try:
        print(f"Fetching: {url}")
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        content = response.text

        # استخراج الدومينات باستخدام تعبير منتظم
        domains = re.findall(r'\|\|([\w.-]+)\^', content)
        ad_domains.update(domains)

    except requests.RequestException as e:
        print(f"Failed to fetch {url}: {e}")

# حفظ الدومينات مع التنسيق المطلوب
output_file = "formatted_ad_domains.txt"
with open(output_file, "w") as f:
    for domain in sorted(ad_domains):
        f.write(f"||{domain}^\n")

print(f"Formatted domains saved to {output_file}")
