import logging

levels = {
    'debug': logging.DEBUG,
    'info': logging.INFO,
    'warning': logging.WARNING,
    'error': logging.ERROR,
    'critical': logging.CRITICAL}


def configure_loggers(level='debug', filter_logger='', file_handler_name='default'):

    global log_level
    global log_filter

    global stream_handler
    global error_stream_handler
    global file_handler

    log_level = levels[level]
    log_filter = filter_logger

    formatter = logging.Formatter('%(levelname)s: %(name)s: line %(lineno)d: %(message)s')
    formatter_date = logging.Formatter('%(asctime)s: %(levelname)s: %(name)s: line %(lineno)d: %(message)s', '%d.%m.%y %H:%M:%S')

    stream_handler = logging.StreamHandler()
    stream_handler.setLevel(log_level)
    stream_handler.setFormatter(formatter)
    stream_handler.addFilter(logging.Filter(log_filter))

    error_stream_handler = logging.StreamHandler()
    error_stream_handler.setLevel(levels['error'])
    error_stream_handler.setFormatter(formatter)

    file_handler = logging.FileHandler('{}_error.log'.format(file_handler_name))
    file_handler.setLevel(levels['error'])
    file_handler.setFormatter(formatter_date)


loggers = {}
def get_logger(name):

    if name not in loggers:
        
        new_logger = logging.getLogger(name)

        new_logger.propagate = False
        new_logger.setLevel(log_level)
        new_logger.addHandler(file_handler)
        new_logger.addHandler(stream_handler)
        if log_filter:
            new_logger.addHandler(error_stream_handler)

        loggers[name] = new_logger

    return loggers[name]
