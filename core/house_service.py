import sys
import datetime
import hashlib
import logging

sys.path.append("..")

from db.house_data_access import get_houses_by_region_code, insert_house, update_house_close_date
from db.price_data_access import insert_price

def process_house_list(region_code, listed_house_list):  
    index = 0

    db_house_dictionary = dict()
    listed_house_list_dic = dict()

    for listed_house in listed_house_list:
        listed_house_list_dic[listed_house.house_code] = listed_house

    selected_house_list = get_houses_by_region_code(region_code)
    
    if(selected_house_list):
        logging.info(f"{len(selected_house_list)} houses in data base for the {region_code} region")        
        for selected_house in selected_house_list:
            db_house_dictionary[selected_house.house_code] = selected_house

    for listed_house_code in listed_house_list_dic:
        index +=1
        house = listed_house_list_dic[listed_house_code]        
        house_code = hashlib.sha256(house.address.encode('utf-8')).hexdigest()
        house_price = int(house.price.replace('$', '').replace(",",""))
        open_date =  datetime.date.today() 
        price_date =  datetime.date.today()
        close_date = datetime.datetime(1900, 1, 1)

        logging.info(f"Starting procesing {index}.{house.address} : {house.price}$ [bedrooms : {house.bedrooms} bathrooms : {house.bathrooms}] house-code:{house_code}")
        
        # the listed house is our db
        if db_house_dictionary and house_code in db_house_dictionary: 
            logging.info(f"Existing house : {house_code} with price {db_house_dictionary[house_code].price} and the new price {house_price} processing...")                
            if int(db_house_dictionary[house_code].price) != int(house_price):
                insert_price(house_code, house_price, price_date)
        else:
            # the listed house is not in our db
            logging.info(f"New house : {house_code} processing...")
            insert_house(region_code, house_code, open_date, close_date, house)
            insert_price(house_code, house_price, price_date)            

        logging.info(f"Processed house : {house_code}")        
    
    logging.info(f"Done {index} houses.")

    # process not listed anymore houses
    # for db_house_code in db_house_dictionary:
    #     if db_house_dictionary[db_house_code].region_code == region_code and db_house_code not in listed_house_list_dic:
    #         logging.info(f"Update of not listed anymore house {db_house_code}...")
    #         update_house_close_date(db_house_code, datetime.date.today())
