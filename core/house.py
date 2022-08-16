class House: 
    def __init__(self, region_code, house_code, address, price, bedrooms, bathrooms):         
        self.price = price
        self.address = address
        self.bedrooms = bedrooms
        self.bathrooms = bathrooms
        self.house_code = house_code
        self.region_code = region_code