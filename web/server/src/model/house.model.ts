export interface IHouse {
  house_code: string;
  address: string;
  record_date: string;
  not_in_listing_date: string;
  bedrooms: string;
  bathrooms: string;
  region_code: string;
}

export interface IHouses {
  houses: IHouse[];
}
