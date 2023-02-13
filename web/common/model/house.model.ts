export interface IHouse {
  house_code: string;
  address: string;
  record_date: string;
  not_in_listing_date: string;
  bedrooms: string;
  bathrooms: string;
  region_code: string;
  days_since_record?: number;
  price?: number;
}

export interface IHouses {
  houses: IHouse[];
}

export interface IHouseRawData {
  house_code: string;
  address: string;
  region_code: string;
  amount: number;
  price_date: string;
}

export interface IHousesTrend {
  houses: IHouseRawData[];
}

export interface IHousePrice {
  amount: number;
  price_date: string;
}

export interface IHouseItem {
  house_code: string;
  address: string;
  record_date: string;
  not_in_listing_date: string;
  region_code: string;
  bathrooms: string;
  bedrooms: string;
  house_price: IHousePrice[];
}

export interface IHouseAndPrice {
  house_code: string;
  address: string;
  region_code: string;
  house_price: IHousePrice[];
}

export interface IHouseSearchedData {
  house_code: string;
  address: string;
  record_date: string;
  not_in_listing_date: string;
  bathrooms: string;
  bedrooms: string;
  region_code: string;
  amount: number;
  price_date: string;
}
