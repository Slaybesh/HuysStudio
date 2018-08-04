import logging

levels = {
    'debug': logging.DEBUG,
    'info': logging.INFO,
    'warning': logging.WARNING,
    'error': logging.ERROR,
    'critical': logging.CRITICAL}


def configure_loggers(level='debug', filter_str='', file_handler_str=''):

    global log_level
    log_level = levels[level]

    global log_filter
    log_filter = filter_str

    formatter = logging.Formatter('%(levelname)s: %(name)s: line %(lineno)d: %(message)s')
    formatter_date = logging.Formatter('%(asctime)s: %(levelname)s: %(name)s: line %(lineno)d: %(message)s', '%d.%m.%y %H:%M:%S')

    global stream_handler
    stream_handler = logging.StreamHandler()
    stream_handler.setLevel(log_level)
    stream_handler.setFormatter(formatter)
    stream_handler.addFilter(logging.Filter(log_filter))

    global error_stream_handler
    error_stream_handler = logging.StreamHandler()
    error_stream_handler.setLevel(levels['error'])
    error_stream_handler.setFormatter(formatter)

    global file_handler_name
    file_handler_name = file_handler_str
    global file_handler
    if file_handler_name:
        file_handler = logging.FileHandler('{}_error.log'.format(file_handler_name))
        file_handler.setLevel(levels['error'])
        file_handler.setFormatter(formatter_date)


loggers = {}
def get_logger(name):

    if name not in loggers:
        
        new_logger = logging.getLogger(name)

        new_logger.propagate = False
        new_logger.setLevel(log_level)
        new_logger.addHandler(stream_handler)
        if log_filter:
            new_logger.addHandler(error_stream_handler)
        if file_handler_name:
            new_logger.addHandler(file_handler)

        loggers[name] = new_logger

    return loggers[name]
