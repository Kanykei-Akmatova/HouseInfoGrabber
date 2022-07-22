from request import Request

result = Request('https://www.realtor.ca/on/ottawa/blackburn-hamlet/real-estate').get_selenium_res()
print(result)