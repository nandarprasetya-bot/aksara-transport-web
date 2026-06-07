import urllib.request

url = "http://localhost:8000/js/main.js?v=2.0"
print(f"Fetching {url}...")
try:
    with urllib.request.urlopen(url) as response:
        content = response.read().decode('utf-8')
    lines = content.split('\n')
    print(f"Total lines: {len(lines)}")
    for idx in range(780, 810):
        if idx < len(lines):
            print(f"{idx+1}: {lines[idx]}")
except Exception as e:
    print(f"Error: {e}")
