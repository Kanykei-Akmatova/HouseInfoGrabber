from math import floor
import sys
import datetime
import hashlib
import logging

sys.path.append("..")

from db.house_data_access import get_houses_by_region_code, insert_house, update_house_not_in_listing_date
from db.price_data_access import insert_price, insert_relisted_house
from db.region_data_access import insert_region_house_count

def process_house_list(region_code, listed_house_list):  
    index = 0

    db_house_dictionary = dict()
    listed_house_list_dic = dict()

    for listed_house in listed_house_list:
        listed_house_list_dic[listed_house.house_code] = listed_house

    # getting houses from the db
    selected_house_list = get_houses_by_region_code(region_code)
    
    if(selected_house_list):
        logging.info(f"{len(selected_house_list)} houses in data base for the {region_code} region have been found.")        
        for selected_house in selected_house_list:
            db_house_dictionary[selected_house.house_code] = selected_house

    record_date =  datetime.date.today() 
    price_date =  datetime.date.today()
    lot_count = 0

    # process houses of in the listing
    for listed_house_code in listed_house_list_dic:
        index +=1
        house = listed_house_list_dic[listed_house_code]        
        house_code = hashlib.sha256(house.address.encode('utf-8')).hexdigest()
        house_price = int(house.price.replace('$', '').replace(",",""))
       
        logging.info(f"Starting processing {index}. {house.address} : {house.price}$ [bedrooms : {house.bedrooms} bathrooms : {house.bathrooms}] house-code:{house_code}")
        
        if len(house.bedrooms.replace(" ", "")) != 0:            
            # the listed house is in our db
            if db_house_dictionary and house_code in db_house_dictionary: 
                if int(floor(db_house_dictionary[house_code].price)) != int(floor(house_price)):
                    logging.info(f"*Existing house : {house_code} with the price {floor(db_house_dictionary[house_code].price)} and the new price {floor(house_price)}* processing...")                            
                    insert_price(house_code, house_price, price_date)

                if db_house_dictionary[house_code].not_in_listing_date > datetime.date(1900, 1, 1):
                    logging.info(f"*Relisting house : {house_code}")
                    insert_relisted_house(house_code, house_price, datetime.date.today())
                    update_house_not_in_listing_date(house_code, datetime.datetime(1900, 1, 1))
                    insert_price(house_code, house_price, price_date)
            else:
                # the listed house is not in our db
                logging.info(f"New house : {house_code} processing...")
                insert_house(region_code, house_code, record_date, datetime.datetime(1900, 1, 1), house)
                insert_price(house_code, house_price, price_date)            
        else:
            lot_count+=1
            logging.info(f"LOT {index}. {house.address} : {house.price}$ house-code:{house_code} has been found.")

        logging.info(f"The {house_code} property has been processed.")   
        logging.info(f"Done with #{index}  house.")

    house_count_in_region = len(listed_house_list) - lot_count
    logging.info(f"Insert {house_count_in_region} today's houses in {region_code} region inventory.")
    insert_region_house_count(region_code, record_date, house_count_in_region)
    
    # process not listed anymore houses
    for db_house_code in db_house_dictionary:
        if (db_house_dictionary[db_house_code].not_in_listing_date == datetime.datetime(1900, 1, 1).date()):
            if db_house_code not in listed_house_list_dic:
                logging.info(f"Update not listed anymore {db_house_dictionary[db_house_code].address} : {db_house_dictionary[db_house_code].price} house.")
                update_house_not_in_listing_date(db_house_code, datetime.date.today())
