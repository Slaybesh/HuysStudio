import time

import __init__
from python_tests.templates import decorators

@decorators.timer
def printer():
    print()

printer()