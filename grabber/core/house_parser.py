#!/usr/bin/env python3

import datetime
import hashlib
import logging
from bs4 import BeautifulSoup
from core.house import House

def get_house_list(content, region_code):
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
        house_code= hashlib.sha256(address_text.encode('utf-8')).hexdigest()    

        cards = listing_card_body.find_all("div", class_="listingCardIconCon")

        for listing_card_icon_strip in cards:
            listing_card_icon_num = listing_card_icon_strip.find("div", class_="listingCardIconNum").get_text().lstrip().rstrip()
            listing_card_icon_text = listing_card_icon_strip.find("div", class_="listingCardIconText").get_text().lstrip().rstrip()
            
            if listing_card_icon_text == "Bedrooms":
                bedrooms =listing_card_icon_num

            if listing_card_icon_text == "Bathrooms":
                bathrooms =listing_card_icon_num

        house = House(region_code, house_code, address_text, price_text, bedrooms, bathrooms, datetime.datetime(1900, 1, 1))        

        if(house.address is not None and house.price is not None):
            house_list.append(house)

    for card_con in soup.find_all("div", class_="cardCon"):            
        listing_card_body = card_con.find("div", class_="listingCardBody")
        
        if(listing_card_body is not None):            
            listing_card_address = listing_card_body.find_all(class_="listingCardAddress")
            listing_card_price = listing_card_body.find_all(class_="listingCardPrice")
                
            address_text = listing_card_address[0].get_text().lstrip().rstrip()
            price_text = listing_card_price[0].get_text().lstrip().rstrip()

            bedrooms = ""
            bathrooms = ""
            house_code= hashlib.sha256(address_text.encode('utf-8')).hexdigest()    

            cards = listing_card_body.find_all("div", class_="listingCardIconCon")

            for listing_card_icon_strip in cards:
                listing_card_icon_num = listing_card_icon_strip.find("div", class_="listingCardIconNum").get_text().lstrip().rstrip()
                listing_card_icon_text = listing_card_icon_strip.find("div", class_="listingCardIconText").get_text().lstrip().rstrip()
                
                if listing_card_icon_text == "Bedrooms":
                    bedrooms =listing_card_icon_num

                if listing_card_icon_text == "Bathrooms":
                    bathrooms =listing_card_icon_num

            house = House(region_code, house_code, address_text, price_text, bedrooms, bathrooms, datetime.datetime(1900, 1, 1))
            
            if(house.address is not None and house.price is not None):
                house_list.append(house)        

    return house_list 
    
def get_pages_count(content):
    soup = BeautifulSoup(content, 'html.parser')
    list_view_footer = soup.find(id="listViewFooter")
    if list_view_footer:
        pagination_total_pages_num = list_view_footer.find("span", class_="paginationTotalPagesNum")
    
        if pagination_total_pages_num:
            return int(pagination_total_pages_num.get_text().lstrip().rstrip())

    return 1