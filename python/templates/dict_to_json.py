import json

data = {
    'var1': 1,
    'var2': 2,
    'binary': b'somebinarystuff'.decode('utf-8')
}

binary = 'binarystuff'.decode('utf-8')
print(binary)

with open('data.json', 'w') as f:
    json.dump(data, f, indent=True, sort_keys=True)

with open('data.json', 'r') as f:
    data = json.load(f)

    for k, v in data.items():
        print(k, v)
    