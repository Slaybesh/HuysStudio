import __init__
from huys_python.templates.huys_logging import Logging

test_log = Logging('test_logger', level='debug', send_email=True)
logger = test_log.get_logger('test_log')
test_log.error('heres one')
try:
    2/0
except Exception as e:
    test_log.exception(e)
