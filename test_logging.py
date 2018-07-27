import logging
import time


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

def do_sth():
    logger = logger_do_sth
    logger.debug('doing something')


start_time = time.perf_counter()
for _ in range(1000000):
    do_sth()

end_time = time.perf_counter()
print('time taken:', round(end_time - start_time, 20))