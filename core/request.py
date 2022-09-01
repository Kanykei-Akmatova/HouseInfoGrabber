import time
import traceback

from selenium import webdriver
from selenium.common.exceptions import TimeoutException, WebDriverException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.proxy import Proxy, ProxyType

from time import sleep

from core.house_parser import get_pages_count

class Request:
    selenium_retries = 0
    
    def __init__(self, url):
        self.url = url           

    def get_page_content_by_url(self, proxy, user_agent, class_name, region_code):
        try:
            capabilities = webdriver.DesiredCapabilities.CHROME
            
            # Select options for selenium
            chrome_options = Options()
            
            # chrome_options.add_argument('--headless')
            # chrome_options.add_argument('--no-sandbox')
            chrome_options.add_argument('--window-size=1420,1080')
            chrome_options.add_argument('--disable-gpu')
            chrome_options.add_argument(f'user-agent={user_agent}')            
            chrome_options.add_argument('--proxy-server=http://%s' % proxy)
            browser = webdriver.Chrome(desired_capabilities=capabilities)

            # open page
            browser.get(self.url);

            time_to_wait = 600
             
            try:
                pages = []
                WebDriverWait(browser, time_to_wait).until(EC.presence_of_element_located((By.CLASS_NAME, class_name)))
                browser.maximize_window()
                page_html = browser.page_source
                pages.append(page_html)

                total_pages = get_pages_count(page_html)
                print(f"Found {total_pages} pages")

                # with open(region_code + "-1.html", "w", encoding="utf-8") as f:
                #     f.write(page_html)
                
                page_index = 2
                link_locator = '//*[@id="ListViewPagination_Bottom"]/div/a[3]'

                while page_index <= total_pages:                    
                    list_view_pagination_bottom = browser.find_elements(By.XPATH, link_locator)

                    time.sleep(5)

                    if list_view_pagination_bottom:                        
                        print(f"Loading page {page_index} ... of {self.url}")
                        
                        WebDriverWait(browser, time_to_wait).until(EC.presence_of_element_located((By.XPATH, link_locator))).click()                        

                        time.sleep(5)    
                        
                        page_html = browser.page_source                        
                        pages.append(page_html)

                    page_index += 1
                    time.sleep(5)

                time.sleep(5)                
                print(f"Closeing broweser ...")
                browser.close()               

            finally:              
                print(f"Done with {self.url}, pages added {len(pages)}")
                return pages
        except (TimeoutException, WebDriverException):
            print(traceback.format_exc())
            sleep(5)
            self.selenium_retries += 1
            print('Selenium retry #: ' + str(self.selenium_retries))
            return self.get_selenium_res(class_name)