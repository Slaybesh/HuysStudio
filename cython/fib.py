import __init__
from huys_python.templates.decorators import *

def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

@timer_loop(3)
def main():
    for n in range(30):
        fib = fibonacci(n)
        print('{}: {}'.format(n, fib))

main()