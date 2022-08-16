import sys
sys.path.append("..")
import psycopg2

from db.config import config
from core.house import House

def insert_house_list(house_list):
    """ insert multiple vendors into the vendors table  """
    sql = "INSERT INTO house(house_code, address, open_date, close_date, bedrooms, bathrooms) VALUES(%s, %s, %s, %s, %s, %s)"
    conn = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.executemany(sql,house_list)
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

def insert_house(region_code, house_code, open_date, close_date, house):
    """ insert a new vendor into the vendors table """
    sql = "INSERT INTO house(region_code, house_code, address, open_date, close_date, bedrooms, bathrooms) VALUES(%s, %s, %s, %s, %s, %s, %s)"
    conn = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cursor = conn.cursor()
        # execute the INSERT statement
        record_to_insert = (region_code, house_code, house.address, open_date, close_date, house.bedrooms, house.bathrooms)
        cursor.execute(sql, record_to_insert)
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

def get_houses():
    """ query data from the vendors table """
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cursor = conn.cursor()
        cursor.execute("SELECT region_code, house_code, address, open_date, close_date, bedrooms, bathrooms FROM house")        
        
        house_list = []
        record = cursor.fetchone()
                
        while record is not None:
            house_list.append(House(record[0], record[1], record[2], "-1", record[5], record[6]))
            # house_list.append(record[0], record[1], record[2], record[3], record[4], record[5])
            
            record = cursor.fetchone()

        cursor.close()

        return house_list
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

def get_houses_by_region_code(region_code):
    """ query data from the vendors table """
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cursor = conn.cursor()
        cursor.execute("""SELECThouse_code, address, open_date, close_date, bedrooms, bathrooms 
                       FROM house
                       WHERE region_Code = %s""", (region_code,))
        
        house_list = []
        record = cursor.fetchone()
                
        while record is not None:
            house_list.append(record[0], record[1], record[2], record[3], record[4], record[5])
            record = cursor.fetchone()

        cursor.close()

        return house_list
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

def update_house_close_date(house_code, close_date):
    sql = "UPDATE house SET close_date = %s WHERE house_code = %s"
    conn = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cursor = conn.cursor()
        # execute the UPDATE statement
        cursor.execute(sql, (close_date, house_code))
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cursor.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()