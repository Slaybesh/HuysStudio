import logging
import os

class Logging:
  levels = {
      'DEBUG': logging.DEBUG,
      'INFO': logging.INFO,
      'WARN': logging.WARNING,
      'ERROR': logging.ERROR,
      'CRIT': logging.CRITICAL
  }

  def __init__(self, name, level='ERROR', filter_str='', print_=True,create_file=False, time=True):

    self.log_level = self.levels[level]
    self.filter_str = filter_str
    self.print = print_
    self.create_file = create_file

    # formatter_stream = logging.Formatter(f'%(levelname)s: {name}.%(name)s: line %(lineno)d: %(message)s')
    
    formatter_stream = logging.Formatter('%(levelname)s: {}.%(name)s: line %(lineno)d: %(message)s'.format(name))
    formatter_file = logging.Formatter('%(levelname)s: {}.%(name)s: line %(lineno)d: %(message)s'.format(name))
    if time:
      formatter_file = logging.Formatter('%(asctime)s: %(levelname)s: %(name)s: line %(lineno)d: %(message)s', '%d.%m.%y %H:%M:%S')

    self.stream_handler = logging.StreamHandler()
    self.stream_handler.setLevel(self.log_level)
    self.stream_handler.setFormatter(formatter_stream)
    self.stream_handler.addFilter(logging.Filter(self.filter_str))

    self.error_stream_handler = logging.StreamHandler()
    self.error_stream_handler.setLevel(self.levels['ERROR'])
    self.error_stream_handler.setFormatter(formatter_stream)

    if create_file:
      if not os.path.exists('logs'):
        os.makedirs('logs')

      #TODO: empty file before use, add option for that
      with open(f'logs/{name}_error.log', 'w'):
        pass

      self.file_handler = logging.FileHandler(f'logs/{name}_error.log')
      self.file_handler.setLevel(self.log_level)
      self.file_handler.setFormatter(formatter_file)

    self.logger = None
    self.loggers = {}


  def get_logger(self, name):

    if name not in self.loggers:
      
      new_logger = logging.getLogger('{}'.format(name))

      new_logger.propagate = False
      new_logger.setLevel(self.log_level)
      if self.print:
        new_logger.addHandler(self.stream_handler)
      if self.filter_str:
        new_logger.addHandler(self.error_stream_handler)
      if self.create_file:
        new_logger.addHandler(self.file_handler)

      self.loggers[name] = new_logger

    self.logger = self.loggers[name]
    return self.logger


if __name__ == '__main__':
  log = Logging('Test logger', 'DEBUG')
  logger = log.get_logger('new logger')
  logger.debug('test')
  logger.info('test')
  logger.warning('test')
  logger.error('test')
  