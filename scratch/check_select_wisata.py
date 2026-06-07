with open('/Users/a123/Downloads/aksaratransport/js/main.js', 'r') as f:
    for i, line in enumerate(f, 1):
        if 'selectwisata' in line.lower():
            print(f"{i}: {line.strip()}")
