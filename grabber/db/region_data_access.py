import psycopg2

from .config import config

def insert_region_house_count(region_code, record_date, house_count):
    """ insert a new vendor into the vendors table """
    sql = "INSERT INTO region_house_inventory(region_code, record_date, house_count) VALUES(%s, %s, %s)"
    conn = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cursor = conn.cursor()
        # execute the INSERT statement
        cursor.execute(sql, (region_code, record_date, house_count))
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cursor.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    return region_code