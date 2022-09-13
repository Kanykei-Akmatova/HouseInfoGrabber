import json
import logging
import random
import time

from core.house_parser import get_house_list
from core.random_proxy import get_proxy_list  
from core.house_service import process_house_list
from core.request import Request

from random_user_agent.user_agent import UserAgent
from random_user_agent.params import SoftwareName, OperatingSystem


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler("app_service.log"),
        logging.StreamHandler()
    ]
)
proxy_list = get_proxy_list("CA")
# logging.info(f"proxy-list : {json.dumps(proxy_list, indent=4)}")

with open('region-list.json', 'r') as region_list_file:
    region_list_json=region_list_file.read()

region_list = json.loads(region_list_json)

for region in region_list["region-list"]:
    url = region["region-url"]            
    region_code = region["region-code"]        
    logging.info(f"Working on {region_code} region.")
    prox = random.choice(proxy_list)
    proxy = prox['ip'] + ":" + prox['port']

    software_names = [SoftwareName.CHROME.value]
    operating_systems = [OperatingSystem.WINDOWS.value, OperatingSystem.LINUX.value]
    user_agent_rotator = UserAgent(software_names = software_names, operating_systems = operating_systems, limit=100)        
    user_agent = user_agent_rotator.get_random_user_agent()
            
    logging.info(f"Loading url:{url} proxy:{proxy} user-agent:{user_agent}")

    pages = Request(url).get_page_content_by_url(proxy, user_agent, 'listingCardBody', region_code)

    house_list = [] 
    logging.info(f"Pages to process {len(pages)}")
    for content in pages: 
        house_list.extend(get_house_list(content, region_code))
    
    logging.info(f"Houses to process {len(house_list)} in {region_code} region")    
    process_house_list(region_code, house_list)

    sleep_for = 60;
    logging.info(f"Sleeping for {sleep_for} seconds...")
    time.sleep(sleep_for)