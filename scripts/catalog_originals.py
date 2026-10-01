import os
import re
from PIL import Image

with open('public/midias/links.txt', 'r') as f:
    links = [l.strip() for l in f if l.strip()]

shortcode_to_link = {}
for i, url in enumerate(links, 1):
    m = re.search(r'/(?:p|reel)/([^/]+)/?', url)
    if m:
        shortcode_to_link[m.group(1)] = (i, url)

folder = 'public/midias'
files = sorted(os.listdir(folder))

print("=== REAL ORIGINAL PHOTOS FROM LINKS ===")
real_photos = []
for f in files:
    if f.endswith('.jpg') and any(f.startswith(y) for y in ['2019-', '2021-', '2022-', '2023-', '2024-', '2025-', '2026-']):
        p = os.path.join(folder, f)
        sc = None
        for k in shortcode_to_link:
            if k in f:
                sc = k
                break
        im = Image.open(p)
        link_info = shortcode_to_link.get(sc, ("?", "?"))
        real_photos.append((f, im.size, os.path.getsize(p), link_info[0], link_info[1]))
        print(f"Photo: {f} | {im.size} | Link {link_info[0]}: {link_info[1]}")

print(f"\nTotal real photos: {len(real_photos)}")

print("\n=== REAL ORIGINAL VIDEOS FROM LINKS ===")
real_videos = []
for f in files:
    if f.endswith('.mp4') and (f.startswith('Video by') or f == 'video-hero-dayane.mp4' or f == 'video-depilacao-laser-hakon.mp4'):
        p = os.path.join(folder, f)
        sc = None
        for k in shortcode_to_link:
            if k in f:
                sc = k
                break
        link_info = shortcode_to_link.get(sc, ("Special", "Hero/Laser"))
        real_videos.append((f, os.path.getsize(p), link_info[0], link_info[1]))
        print(f"Video: {f} | {os.path.getsize(p)} bytes | Link {link_info[0]}: {link_info[1]}")

print(f"\nTotal real videos: {len(real_videos)}")
