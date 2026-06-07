import subprocess
import re
import time

cmd = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "--headless",
    "--disable-gpu",
    "--dump-dom",
    "http://localhost:8000/kontak.html?supir=lepas-kunci&mobil=Honda+Brio+Matic&paket=12-Jam-Weekday"
]

print("Dumping DOM...")
res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
html = res.stdout

# Look for selected attribute in the options of sewaMobil
print("=== sewaMobil Options ===")
for match in re.finditer(r'<option.*?</option>', html):
    opt = match.group(0)
    if 'sewaMobil' in html[match.start() - 500 : match.end() + 500]: # filter roughly near selectMobil
        print(opt)

# Let's run a script via a temporary html page or check console logs to inspect selected values
