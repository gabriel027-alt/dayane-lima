import urllib.request
import re
import html

url = 'https://www.instagram.com/dayanelimaestetica/p/DXseaZzjJb5/'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        content = resp.read().decode('utf-8', errors='ignore')
        m_img = re.search(r'property="og:image"\s+content="([^"]+)"', content)
        m_vid = re.search(r'property="og:video(?::secure_url)?"\s+content="([^"]+)"', content)
        m_title = re.search(r'property="og:title"\s+content="([^"]+)"', content)
        m_desc = re.search(r'property="og:description"\s+content="([^"]+)"', content)
        
        print("TITLE:", html.unescape(m_title.group(1)) if m_title else "None")
        print("DESC:", html.unescape(m_desc.group(1)) if m_desc else "None")
        print("IMG:", m_img.group(1) if m_img else "None")
        print("VID:", m_vid.group(1) if m_vid else "None")
except Exception as e:
    print("Error:", e)
