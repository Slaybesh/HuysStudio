
def decorator(function):
  print('decorator', function.__name__)
  def decorated(*args, **kwargs):
    print('decorated!!!!!!', function.__name__)
    return function(*args, **kwargs)
  return decorated

class MyClass:
  def __init__(self):
    print('init')
    
  def __getattribute__(self, name):
    print('getattribute:', name)
    method = super().__getattribute__(name)
    return method

  @decorator
  def a(self):
    print('a')
  def b(self):
    print('a')

myclass = MyClass()
myclass.a()


