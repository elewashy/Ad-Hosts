with open('AdguardDNS.txt', 'r') as file:
    lines = file.readlines()

filters = []
for line in lines:
    line = line.strip()  
    if line and not line.startswith("#"):  
        domain = line.split()[1]  
        filters.append(f"||{domain}^")

with open('filters.txt', 'w') as file:
    file.write("\n".join(filters))

print("done")
