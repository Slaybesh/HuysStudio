import sys
import __init__
from huys_python.templates.huys_logging import Logging

log = Logging(name='test_log', level='debug', filter_str='', create_file=True, email_subject='test error')
logger = log.get_logger('logger_1')
try:
    2/0
except Exception as e:
    # print(sys.exc_info())
    log.exception(e)

array = []
try:
    print(array[2])
except Exception as e:
    log.exception(e)
print('sth after')
