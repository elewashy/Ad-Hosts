import re
import requests

def fetch_file(url):
    response = requests.get(url)
    response.raise_for_status()
    return response.text.splitlines()

def extract_regex_lines(lines):
    regex_lines = []
    for line in lines:
        line = line.strip()
        if line.startswith('!') or not line:
            continue
        if re.match(r"^/.+/\$", line):
            regex_lines.append(line)
    return regex_lines

def save_to_txt(lines, filename="regex_filters.txt"):
    with open(filename, 'w', encoding='utf-8') as f:
        for line in lines:
            f.write(line + '\n')
    print(f"Saved {len(lines)} regex lines to {filename}")

def main():
    url = "https://ublockorigin.pages.dev/filters/filters.min.txt"
    try:
        lines = fetch_file(url)
        regex_filters = extract_regex_lines(lines)
        save_to_txt(regex_filters)
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    main()
