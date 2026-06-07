import subprocess
import time
import sys

cmd = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "--headless",
    "--disable-gpu",
    "--enable-logging",
    "--v=1",
    "http://localhost:8000/pesan-sopir.html"
]

print("Launching Chrome to monitor console logs...")
process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

try:
    print("Waiting 5 seconds for page load...")
    time.sleep(5)
finally:
    print("Terminating Chrome...")
    process.terminate()
    stdout, stderr = process.communicate()
    
    # Filter logs for errors or exceptions
    print("\n=== Console logs checking ===")
    errors_found = False
    
    # Search in stderr for Javascript logs
    lines = stderr.split('\n')
    for line in lines:
        if 'CONSOLE' in line:
            print(line)
            if 'error' in line.lower() or 'exception' in line.lower() or 'fail' in line.lower() or 'ReferenceError' in line or 'TypeError' in line:
                errors_found = True
        elif 'ReferenceError' in line or 'TypeError' in line:
            print(f"Error line: {line}")
            errors_found = True
            
    if errors_found:
        print("\nCONSOLE ERRORS FOUND!")
        sys.exit(1)
    else:
        print("\nNo console errors found. OK!")
        sys.exit(0)
