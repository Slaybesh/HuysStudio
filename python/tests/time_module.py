import time
import sys

import __init__
from huys_python.templates.decorators import *


wait_time = 0.00001
n = int(1/wait_time)
n = 10000
print(n)
repeat = 10

@timer_loop(n=n, repeat=repeat)
def timer():
    time_ = time.perf_counter()

@timer_loop(n=n, repeat=repeat)
def sleeper():
    time.sleep(wait_time)

@timer_loop(n=n, repeat=repeat)
def perf():
    timer_start = time.perf_counter()
    while time.perf_counter() - timer_start < wait_time:
        pass

# time_taken = timeit.repeat(do_sth, number=100000)
# print(time_taken)

# perf()
timer()