#!/usr/bin/env python3
import sys
sys.path.append(".")

from core.house_parser import get_house_list, get_pages_count

f = open("./test/greely-2.html", encoding="utf8")
content = f.read()

house_list = get_house_list(content, "test")
index = 1
            
for h in house_list:
    print("{}.{}:{} bedrooms {} bathrooms {} house-code:{}" .format(index, h.address, h.price, h.bedrooms, h.bathrooms, h.house_code))
    index +=1

print(f"Total pages {get_pages_count(content)}")