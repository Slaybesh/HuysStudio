import requests

r = requests.get('https://www.google.com/recaptcha/api/siteverify')
r = requests.post('https://www.google.com/recaptcha/api/siteverify', data = {
    'secret': '6LdoEWoUAAAAAPycupiHUL1QBa6wSDquTW5fkdPg',
    'response': '03AHqfIOlFDK892Jz4twe2YKA89uW8_TmREjmtc_PCyQRi87NXIwLlQ9qIwsZZTO6zPHlUaIDLBHbZRW9hIX56bA_h_Sqi4dtcduWgRk9OSK-wsklwa_Fu8wLysqcgX6hJfW85zC5gjringW_QCyRDMpZcMdZfoU1W8x6HRyAgZPWryDHoheSOBI9p1ChnZnAHBQ6QcaRa7HlKQAm4txUAKPalzR1LwV_5tXFc0jekVuudoGfOwnzQw9On0IYFGDJe4htPdBtvOZKnfyiXUyK0YRiC3EqOw7sAZdCG-MkILXYe_ssu-DOhmI4'
    })

print(r.text)