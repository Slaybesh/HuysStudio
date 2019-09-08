import logging

class CreateLogger:
  levels = {
      'DEBUG': logging.DEBUG,
      'INFO': logging.INFO,
      'WARNING': logging.WARNING,
      'ERROR': logging.ERROR,
      'CRIT': logging.CRITICAL
  }

  def __init__(self, name: str, level: str, console: bool, file: bool):

    self.logger = logging.getLogger(name)
    self.name = name
    self.level = self.levels[level]

    self.logger.setLevel(self.level)

    self.logger.propagate = False

    self.handler_config()

    if console:
      self.logger.addHandler(self.stream_handler)
    if file:
      self.logger.addHandler(self.file_handler)

    # return self.logger

  def get_logger(self):
    return self.logger

  def handler_config(self):
    formatter_stream, formatter_file = self.get_formatters()

    self.stream_handler = logging.StreamHandler()
    # self.stream_handler.setLevel(self.level)
    self.stream_handler.setFormatter(formatter_stream)

    self.error_stream_handler = logging.StreamHandler()
    self.error_stream_handler.setLevel(self.levels['ERROR'])
    self.error_stream_handler.setFormatter(formatter_stream)

  def get_formatters(self):
    stream = logging.Formatter(
        '%(levelname)s: {}.%(name)s: line %(lineno)d: %(message)s'.format(self.name))
    file_ = logging.Formatter(
        '%(levelname)s: %(asctime)s: %(name)s: line %(lineno)d: %(message)s', '%d.%m.%y %H:%M:%S')
    return stream, file_


  # @property
  # def level(self):
  #   return self.level


  def set_level(self, level):
    if isinstance(level, str):
      level = self.levels[level]
    self.logger.setLevel(level)
    return self.logger
