class House: 
    def __init__(self, region_code, house_code, address, price, bedrooms, bathrooms, not_in_listing_date):         
        self.price = price
        self.address = address
        self.bedrooms = bedrooms
        self.bathrooms = bathrooms
        self.house_code = house_code
        self.region_code = region_code
        self.not_in_listing_date = not_in_listing_date