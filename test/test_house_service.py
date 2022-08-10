import sys
sys.path.append(".")

from core.house_parser import get_house_list
from core.house_service import process_house_list

f = open("./test/card.html", encoding="utf8")
content = f.read()

house_list = get_house_list(content)
process_house_list(house_list)