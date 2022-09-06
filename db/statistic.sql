SELECT address, region_code, p.amount, price_date
FROM house h
INNER JOIN (SELECT house_code, COUNT(house_code) AS house_code_count
			FROM price
			GROUP BY house_code) house_code_count ON h.house_code = house_code_count.house_code
INNER JOIN price p ON h.house_code = p.house_code
WHERE house_code_count.house_code_count > 1
ORDER BY region_code, address, price_date DESC