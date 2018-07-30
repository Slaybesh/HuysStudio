# Decorators
import time
import logging
from functools import wraps

def logger(function):

    logging.basicConfig(filename='{}.log'.format(function.__name__), level=logging.INFO)

    @wraps(function)
    def wrapper(*args, **kwargs):
        logging.info(
            'Ran with args: {}, and kwargs: {}'.format(args, kwargs))
        return function(*args, **kwargs)

    return wrapper


def timer_loop(n=1):
    def loop(function):

        @wraps(function)
        def wrapper(*args, **kwargs):
            t1 = time.perf_counter()
            for _ in range(n):
                result = function(*args, **kwargs)
            t2 = time.perf_counter()
            print('{} ran in: {} sec'.format(function.__name__, round(t2 - t1, 4)))
            return result

        return wrapper

    return loop


def timer(function):

    @wraps(function)
    def wrapper(*args, **kwargs):
        t1 = time.perf_counter()
        result = function(*args, **kwargs)
        t2 = time.perf_counter()
        print('{} ran in: {} sec'.format(function.__name__, round(t2 - t1, 4)))
        return result

    return wrapper



def decorator_with_arguments(param):

    print(param)
    def actual_decorator(function):

        @wraps(function)
        def wrapper():
            return function()

        return wrapper

    return actual_decorator

@timer_loop(20)
def test_func():
    print('test func')

test_func()