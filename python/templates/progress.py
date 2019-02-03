import time
import random
import sys

def create_arr(n):
    return [i for i in range(n)]

n = 10000
wait_time = 200 / n
sigma = wait_time / 100
print('wait_time =', wait_time)

arr = create_arr(n)
len_arr = len(arr)


updater_i = 1
updating_time = 2
start_time = time.perf_counter()

for i, num in enumerate(arr):
    i += 1

    wait_time = random.gauss(wait_time, sigma)
    if wait_time < 0:
        print(0)
        wait_time = 0
    # time.sleep(wait_time)

    timer_start = time.perf_counter()
    while time.perf_counter() - timer_start < wait_time:
        pass

    
    if i % updater_i == 0:

        progress = i / len_arr
        time_taken = time.perf_counter() - start_time
        estimated_time = time_taken / progress
        updater_i = int(updating_time / (time_taken / i)) + 1

        time_left = estimated_time - time_taken

        eta = time.strftime('%H:%M:%S', time.localtime(time.time() + time_left))
        print_str = 'Progress: {}%, ETA: {}, Time left: {} seconds     '.format(round(progress * 100, 2), eta, round(time_left))
        print(print_str)

        # sys.stdout.write(print_str)
        # sys.stdout.flush()
        # sys.stdout.write('\b' * len(print_str))