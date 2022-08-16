-- DROP TABLEs
DROP TABLE IF EXISTS house;
DROP TABLE IF EXISTS price;

CREATE TABLE IF NOT EXISTS house
(
    house_code character varying(128) NOT NULL,
    address character varying(256) NOT NULL,
    open_date date,
    close_date date,
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