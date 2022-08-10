import json
import logging
import random

from core.house_parser import get_house_list
from core.house_service import process_house_list
from core.random_proxy import get_proxy_list  
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

url_list = ['https://www.realtor.ca/on/ottawa/blackburn-hamlet/real-estate']
proxy_list = get_proxy_list("CA")

logging.info(f"proxy-list : {json.dumps(proxy_list, indent=4)}")
            
for url in url_list:
    prox = random.choice(proxy_list)
    proxy = prox['ip'] + ":" + prox['port']

    software_names = [SoftwareName.CHROME.value]
    operating_systems = [OperatingSystem.WINDOWS.value, OperatingSystem.LINUX.value]
    user_agent_rotator = UserAgent(software_names = software_names, operating_systems = operating_systems, limit=100)        
    user_agent = user_agent_rotator.get_random_user_agent()
            
    logging.info(f"Loading url:{url} proxy:{proxy} user-agent:{user_agent}")

    result = Request(url).get_page_content_by_url(proxy, user_agent, 'listingCardBody')
    house_list = get_house_list(result)
    process_house_list(house_list)