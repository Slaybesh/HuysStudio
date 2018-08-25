import sys
import logging
import logging.handlers
import os
from concurrent import futures

levels = {
    'debug': logging.DEBUG,
    'info': logging.INFO,
    'warning': logging.WARNING,
    'error': logging.ERROR,
    'critical': logging.CRITICAL}


class TlsSMTPHandler(logging.handlers.SMTPHandler):
    def emit(self, record):

        try:
            import smtplib
            from email.message import EmailMessage
            import email.utils

            port = self.mailport
            if not port:
                port = smtplib.SMTP_PORT
            smtp = smtplib.SMTP(self.mailhost, port, timeout=self.timeout)
            msg = EmailMessage()
            msg['From'] = self.fromaddr
            msg['To'] = ','.join(self.toaddrs)
            msg['Subject'] = self.getSubject(record)
            msg['Date'] = email.utils.localtime()
            msg.set_content(self.format(record))
            if self.username:
                smtp.ehlo()
                smtp.starttls()
                smtp.ehlo()
                smtp.login(self.username, self.password)
            smtp.send_message(msg)
            smtp.quit()
        except Exception:
            self.handleError(record)

    def getSubject(self, record):

        subject = self.format(record).split('\n', 1)[0]

        return subject



class Logging:
    def __init__(self, name, level='error', filter_str='', create_file=False, send_email=False):

        self.executer = futures.ThreadPoolExecutor(max_workers=2)

        self.log_level = levels[level]
        self.filter_str = filter_str
        self.create_file = create_file
        self.send_email = send_email

        formatter_stream = logging.Formatter('%(levelname)s: {}.%(name)s: line %(lineno)d: %(message)s'.format(name))
        formatter_file = logging.Formatter('%(asctime)s: %(levelname)s: %(name)s: line %(lineno)d: %(message)s', '%d.%m.%y %H:%M:%S')
        formatter_email = logging.Formatter('{}.%(name)s: line %(lineno)d: %(message)s'.format(name))

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

        if send_email:
            self.smtp_handler = TlsSMTPHandler(mailhost=('smtp.gmail.com', 587),
                                               fromaddr='', 
                                               toaddrs='huy_hoang@neuralaim.com',
                                               subject='',
                                               credentials=('neuralaim.error@gmail.com', 'Slaysilbesh11'))
            self.smtp_handler.setLevel(levels['error'])
            self.smtp_handler.setFormatter(formatter_stream)

        self.logger = None
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
            if self.send_email:
                new_logger.addHandler(self.smtp_handler)

            self.loggers[name] = new_logger

        self.logger = self.loggers[name]
        return self.logger

    def debug(self, msg):
        self.executer.submit(self.logger.debug, msg)

    def info(self, msg):
        self.executer.submit(self.logger.info, msg)

    def warning(self, msg):
        self.executer.submit(self.logger.warning, msg)

    def error(self, msg):
        self.executer.submit(self.logger.error, msg)

    def exception(self, msg):
        self.executer.submit(self.logger.exception, msg, exc_info=sys.exc_info())

    def critical(self, msg):
        self.executer.submit(self.logger.critical, msg)
