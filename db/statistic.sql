SELECT address, h.house_code, region_code, p.amount, price_date
FROM house h
INNER JOIN price p ON h.house_code = p.house_code
GROUP BY address, h.house_code, region_code, p.amount, price_date
ORDER BY address
