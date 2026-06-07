import subprocess
import re
import sys

def test_url(url, description):
    print(f"\nTesting: {description}")
    print(f"URL: {url}")
    cmd = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "--headless",
        "--disable-gpu",
        "--dump-dom",
        url
    ]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    html = res.stdout
    
    # 1. Check selected car option
    selected_car = None
    car_match = re.search(r'<select id="sewaMobil"[^>]*>(.*?)</select>', html, re.DOTALL)
    if car_match:
        options = car_match.group(1)
        for opt in re.finditer(r'<option[^>]*value="([^"]+)"([^>]*)>', options):
            val = opt.group(1)
            attrs = opt.group(2)
            if 'selected' in attrs:
                selected_car = val
                break
    print(f"  -> Selected Car Option: {selected_car}")

    # 2. Check selected package option
    selected_paket = None
    paket_match = re.search(r'<select id="sewaPaket"[^>]*>(.*?)</select>', html, re.DOTALL)
    if paket_match:
        options = paket_match.group(1)
        for opt in re.finditer(r'<option[^>]*value="([^"]+)"([^>]*)>', options):
            val = opt.group(1)
            attrs = opt.group(2)
            if 'selected' in attrs:
                selected_paket = val
                break
    print(f"  -> Selected Paket Option: {selected_paket}")

    # 3. Check duration input value
    durasi_val = None
    durasi_match = re.search(r'id="sewaDurasi"[^>]*value="([^"]+)"', html)
    if durasi_match:
        durasi_val = durasi_match.group(1)
    print(f"  -> Durasi Input Value: {durasi_val}")

    # 4. Check calculated total price and DP in sidebar
    total_val = None
    dp_val = None
    total_match = re.search(r'id="calcTotal">([^<]+)<', html)
    dp_match = re.search(r'id="calcDP">([^<]+)<', html)
    if total_match: total_val = total_match.group(1)
    if dp_match: dp_val = dp_match.group(1)
    print(f"  -> Total Biaya Sewa: {total_val}")
    print(f"  -> Estimasi DP (30%): {dp_val}")

    # 5. Check out of town warning banner visibility
    warning_style = None
    warning_match = re.search(r'id="warningLuarKota"\s+style="([^"]+)"', html)
    if warning_match:
        warning_style = warning_match.group(1)
    print(f"  -> warningLuarKota Style: {warning_style}")
    
    return {
        'car': selected_car,
        'paket': selected_paket,
        'durasi': durasi_val,
        'total': total_val,
        'dp': dp_val,
        'warning_style': warning_style
    }

# Run tests
ok = True

# Test 1: Brio prefill
res1 = test_url(
    "http://localhost:8000/pesan-sopir.html?mobil=Honda+Brio",
    "Prefill Honda Brio"
)
if res1['car'] != 'Honda Brio (Sopir)':
    print("FAIL: Expected Honda Brio (Sopir)")
    ok = False

# Test 2: Avanza Facelift prefill + Fullday package
res2 = test_url(
    "http://localhost:8000/pesan-sopir.html?mobil=Toyota+Avanza+Facelift&paket=Fullday",
    "Prefill Avanza Facelift + Fullday"
)
if res2['car'] != 'Toyota Avanza Facelift (Sopir)':
    print("FAIL: Expected Toyota Avanza Facelift (Sopir)")
    ok = False
if res2['paket'] != 'Fullday':
    print("FAIL: Expected Fullday")
    ok = False
if res2['total'] != 'Rp 600.000':
    print("FAIL: Expected Rp 600.000 total price")
    ok = False

# Test 3: Avanza FWD prefill + 12-Jam package
res3 = test_url(
    "http://localhost:8000/pesan-sopir.html?mobil=Toyota+Avanza+FWD&paket=12-Jam",
    "Prefill Avanza FWD + 12-Jam"
)
if res3['car'] != 'Toyota Avanza FWD (Sopir)':
    print("FAIL: Expected Toyota Avanza FWD (Sopir)")
    ok = False
if res3['paket'] != '12-Jam':
    print("FAIL: Expected 12-Jam")
    ok = False
if res3['total'] != 'Rp 650.000':
    print("FAIL: Expected Rp 650.000 total price")
    ok = False

# Test 4: Xpander prefill + Fullday
res4 = test_url(
    "http://localhost:8000/pesan-sopir.html?mobil=Mitsubishi+Xpander&paket=Fullday",
    "Prefill Xpander + Fullday"
)
if res4['car'] != 'Mitsubishi Xpander (Sopir)':
    print("FAIL: Expected Mitsubishi Xpander (Sopir)")
    ok = False
if res4['paket'] != 'Fullday':
    print("FAIL: Expected Fullday")
    ok = False
if res4['total'] != 'Rp 800.000':
    print("FAIL: Expected Rp 800.000 total price")
    ok = False

# Test 5: Semarang out of town coercion
res5 = test_url(
    "http://localhost:8000/pesan-sopir.html?mobil=Honda+Brio&tujuan=Semarang&paket=12-Jam",
    "Out-of-town coercion (Semarang + 12-Jam)"
)
if res5['paket'] != 'Fullday':
    print("FAIL: Expected package to switch to Fullday for out-of-town Semarang")
    ok = False
if 'display: none' in str(res5['warning_style']):
    print("FAIL: Expected warningLuarKota to be visible")
    ok = False

# Test 6: Brio + 12-Jam + Manual Duration of 3 Days
res6 = test_url(
    "http://localhost:8000/pesan-sopir.html?mobil=Honda+Brio&paket=12-Jam&durasi=3",
    "Manual Duration with 12-Jam (Honda Brio, 3 Days)"
)
if res6['paket'] != '12-Jam':
    print("FAIL: Expected package to be 12-Jam")
    ok = False
if res6['durasi'] != '3':
    print(f"FAIL: Expected duration value to be 3, got {res6['durasi']}")
    ok = False
if res6['total'] != 'Rp 1.350.000':
    print(f"FAIL: Expected total to be Rp 1.350.000 (450.000 * 3), got {res6['total']}")
    ok = False

if ok:
    print("\nALL NEW TESTS PASSED SUCCESSFULLY!")
    sys.exit(0)
else:
    print("\nSOME NEW TESTS FAILED!")
    sys.exit(1)
