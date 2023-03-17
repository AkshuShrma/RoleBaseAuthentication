--First, create a new table named inventory :

CREATE TABLE inventory (
    warehouse VARCHAR(255),
    product VARCHAR(255) NOT NULL,
    model VARCHAR(50) NOT NULL,
    quantity INT,
    PRIMARY KEY (warehouse,product,model)
);

--Second, insert data into the inventory table:

INSERT INTO inventory(warehouse, product, model, quantity)
VALUES('San Jose', 'iPhone','6s',100);
INSERT INTO inventory(warehouse, product, model, quantity)
VALUES('San Fransisco', 'iPhone','6s',50);
INSERT INTO inventory(warehouse, product, model, quantity)
VALUES('San Jose','iPhone','7',50);
INSERT INTO inventory(warehouse, product, model, quantity)
VALUES('San Fransisco', 'iPhone','7',10);
INSERT INTO inventory(warehouse, product, model, quantity)
VALUES('San Jose','iPhone','X',150);
INSERT INTO inventory(warehouse, product, model, quantity)
VALUES('San Fransisco', 'iPhone','X',200);
INSERT INTO inventory(warehouse, product, model, quantity)
VALUES('San Jose','Samsung','Galaxy S',200);
INSERT INTO inventory(warehouse, product, model, quantity)
VALUES('San Fransisco','Samsung','Galaxy S',200);
INSERT INTO inventory(warehouse, product, model, quantity)
VALUES('San Fransisco','Samsung','Note 8',100);
INSERT INTO inventory(warehouse, product, model, quantity)
VALUES('San Jose','Samsung','Note 8',150);


SELECT * FROM inventory;

--GROUPPING SETS
     --It returns the number of stock keeping units (SKUs) stored in the inventory by warehouse and product.

SELECT
    warehouse,
    product, 
    SUM (quantity) qty
FROM
    inventory
GROUP BY
    warehouse,
    product;

    --finds the number of SKUs by the warehouse. It defines the grouping set (warehouse):

    SELECT
    warehouse, 
    SUM (quantity) qty
FROM
    inventory
GROUP BY
    warehouse;

    --The following query returns the number of SKUs by the product. It defines the grouping set (product):

    SELECT
    product, 
    SUM (quantity) qty
FROM
    inventory
GROUP BY
    product;

    --The following query finds the number of SKUs for all warehouses and products. It defines an empty grouping set ().

    SELECT
    SUM(quantity) qty
FROM
    inventory;

    --The UNION ALL requires all result sets to have the same number of columns, therefore, 
    --you need to add NULL to the select list to of each query as shown below:

    SELECT
    warehouse,
    product, 
    SUM (quantity) qty
FROM
    inventory
GROUP BY
    warehouse,
    product
UNION ALL
SELECT
    warehouse, 
    null,
    SUM (quantity) qty
FROM
    inventory
GROUP BY
    warehouse
UNION ALL
SELECT
    null,
    product, 
    SUM (quantity) qty
FROM
    inventory
GROUP BY
    product
UNION ALL
SELECT
    null,
    null,
    SUM(quantity) qty
FROM
    inventory;

    --Even though the query works as expected, it has two main issues:

   -- First, the query is difficult to read because it is lengthy.
    --Second, it has a performance issue because the database system has to scan the inventory table multiple times.

    --To resolve these issues, SQL provides us with the GROUPING SETS.

    --You can apply the GROUPING SETS to rewrite the query with the UNION ALL clauses above:

    SELECT
    warehouse,
    product, 
    SUM (quantity) qty
FROM
    inventory
GROUP BY
    GROUPING SETS(
        (warehouse,product),
        (warehouse),
        (product),
        ()
    );

    --The following illustrates the basic syntax of the SQL ROLLUP:
    --ROLLUP SETS

SELECT 
    warehouse, SUM(quantity)
FROM
    inventory
GROUP BY warehouse;

--To retrieve the total products in all warehouses, you add the ROLLUP to the GROUP BY clause as follows:

SELECT 
    warehouse, SUM(quantity)
FROM
    inventory
GROUP BY ROLLUP (warehouse);

--To make the output more readable, you can use the COALESCE() function to substitute the NULL value by the All warehouses as follows:

SELECT 
    COALESCE(warehouse, 'All warehouses') AS warehouse,
    SUM(quantity)
FROM
    inventory
GROUP BY ROLLUP (warehouse);

--Let’s add the ROLLUP to the GROUP BY clause:

SELECT 
    warehouse, product, SUM(quantity)
FROM
    inventory
GROUP BY ROLLUP (warehouse , product);

--You can use ROLLUP to perform a partial roll-up that reduces the number of subtotals calculated as shown in the following example:

SELECT 
    warehouse, product, SUM(quantity)
FROM
    inventory
GROUP BY warehouse, ROLLUP (product);


