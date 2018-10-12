from collections import OrderedDict


normal = {
    'val1': 1,
    'val2': 2,
    'val3': 3,
    'val4': 4,
}

print(OrderedDict(sorted(normal.items(), key=lambda t: t[0])))

# print(ordered)
print(normal)