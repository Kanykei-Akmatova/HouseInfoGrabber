-- DROP TABLEs
DROP TABLE IF EXISTS house;
DROP TABLE IF EXISTS price;

CREATE TABLE IF NOT EXISTS house
(
    house_code character varying(128) NOT NULL,
    address character varying(256) NOT NULL,
    record_date date,
    not_in_listing_date date,
    bedrooms character varying(64) NOT NULL,
    bathrooms character varying(64) NOT NULL,
    region_code character varying(64) NOT NULL,
    CONSTRAINT house_pkey PRIMARY KEY (house_code)
);

CREATE TABLE IF NOT EXISTS price
(
    house_code character varying(128) NOT NULL,
    amount numeric(10,2) NOT NULL,
    price_date date NOT NULL
);

CREATE TABLE IF NOT EXISTS relisted_house
(
    house_code character varying(128) NOT NULL,
    amount numeric(10,2) NOT NULL,
    relist_date date NOT NULL
);

CREATE TABLE IF NOT EXISTS region_house_inventory
(
	region_code character varying(64) NOT NULL,
	record_date date NOT NULL,
    house_count numeric(10,2) NOT NULL
);