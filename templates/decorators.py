# Decorators
import time
import logging
from functools import wraps


def basic_decorator(function):

    @wraps(function)
    def wrapper(*args, **kwargs):
        # do decorator stuff
        result = function(*args, **kwargs)
        # do more decorator stuff
        return result

    return wrapper

def basic_decorator_with_arguments(*args):

    # do some pre decorator stuff

    def actual_decorator(function):

        @wraps(function)
        def wrapper(*args, **kwargs):
            # do decorator stuff
            result = function(*args, **kwargs)
            # do more decorator stuff
            return result

        return wrapper

    return actual_decorator


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


def timer_loop(n=100, repeat=1):
    def loop(function):

        @wraps(function)
        def wrapper(*args, **kwargs):

            repeat_vals = []
            for _ in range(repeat):
                t1 = time.perf_counter()

                for _ in range(n):
                    result = function(*args, **kwargs)

                t2 = time.perf_counter()
                # print('{} ran in: {} sec'.format(function.__name__, round(t2 - t1, 6)))
                repeat_vals.append(t2 - t1)

            average_time = sum(repeat_vals) / len(repeat_vals)

            print('{} ran on average in: {} sec'.format(function.__name__, round(average_time, 4)))
            return result

        return wrapper

    return loop
