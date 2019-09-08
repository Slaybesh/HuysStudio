import logging
import os


class Logging:
  levels = {
      'DEBUG': logging.DEBUG,
      'INFO': logging.INFO,
      'WARNING': logging.WARNING,
      'ERROR': logging.ERROR,
      'CRIT': logging.CRITICAL
  }

  def __init__(self, name, level='ERROR', console=True, file=False):
    self.master_name = name
    self.master_level = self.levels[level]
    # self.filter_str = filter_str
    self.console = console
    self.create_file = file

    self.handler_config()

    self.loggers = {}


  def get_logger(self, name, level=None):

    if name not in self.loggers:
      level = self.levels[level] if level else self.master_level
      self.create_logger(name, level)

    logger = self.loggers[name]
    return logger


  def create_logger(self, name, level: int):

    new_logger = logging.getLogger(name)

    new_logger.propagate = False
    new_logger.setLevel(level)
    if self.console:
      new_logger.addHandler(self.stream_handler)
    if self.create_file:
      new_logger.addHandler(self.file_handler)

    self.loggers[name] = new_logger



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

  log = Logging('TestClass2', 'DEBUG', True, False)

  class TestClass:
    def __init__(self):
      pass

    def main_method(self, param):
      
      logger = log.get_logger('a', 'INFO')
      logger.warning('asdf')
      logger.debug(param)
      
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
