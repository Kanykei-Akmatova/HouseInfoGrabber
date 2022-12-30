import psycopg2

from .config import config

def insert_price(house_code, amount, price_date):
    """ insert a new vendor into the vendors table """
    sql = "INSERT INTO price(house_code, amount, price_date) VALUES(%s, %s, %s)"
    conn = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cursor = conn.cursor()
        # execute the INSERT statement
        cursor.execute(sql, (house_code, amount, price_date))
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cursor.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    return house_code

def insert_relisted_house(house_code, amount, relist_date):
    """ insert a new vendor into the vendors table """
    sql = "INSERT INTO relisted_house(house_code, amount, relist_date) VALUES(%s, %s, %s)"
    conn = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cursor = conn.cursor()
        # execute the INSERT statement
        cursor.execute(sql, (house_code, amount, relist_date))
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cursor.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    return house_code
