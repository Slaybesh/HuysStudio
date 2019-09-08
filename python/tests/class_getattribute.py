import time
from functools import wraps

def timeit(function):
  @wraps(function)
  def decorated(*args, **kwargs):
    t0 = time.perf_counter()
    result = function(*args, **kwargs)
    t1 = time.perf_counter()
    print(f'{function.__name__} ran in: {round(t1 - t0, 4)} sec')
    return result
  return decorated

    
def time_all_class_methods(Cls):
  # short version
  class NewCls(Cls):
    def __getattribute__(self, name):
      try:
        method = super().__getattribute__(name)
        print('method', method.__name__)
        return timeit(method)
      except AttributeError:
        print('error')

  return NewCls

def time_all_class_methods2(Cls):
  # short version
  class NewCls:
    def __init__(self, *args, **kwargs):
      self.original_instance = Cls(*args, **kwargs)
    def __getattribute__(self, name):
      try:
        method = super().__getattribute__(name)
      except AttributeError:
        pass
      else:
        return method

      method = self.original_instance.__getattribute__(name)

      return timeit(method)

  return NewCls


@time_all_class_methods2
class Foo(object):
  def __init__(self):
    self.test = 0
  def a(self):
    time.sleep(1)
    print('asd')

  def b(self):
    time.sleep(2)


oF = Foo()
oF.a()
oF.b()
# oF.c()
# oF.test = 2
