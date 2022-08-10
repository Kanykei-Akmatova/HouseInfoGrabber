from house_parser import HouseParser
from request import Request

result = Request('https://www.realtor.ca/on/ottawa/blackburn-hamlet/real-estate').get_selenium_res('listingCardBody')
house_list = HouseParser.get_house_list(result)

index = 1
            
for h in house_list:
    house_item = "{}.{}:{} bedrooms {} bathrooms {} time on market {}"    
    print(house_item.format(index, h.address, h.price, h.bedrooms, h.bathrooms))
    index +=1