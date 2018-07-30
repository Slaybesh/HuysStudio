import __init__
import time
from python_tests.templates.decorators import *


wait_time = 0.001
n = int(1/wait_time)
n = 1000
print(n)
repeat = 1

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

perf()
# sleeper()