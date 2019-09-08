from functools import wraps

""" 
2 ways of decorating
put @decorator above a function
or 
decorated_fn = decorator(my_fn())
decorated_fn() 
"""

def decorator(function):
  logger = f'logger.{function.__name__}'
  @wraps(function)
  def decorated(*args, **kwargs):
    result = function(logger, *args, **kwargs)
    logger
    return result
  return decorated

@decorator
def my_fn(logger):
  print('my_fn executing')
  print(logger)


my_fn()