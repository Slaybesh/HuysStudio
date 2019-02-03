import __init__

from huys_python.templates.logging import configure_loggers, get_logger

configure_loggers('debug')

def basic_decorator(function):
    logger = get_logger('decorator')

    def wrapper(*args, **kwargs):
        # do decorator stuff
        result = function(*args, **kwargs)
        logger.debug(function.__name__)
        # do more decorator stuff
        return result

    return wrapper

@basic_decorator
def some_function():
    logger = get_logger('some_function')
    logger.debug('doing some function')

some_function()

configure_loggers('info')
logger = get_logger('test')
logger.debug('debug')
logger.info('info')
