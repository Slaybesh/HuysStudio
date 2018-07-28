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


def timer(function):

    @wraps(function)
    def wrapper(*args, **kwargs):
        t1 = time.perf_counter()
        result = function(*args, **kwargs)
        t2 = time.perf_counter()
        print('{} ran in: {} sec'.format(function.__name__, round(t2 - t1, 4)))
        return result

    return wrapper


def test_decorator(function, param):
    print(param)

    def wrapper():
        return function()

    return wrapper

@test_decorator
def test_func():
    print('test func')

test_func()