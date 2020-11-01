import configparser
import psycopg2
import logging

logging.basicConfig(filename="logs/monitoring.log", filemode='a', level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
log = logging.getLogger("run_monitor_fall")

try:
    config = configparser.ConfigParser()
    config.read("config.ini")  # подключаем конфиг файл

    # переменные для подключения к базе данных заполняются в config.ini
    login_psql = config["connect_database"]["login_psql"]
    password_psql = config["connect_database"]["password_psql"]
    hostname_psql = config["connect_database"]["hostname_psql"]
    database_name = config["connect_database"]["database_name"]
    port_psql = config["connect_database"]["port_psql"]
except Exception as error:
    log.error("Запуск НЕВОЗМОЖЕН! Проверьте файл config.ini : %s", str(error))


def get_list_wires():
    try:
        conn = psycopg2.connect(
            "dbname=" + str(database_name) + " user=" + str(login_psql) + " host=" + str(hostname_psql)
            + " password=" + str(password_psql) + " port=" + str(port_psql))

        cursor = conn.cursor()
        postgreSQL_select_Query = "select wire_id, wire_type_code, name, data, status from fall where is_active='1'"

        cursor.execute(postgreSQL_select_Query)
        data = cursor.fetchall()

        list_all = []
        for row in data:
            list_all.append([row[0], row[1], row[2], row[3], row[4]])

        return list_all

    except Exception as error:
        log.error("Error while fetching data from PostgreSQL: %s", str(error))

    return 0


def insert_events(wire_id, event_type_id):

    try:
        conn = psycopg2.connect(
            "dbname=" + str(database_name) + " user=" + str(login_psql) + " host=" + str(hostname_psql)
            + " password=" + str(password_psql) + " port=" + str(port_psql))
        cursor = conn.cursor()
        cursor.execute("insert into events (wire_id, event_type_id, begin_dt) values (%s, %s, now())",
                       (str(wire_id), str(event_type_id),))
        conn.commit()
        cursor.close()
        conn.close()

    except Exception as error:
        log.error("insert_events: %s", str(error))

    return 0


def update_events(event_id):

    try:
        conn = psycopg2.connect(
            "dbname=" + str(database_name) + " user=" + str(login_psql) + " host=" + str(hostname_psql)
            + " password=" + str(password_psql) + " port=" + str(port_psql))
        cursor = conn.cursor()
        cursor.execute("update events set end_dt=now() where event_id=%s", (str(event_id),))
        conn.commit()
        cursor.close()
        conn.close()

    except Exception as error:
        log.error("update_events: %s", str(error))

    return 0


def is_open_event(wire_id, event_type_id):

    try:
        conn = psycopg2.connect(
            "dbname=" + str(database_name) + " user=" + str(login_psql) + " host=" + str(hostname_psql)
            + " password=" + str(password_psql) + " port=" + str(port_psql))

        cursor = conn.cursor()
        postgreSQL_select_Query = \
            "select end_dt, event_id from events where wire_id = %s and event_type_id = %s ORDER BY event_id DESC LIMIT 1"

        cursor.execute(postgreSQL_select_Query, (str(wire_id), str(event_type_id)), )
        mobile_records = cursor.fetchall()

        for row in mobile_records:
            log.debug("is_open_event sql: %s", str(row))
            end_dt = row[0]
            event_id = row[1]
            if not end_dt and not event_id:
                log.debug("is_open_event: событие не существует ни одного")
                return 0, event_id
            if not end_dt and event_id:
                log.debug("is_open_event: событие открыто")
                return 1, event_id
            else:
                log.debug("is_open_event: событие закрыто")
                return 0, event_id

        log.debug("is_open_event: событие не существует ни одного")
        return 0, 0

    except Exception as error:
        log.error("Error while fetching data from PostgreSQL: %s", str(error))
    return -1, -1


def run_test_wire(wire_id, wire_type_code, name, data, result, event_type_id):

    try:
        log.debug("wire_id: %s", str(wire_id))
        if result != -1:
            if result == 0:
                is_open, event_id = is_open_event(wire_id, event_type_id)
                if not is_open:
                    log.info("открываем событие")
                    insert_events(wire_id, event_type_id)
                else:
                    log.info("событие уже открыто")

            elif result == 1:
                is_open, event_id = is_open_event(wire_id, event_type_id)

                if is_open:
                    log.info("закрываем событие")
                    update_events(event_id)
                else:
                    log.info("открытого события нет")

        else:
            log.error("error return")

    except Exception as error:
        log.error("run_test_wire: %s", str(error))

    return 0


if __name__ == "__main__":
    try:

        log.info('Скрипт запущен!')
        while 1:

            list_all_wires = get_list_wires()
            log.debug(list_all_wires)

            event_type_id = 1

            for wire in list_all_wires:
                wire_id = wire[0]
                wire_type_code = wire[1]
                name = wire[2]
                data = wire[3]
                status = wire[4]

                result = run_test_wire(wire_id, wire_type_code, name, data, status, event_type_id)

    except Exception as error:
        log.error('Скрипт завершен! Error: %s', str(error))
