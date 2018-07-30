import __init__
import logging
import timeit

from python_tests.templates.decorators import *


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

