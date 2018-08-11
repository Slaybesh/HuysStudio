from concurrent import futures
import time

def callback_func(future):
    result = future.result()
    print(result)

def test_func():
    print('working for 1 sec')
    time.sleep(1)
    return 'finished working'


class TestClass:
    def __init__(self):
        # self.executer = futures.ProcessPoolExecutor()
        pass

    def do(self):
        future = executer.submit(self.heavy_fn)
        print(future.result())

    def heavy_fn(self):
        print('working for 1 sec')
        time.sleep(1)
        return 'finished'


if __name__ == '__main__':
    executer = futures.ProcessPoolExecutor()

    testclass = TestClass().do()

    print('something after')
