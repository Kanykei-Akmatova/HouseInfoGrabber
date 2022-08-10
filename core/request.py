import traceback
import random

from selenium import webdriver
from selenium.common.exceptions import TimeoutException, WebDriverException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.proxy import Proxy, ProxyType

from random_user_agent.user_agent import UserAgent
from random_user_agent.params import SoftwareName, OperatingSystem

from time import sleep
from random_proxy import RandomProxyList

class Request:
    selenium_retries = 0
    
    def __init__(self, url):
        self.url = url           

    def get_selenium_res(self, class_name):
        try:
            software_names = [SoftwareName.CHROME.value]
            operating_systems = [OperatingSystem.WINDOWS.value, OperatingSystem.LINUX.value]
            user_agent_rotator = UserAgent(software_names = software_names, operating_systems = operating_systems, limit=100)
        
            user_agent = user_agent_rotator.get_random_user_agent()
            
            prox_list = RandomProxyList("CA").get_proxy_list()
            p = random.choice(prox_list)
            PROXY = p['ip'] + ":" + p['port']
    
            prox = Proxy()
            prox.proxy_type = ProxyType.MANUAL
            prox.http_proxy = PROXY
            
            # webdriver.DesiredCapabilities.FIREFOX['proxy'] = {
            #     "httpProxy":PROXY,
            #     "ftpProxy":PROXY,
            #     "sslProxy":PROXY,
            #     "noProxy":None,
            #     "proxyType":"MANUAL",
            #     "class":"org.openqa.selenium.Proxy",
            #     "autodetect":False
            # }

            capabilities = webdriver.DesiredCapabilities.CHROME
            prox.add_to_capabilities(capabilities)

            # Select options for selenium
            chrome_options = Options()
            # chrome_options.add_argument('--headless')
            # chrome_options.add_argument('--no-sandbox')
            chrome_options.add_argument('--window-size=1420,1080')
            chrome_options.add_argument('--disable-gpu')
            chrome_options.add_argument(f'user-agent={user_agent}')
            # chrome_options.add_argument('--proxy-server=%s' % PROXY)
            browser = webdriver.Chrome(desired_capabilities=capabilities)
            browser.get(self.url);

            time_to_wait = 90

            try:
                WebDriverWait(browser, time_to_wait).until(EC.presence_of_element_located((By.CLASS_NAME, class_name)))
            finally:
                browser.maximize_window()
                page_html = browser.page_source
                browser.close()

                f = open("test-card.html", "a")
                f.write(page_html)
                f.close()

                return page_html
        except (TimeoutException, WebDriverException):
            print(traceback.format_exc())
            sleep(5)
            self.selenium_retries += 1
            print('Selenium retry #: ' + str(self.selenium_retries))
            return self.get_selenium_res(class_name)