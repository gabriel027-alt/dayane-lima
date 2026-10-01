import os
import re

public_files = set(os.listdir('public/midias'))

references = []
missing = []

for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.tsx', '.ts', '.jsx', '.js', '.css')):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as fh:
                for idx, line in enumerate(fh, 1):
                    for m in re.finditer(r'/midias/([a-zA-Z0-9_\-\.\%]+)', line):
                        fn = m.group(1)
                        references.append((p, idx, fn))
                        if fn not in public_files:
                            missing.append((p, idx, fn))

print(f"Total /midias/ references in code: {len(references)}")
print(f"Missing files ({len(missing)}):")
for p, idx, fn in missing:
    print(f"  {p}:{idx} -> {fn}")

if not missing:
    print("SUCCESS: ALL /midias/ references resolve 100% perfectly to existing authentic files in public/midias/!")
