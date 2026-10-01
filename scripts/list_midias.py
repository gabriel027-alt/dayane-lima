import os
import hashlib
from PIL import Image

folder = 'public/midias'
files = sorted([f for f in os.listdir(folder) if os.path.isfile(os.path.join(folder, f))])

with open('public/midias/links.txt', 'r') as f:
    links = [l.strip() for l in f if l.strip()]

print(f"Total files in {folder}: {len(files)}")
print(f"Total links in links.txt: {len(links)}")

# Group files
for f in files:
    p = os.path.join(folder, f)
    sz = os.path.getsize(p)
    ext = os.path.splitext(f)[1].lower()
    dim = ""
    if ext in ['.jpg', '.jpeg', '.png', '.webp']:
        try:
            with Image.open(p) as im:
                dim = f"{im.size[0]}x{im.size[1]}"
        except:
            dim = "err"
    print(f"{f:50} | {sz:10} bytes | {dim:10}")
