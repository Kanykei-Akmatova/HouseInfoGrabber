from bs4 import BeautifulSoup
import requests
import base64

class RandomProxyList:
    
    def __init__(self, country):
        self.country = country           

    def get_proxy_list(self):

        country_code = self.country

        l_tag = {}
        ip_list = list()

        for page in range(1, 3):
            url = "http://free-proxy.cz/en/proxylist/country/" + country_code + "/all/ping/all/" + str(page)
            result = requests.get(url).text
            soup = BeautifulSoup(result, 'html.parser')

            allproxy = soup.find_all("tr")

            for proxy in allproxy:
                td = proxy.find_all("td")    
                try:        
                    ip = td[0].find_all("script")[0].text.replace('document.write(Base64.decode("', '').replace('"))', "")
                    l_tag["ip"] = base64.b64decode(ip).decode("utf-8", "ignore")
                except:
                    l_tag["ip"] = None
                try:
                    l_tag["port"] = td[1].text.replace("\n", "").replace(" ", "")
                except:
                    l_tag["port"] = None
                try:
                    l_tag["protocol"] = td[2].text.replace("\n", "").replace(" ", "")
                except:
                    l_tag["protocol"] = None

                if(l_tag["ip"] is not None and l_tag["port"] is not None and (l_tag["protocol"] == 'HTTP' or l_tag["protocol"] == 'HTTPS')):
                    ip_list.append(l_tag)

                l_tag = {}

        return ip_list
