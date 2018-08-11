from concurrent import futures
from functools import wraps

import __init__
from huys_python.templates.decorators import *


def callback_func(result):
    print(result)

executer = futures.ProcessPoolExecutor()
print(executer._max_workers)

def parallel(fn):

    @wraps(fn)
    def wrapper(*args, **kwargs):
        executer.submit(fn, *args, **kwargs)

    return wrapper

import time

# @timer
# @parallel
def test_func():
    print('working for 1 sec')
    time.sleep(1)
    callback_func('finished working')

# def main():
for _ in range(8):
    executer.submit(test_func)

# if __name__ == '__main__':
#     main()
