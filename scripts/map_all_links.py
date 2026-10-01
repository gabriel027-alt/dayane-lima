import os
import re

with open('public/midias/links.txt', 'r') as f:
    links = [l.strip() for l in f if l.strip()]

all_files = sorted(os.listdir('public/midias'))

print(f"Total links: {len(links)}")
print("-" * 80)

for idx, url in enumerate(links, 1):
    m = re.search(r'/(?:p|reel)/([^/]+)/?', url)
    sc = m.group(1) if m else "NONE"
    
    # Find matching files in public/midias
    matched = [f for f in all_files if sc in f]
    print(f"[{idx:02d}] {sc:15} | {url}")
    if matched:
        for mf in matched:
            sz = os.path.getsize(os.path.join('public/midias', mf))
            print(f"      -> {mf} ({sz} bytes)")
    else:
        print("      -> NO DIRECT SHORTCODE MATCH")
