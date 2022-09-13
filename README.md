# HouseInfoGrabber
House information grabber from realtor dot ca

## Setup
Please create a PostgreSQL database and run **house-DDL.sql** to have data storage.

## How to grab data
1. Set DB connection in **databse.ini to** your data base.
2. Set regions in **region-list.json** for the data grabbing.
```json
{
    "region-list" : [
        {
            "region-code" : "example-region",
            "region-url" : "https://www.example.ca/region"
        }
    ]
}
```
3. Run ```python grabber.py``` from grabber folder.
4. Run **statistic.sql** to see basic house statistic.

