import logging
import os

levels = {
    'debug': logging.DEBUG,
    'info': logging.INFO,
    'warning': logging.WARNING,
    'error': logging.ERROR,
    'critical': logging.CRITICAL}


class Logging:
    def __init__(self, name, level='error', filter_str='', create_file=False):

        self.log_level = levels[level]
        self.filter_str = filter_str
        self.create_file = create_file

        formatter_stream = logging.Formatter('%(levelname)s: {}.%(name)s: line %(lineno)d: %(message)s'.format(name))
        formatter_file = logging.Formatter('%(asctime)s: %(levelname)s: %(name)s: line %(lineno)d: %(message)s', '%d.%m.%y %H:%M:%S')

        self.stream_handler = logging.StreamHandler()
        self.stream_handler.setLevel(self.log_level)
        self.stream_handler.setFormatter(formatter_stream)
        self.stream_handler.addFilter(logging.Filter(self.filter_str))

        self.error_stream_handler = logging.StreamHandler()
        self.error_stream_handler.setLevel(levels['error'])
        self.error_stream_handler.setFormatter(formatter_stream)


        if create_file:

            if not os.path.exists('logs'):
                os.makedirs('logs')

            self.file_handler = logging.FileHandler('logs/{}_error.log'.format(name))
            self.file_handler.setLevel(levels['error'])
            self.file_handler.setFormatter(formatter_file)

        self.loggers = {}

    def get_logger(self, name):

        if name not in self.loggers:
            
            new_logger = logging.getLogger('{}'.format(name))

            new_logger.propagate = False
            new_logger.setLevel(self.log_level)
            new_logger.addHandler(self.stream_handler)
            if self.filter_str:
                new_logger.addHandler(self.error_stream_handler)
            if self.create_file:
                new_logger.addHandler(self.file_handler)

            self.loggers[name] = new_logger

        return self.loggers[name]
