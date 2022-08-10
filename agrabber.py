# Load selenium components
# from selenium import webdriver
from seleniumwire import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.firefox.service import Service as FirefoxService

from webdriver_manager.firefox import GeckoDriverManager

from selenium.webdriver.chrome.service import Service as ChromiumService
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.core.utils import ChromeType


proxy_username = "USER_NAME"
proxy_password = "PASSWORD"
proxy_url = "http://proxy.scrapingbee.com"
proxy_port = 8886

options = {
    "proxy": {
        "http": f"http://{proxy_username}:{proxy_password}@{proxy_url}:{proxy_port}",
        "verify_ssl": False,
    },
}

URL = "https://httpbin.org/headers?json"

driver = webdriver.Chrome(
    executable_path="YOUR-CHROME-EXECUTABLE-PATH",
    seleniumwire_options=options,
)

opts=webdriver.ChromeOptions()
opts.headless=True

# driver = webdriver.Firefox(service=FirefoxService(GeckoDriverManager().install()))
driver = webdriver.Chrome(service=ChromiumService(ChromeDriverManager(chrome_type=ChromeType.CHROMIUM).install()), options=opts)

# Establish chrome driver and go to report site URL
url = "https://www.realtor.ca/on/ottawa/blackburn-hamlet/real-estate"
driver = webdriver.Chrome()
driver.get(url)

# driver.execute_script() ## Allows Inserting JS Code In Python Script
# EX:- driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
## Above Code Will Scrool Till The Bottom of Web Page
page_height = driver.execute_script("return document.body.scrollHeight")
for value in range(0,page_height):
	driver.execute_script(f"window.scrollTo(0, {value});")
## Above Code Will Smooth Scrolling Till The End

#print(driver.page_source.encode('utf-8'))

listingCardAddress = driver.find_element(By.XPATH, "//*[@class='listingCardAddress']")
address_list = []
for address in listingCardAddress:
    address_list.append(address.text)
print(address_list)

driver.quit()