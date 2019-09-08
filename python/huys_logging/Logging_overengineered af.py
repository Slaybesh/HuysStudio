import logging
import os
from functools import wraps


class Logging:
  levels = {
      'DEBUG': logging.DEBUG,
      'INFO': logging.INFO,
      'WARNING': logging.WARNING,
      'ERROR': logging.ERROR,
      'CRIT': logging.CRITICAL
  }

  def __init__(self, name='', level='ERROR', console=True, file=False):
    self.master_name = name
    self.master_level = self.levels[level]
    # self.filter_str = filter_str
    self.console = console
    self.create_file = file

    self.handler_config()

    self.loggers = {}


  def get_logger(self, name, level=None):

    if name not in self.loggers:
      if level is None:
        level = self.master_level
      else:
        level = self.levels[level]
      self.create_logger(name, level)

    logger = self.loggers[name]
    return logger


  def create_logger(self, name, level: int):

    new_logger = logging.getLogger(name)

    new_logger.propagate = False
    new_logger.setLevel(level)
    if self.console:
      new_logger.addHandler(self.stream_handler)
    # if self.filter_str:
    #   new_logger.addHandler(self.error_stream_handler)
    if self.create_file:
      new_logger.addHandler(self.file_handler)

    self.loggers[name] = new_logger


  def set_level(self, name, level):
    logger = self.loggers[name]
    logger.setLevel(self.levels[level])
    self.loggers[name] = logger


  #region decorators
  def set_logger(self, level: str):

    def decorator(function):

      @wraps(function)
      def decorated(logger, *args, **kwargs):
        print(self.loggers)
        # self.set_level(function.__name__, level)
        
        print('name', logger.name)
        print('level', logger.level)
        result = function(logger, *args, **kwargs)
        return result
      return decorated
    return decorator


  # def decorator(self, function):
  #   print('decorator', function.__name__)

  #   def decorated(*args, **kwargs):
  #     logger = args[1]
  #     logger.debug(logger.name)
  #     print('decorated!!!!!!', function.__name__)
  #     return function(*args, **kwargs)
  #   return decorated

  @classmethod
  def class_decorator(LoggingClass, *logging_args):

    def decorator(Cls):
      print('this should run only once')
      logging = LoggingClass(Cls.__name__, *logging_args)

      class DecoratedClass(Cls):
        
        def __getattribute__(self, name):
          try:
            method = super().__getattribute__(name)
          except AttributeError:
            pass
          else:


            print('this should run whenever a method is called')
            logger = logging.get_logger(name)
            # this function gets wrapped around decorators
            def method_with_logger(*args, **kwargs):
              
              print('getattr')
              print('Logger', logging.loggers)
              method(logger, *args, **kwargs)
              print('after')

            return method_with_logger

      return DecoratedClass
    return decorator
    
  #endregion

  #region initializer
  def handler_config(self):
    formatter_stream, formatter_file = self.get_formatters()

    self.stream_handler = logging.StreamHandler()
    self.stream_handler.setLevel(self.master_level)
    self.stream_handler.setFormatter(formatter_stream)
    # self.stream_handler.addFilter(logging.Filter(self.filter_str))

    self.error_stream_handler = logging.StreamHandler()
    self.error_stream_handler.setLevel(self.levels['ERROR'])
    self.error_stream_handler.setFormatter(formatter_stream)

    if self.create_file:
      if not os.path.exists('logs'):
        # create logs folder
        os.makedirs('logs')

      #TODO: empty file before use, add option for that
      with open(f'logs/{self.master_name}_error.log', 'w'):
        pass

      self.file_handler = logging.FileHandler(f'logs/{self.master_name}_error.log')
      self.file_handler.setLevel(self.master_level)
      self.file_handler.setFormatter(formatter_file)


  def get_formatters(self):
    stream = logging.Formatter('%(levelname)s: {}.%(name)s: line %(lineno)d: %(message)s'.format(self.master_name))
    file_ = logging.Formatter('%(levelname)s: %(asctime)s: %(name)s: line %(lineno)d: %(message)s', '%d.%m.%y %H:%M:%S')
    return stream, file_
  #endregion


if __name__ == '__main__':

  MyLogging = Logging('TestClass2', 'DEBUG', True, False)
  @MyLogging.class_decorator('DEBUG')
  class TestClass:
    def __init__(self):
      pass

    @MyLogging.set_logger('INFO')
    def main_method(self, logger, param):
      
      # logger = Logger.get_logger('a')
      logger.debug(logger.name)
      # logger.debug(My_logging)
      
      logger.info('info')
      print(logger.level)
      logger.debug('debug2')
      logger.info('info2')

    def b(self, logger):
      logger.debug('asdf')


  test = TestClass()
  test.main_method('asw45gh908d')
  # test.a('dtgyhndtyn')
  # test.b()
  # test.a('1234')
