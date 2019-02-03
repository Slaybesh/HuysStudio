from concurrent import futures

import __init__
from huys_python.templates.huys_logging import Logging

logger_class = Logging('test', level='debug', send_email=True)
logger = logger_class.get_logger('func1')

def logging_fn(msg):
    logger.error(msg)

executer = futures.ProcessPoolExecutor()
def main():
    for i in range(4):
        executer.submit(logging_fn, i)

    print('otherstuff')

if __name__ == '__main__':
    main()