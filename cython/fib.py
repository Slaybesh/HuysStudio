from functools import lru_cache
import __init__
from huys_python.templates.decorators import *

@lru_cache(100000)
def fib_py(n):
    if n < 2:
        return n
    return fib_py(n-1) + fib_py(n-2)


def main():
    for n in range(100000):
        fib_py(n)
        # print('{}: {}'.format(n, fib))

main()