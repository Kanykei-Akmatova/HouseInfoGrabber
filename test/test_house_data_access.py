import sys
sys.path.append(".")
import datetime
import hashlib
from core.house_parser import get_house_list
from db.house_data_access import insert_house
from db.price_data_access import insert_price

f = open("./test/card.html", encoding="utf8")
content = f.read()

house_list = get_house_list(content, "test")
index = 1
            
for h in house_list:
    house_item = "{}.{}:{} bedrooms {} bathrooms {}"    
    print(house_item.format(index, h.address, h.price, h.bedrooms, h.bathrooms))
    
    house_code = hashlib.sha256(h.address.encode('utf-8')).hexdigest()        
    record_date =  datetime.date.today()
    close_date = datetime.datetime(1900, 1, 1)
    price_date =  datetime.date.today()
    
    insert_house("region_code", house_code, record_date, close_date, h)
    insert_price(house_code, int(h.price.replace('$', '').replace(",","")), price_date)
    index +=1