import sys
sys.path.append("..")
import datetime
import hashlib
from db.house_data_access import get_houses, insert_house
from db.price_data_access import insert_price

def process_house_list(listed_house_list):  
    index = 1

    db_house_dictionary = dict()
    listed_house_list_dic = dict()

    for listed_house in listed_house_list:
        listed_house_list_dic[listed_house.house_code] = listed_house

    selected_house_list = get_houses()
    for selected_house in selected_house_list:
        db_house_dictionary[selected_house.house_code] = selected_house

    for listed_house_code in listed_house_list_dic:
        house = listed_house_list_dic[listed_house_code]
        house_item = "Procesing {}.{}:{} bedrooms {} bathrooms {}"    
        print(house_item.format(index, house.address, house.price, house.bedrooms, house.bathrooms))
        
        house_code = hashlib.sha256(house.address.encode('utf-8')).hexdigest()
        house_price = int(house.price.replace('$', '').replace(",",""))
        open_date =  datetime.date.today() 
        price_date =  datetime.date.today()
        close_date = datetime.datetime(1900, 1, 1)

        # the listed house is in our db
        if db_house_dictionary and db_house_dictionary[house_code]:
            print("Existing house processing...")
            insert_price(house_code, house_price, price_date)
        else:
            # the listed house is not in our db
            print("New house processing...")
            insert_house(house_code, open_date, close_date, house)
            insert_price(house_code, house_price, price_date)            

        print("Processed {}.{}".format(index, house.address))
        index +=1

    # process not listed anymore houses
    for db_house in db_house_dictionary:
        print("Processing not listed anymore house...")
        if listed_house_list_dic[db_house] is None:
            print("Update of not listed anymore house...")
            # need to finish the action here
