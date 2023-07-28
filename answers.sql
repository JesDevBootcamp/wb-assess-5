-- Problem 1

SELECT email
FROM customers
ORDER BY email ASC;

-- Problem 2

SELECT id
FROM orders
WHERE customer_id IN (
	SELECT id
	FROM customers
	WHERE customers.fname = 'Elizabeth'
	AND customers.lname = 'Crocker'
);

-- Problem 3

SELECT SUM(num_cupcakes)
FROM orders
WHERE NOT processed;

-- Problem 4

SELECT name, SUM(num_cupcakes)
FROM cupcakes
LEFT JOIN orders ON cupcake_id = cupcakes.id
GROUP BY name
ORDER BY name ASC;