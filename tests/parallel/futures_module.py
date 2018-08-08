from concurrent import futures
import time

def callback_func(future):
    result = future.result()
    print(result)

def test_func():
    print('working for 1 sec')
    time.sleep(1)
    return 'finished working'

# executer = futures.ThreadPoolExecutor()
executer = futures.ProcessPoolExecutor()

if __name__ == '__main__':
    # result = executer.submit(test_func).add_done_callback(callback_func)
    result = executer.submit(test_func).result()
    print(result)
    # callback_func(result)
    print('something after')