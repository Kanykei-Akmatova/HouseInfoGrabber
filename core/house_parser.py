#!/usr/bin/env python3

import hashlib
from bs4 import BeautifulSoup
from core.house import House

def get_house_list(content):
    house_list = []
    soup = BeautifulSoup(content, 'html.parser') 

    for card_con in soup.find_all("li", class_="cardCon"):            
        listing_card_body = card_con.find("div", class_="listingCardBody")
        
        listing_card_address = listing_card_body.find_all(class_="listingCardAddress")
        listing_card_price = listing_card_body.find_all(class_="listingCardPrice")
            
        address_text = listing_card_address[0].get_text().lstrip().rstrip()
        price_text = listing_card_price[0].get_text().lstrip().rstrip()

        bedrooms = ""
        bathrooms = ""
        house_cdoe = hashlib.sha256(address_text.encode('utf-8')).hexdigest()    

        for listing_card_icon_strip in listing_card_body.find_all("div", class_="listingCardIconCon"):
            listing_card_icon_num = listing_card_icon_strip.find("div", class_="listingCardIconNum").get_text().lstrip().rstrip()
            listing_card_icon_text = listing_card_icon_strip.find("div", class_="listingCardIconText").get_text().lstrip().rstrip()
            
            if listing_card_icon_text == "Bedrooms":
                bedrooms =listing_card_icon_num

            if listing_card_icon_text == "Bathrooms":
                bathrooms =listing_card_icon_num

        house = House(house_cdoe, address_text, price_text, bedrooms, bathrooms)

        if(house.address is not None and house.price is not None):
            house_list.append(house)

    return house_list 
    