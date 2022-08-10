import traceback

from selenium import webdriver
from selenium.common.exceptions import TimeoutException, WebDriverException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.proxy import Proxy, ProxyType

from time import sleep

class Request:
    selenium_retries = 0
    
    def __init__(self, url):
        self.url = url           

    def get_page_content_by_url(self, proxy, user_agent, class_name):
        try:
            prox = Proxy()
            prox.proxy_type = ProxyType.MANUAL
            prox.http_proxy = proxy

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

                with open("test-card.html", "w", encoding="utf-8") as f:
                  f.write(page_html)
               
                return page_html
        except (TimeoutException, WebDriverException):
            print(traceback.format_exc())
            sleep(5)
            self.selenium_retries += 1
            print('Selenium retry #: ' + str(self.selenium_retries))
            return self.get_selenium_res(class_name)