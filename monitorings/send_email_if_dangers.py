import configparser
import logging
import sys
import psycopg2
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

logging.basicConfig(filename="logs/monitoring.log", filemode='a', level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
log = logging.getLogger("send_email_if_dangers")

try:
    config = configparser.ConfigParser()
    config.read("config.ini")  # подключаем конфиг файл

    # переменные для подключения к базе данных заполняются в config.ini
    email_from = config["settings_email"]["from"]
    email_password = config["settings_email"]["password"]
    email_to = config["settings_email"]["to"]
except Exception as error:
    log.error("Запуск НЕВОЗМОЖЕН! Проверьте файл config.ini : %s", str(error))


def if_dangers_db_postgresql(login_psql, password_psql, hostname_psql, database_name, port_psql=5432):

    try:

        conn = psycopg2.connect(
            "dbname=" + str(database_name) + " user=" + str(login_psql) + " host=" + str(hostname_psql)
            + " password=" + str(password_psql) + " port=" + str(port_psql) + " connect_timeout=5 ")
        conn.close()
        return 1

    except Exception as error:
        send_text_to_email("Monitoring", "Dangers")
        return 0


def send_text_to_email(title, message):

    # create message object instance
    msg = MIMEMultipart()

    # setup the parameters of the message
    password = str(email_password)
    msg['From'] = str(email_from)
    msg['To'] = str(email_to)
    msg['Subject'] = title

    # add in the message body
    msg.attach(MIMEText(message, 'plain'))

    # create server
    server = smtplib.SMTP('smtp.gmail.com: 587')
    server.starttls()

    # Login Credentials for sending the mail
    server.login(msg['From'], password)

    # send the message via the server.
    server.sendmail(msg['From'], msg['To'], msg.as_string())
    server.quit()

    log.info("successfully sent email to %s", str(msg['To']))


if __name__ == "__main__":

    try:
        log.info('Скрипт запущен!')

        counter_argv = len(sys.argv)
        if counter_argv == 5 or counter_argv == 6:
            login_psql = sys.argv[1]
            password_psql = sys.argv[2]
            hostname_psql = sys.argv[3]
            database_name = sys.argv[4]
            if counter_argv == 6:
                port_psql = sys.argv[5]
            else:
                port_psql = 5432  # порт поумолчанию postgresql

            result = if_dangers_db_postgresql(login_psql, password_psql, hostname_psql, database_name, port_psql)

        else:
            log.warning("Неверное количество аргументов! В ожидании 4 или 5 аргументов...")

        log.info('Скрипт завершен!')

    except Exception as error:
        log.error('Скрипт завершен! Error: %s', str(error))
