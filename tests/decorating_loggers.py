import time
import logging
from functools import wraps


#region logging
logging_filter = logging.Filter('')

formatting = logging.Formatter('%(levelname)s: %(name)s: %(message)s')

file_handler = logging.FileHandler('logger.log')
file_handler.setLevel(logging.WARNING)
file_handler.setFormatter(formatting)

stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatting)
stream_handler.addFilter(logging_filter)

def create_logger(name, level='debug'):
    levels = {
        'debug': logging.DEBUG,
        'info': logging.INFO,
        'warning': logging.WARNING,
        'error': logging.ERROR,
        'critical': logging.CRITICAL}

    logger = logging.getLogger(name)

    logger.propagate = False
    logger.addHandler(stream_handler)
    logger.addHandler(file_handler)
    logger.setLevel(levels[level])
    logger.addFilter(logging_filter)

    return logger

logger_do_sth = create_logger('do_sth')
#endregion logging


def decorator_with_arguments(param):

    print(param)
    def actual_decorator(function):

        @wraps(function)
        def wrapper():
            return function()

        return wrapper

    return actual_decorator


def logger(function):

    logging.basicConfig(filename='{}.log'.format(function.__name__), level=logging.INFO)

    @wraps(function)
    def wrapper(*args, **kwargs):
        logging.info('Ran with args: {}, and kwargs: {}'.format(args, kwargs))
        return function(*args, **kwargs)

    return wrapper


@logger
def display_info(name, age):
    time.sleep(1)
    print('display_info ran with arguments ({}, {})'.format(name, age))

display_info('Tom', 22)