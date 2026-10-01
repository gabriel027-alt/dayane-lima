import os
from PIL import Image

folder = 'public/midias'
# Let's inspect the 9 Dayane photos
dayane_photos = [
    '2019-04-04_13-08-14_Bv1bFuNj8h8.jpg',
    '2021-08-26_17-16-08_CTC7BA6rj4u.jpg',
    '2024-04-27_10-55-00_C6Qyc3ELnl7.jpg',
    '2024-04-29_11-25-00_C6V_kN2rb6w_2.jpg',
    '2024-06-17_10-50-00_C8UGcuMOEnH.jpg',
    '2024-07-08_10-45-00_C9KKjz-JkRX.jpg',
    '2025-07-05_22-37-04_DLvjygHy-sF.jpg',
    '2026-03-01_19-15-27_DVWmku1EnFO.jpg',
    '2026-04-29_00-11-41_DXseaZzjJb5.jpg',
]

for f in dayane_photos:
    p = os.path.join(folder, f)
    im = Image.open(p)
    # calculate average color
    thumb = im.resize((10, 10))
    pixels = list(thumb.getdata())
    avg_r = sum(p[0] for p in pixels) / 100
    avg_g = sum(p[1] for p in pixels) / 100
    avg_b = sum(p[2] for p in pixels) / 100
    print(f"{f} | Size: {im.size} | Avg RGB: ({avg_r:.1f}, {avg_g:.1f}, {avg_b:.1f})")
