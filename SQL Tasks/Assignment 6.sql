use showroom

CREATE TABLE CUSTOMERS(
	CUST_ID INT IDENTITY(1,1),
	CUST_FNAME VARCHAR(30) NOT NULL,
	CUST_LNAME VARCHAR(30),
	CUST_ADDRESS VARCHAR(300),
	CUST_GENDER CHAR(6)
	CONSTRAINT PK_CUSTOMER PRIMARY KEY (CUST_ID)
)

CREATE TABLE ORDERS(
	ORD_NO BIGINT IDENTITY(1,1),
	CUST_ID INT NOT NULL,
	PROD_ID SMALLINT NOT NULL,
	ORD_QNTY SMALLINT NOT NULL,
	ORD_AMOUNT DECIMAL(10,2) NOT NULL,
	ORD_PAYMENT DECIMAL(10,2) NOT NULL,
	ORD_DATE DATE NOT NULL
	CONSTRAINT FK_ORDERS_CUST_ID FOREIGN KEY (CUST_ID) REFERENCES CUSTOMERS(CUST_ID),
	CONSTRAINT FK_ORDERS_PROD_ID FOREIGN KEY (PROD_ID) REFERENCES PRODUCTS (PROD_ID)
)
drop table orders

CREATE TABLE PRODUCTS(
	PROD_ID SMALLINT IDENTITY(1,1),
	PROD_NAME VARCHAR(100) NOT NULL,
	PROD_PRICE DECIMAL(10,2) NOT NULL
	CONSTRAINT PK_PRODUCTS PRIMARY KEY (PROD_ID)
)	


INSERT INTO CUSTOMERS VALUES
	('Ayush','Shah','Padav Road, Dahod, Gujarat, India','Male'),
	('Husain','Bhatia','Godi Road, Dahod, Gujarat, india', 'Male'),
	('Daksh','Jain','M.G. Road, Dahod, Gujarat, India','Male'),
	('Vishw','Panchal','Godhra Road, Dahod, Gujarat, India','Male'),
	('Sakina','Kapadia','Godi Road, Dahod, Gujarat, India ','Female'),
	('garvi','Patel','Govindnagar, Dahod, Gujarat, India','Female'),
	('Aarav', 'Sharma', 'Sadar Bazar, Delhi, India', 'Male'),
	('Kapil', 'Patel', 'Manek Chowk, Ahmedabad, Gujarat, India', 'Female'),
	('Jignesh', 'Khan', 'Bandra, Mumbai, Maharashtra, India', 'Female'),
	('Balram', 'Singh', 'Lalbagh, Lucknow, Uttar Pradesh, India', 'Male'),
	('Jitendra', 'Gupta', 'Hazratganj, Lucknow, Uttar Pradesh, India', 'Female'),
	('Kartikey', 'Verma', 'Sadar Bazar, Meerut, Uttar Pradesh, India', 'Male'),
	('Sudha', 'Reddy', 'Gachibowli, Hyderabad, Telangana, India', 'Female'),
	('Arjun', 'Gupta', 'Nehru Place, Delhi, India', 'Male'),
	('Diya', 'Joshi', 'Satellite, Ahmedabad, Gujarat, India', 'Female'),
	('Kabir', 'Kumar', 'Juhu, Mumbai, Maharashtra, India', 'Male'),
	('Ishika', 'Rao', 'Indira Nagar, Lucknow, Uttar Pradesh, India', 'Female'),
	('Vihaan', 'Mishra', 'Rajaji Puram, Lucknow, Uttar Pradesh, India', 'Male'),
	('Zara', 'Malhotra', 'Civil Lines, Meerut, Uttar Pradesh, India', 'Female'),
	('Rohan', 'Pillai', 'Banjara Hills, Hyderabad, Telangana, India', 'Male'),
	('Neha', 'Choudhary', 'Jayanagar, Bangalore, Karnataka, India', 'Female'),
	('Kabir', 'Nair', 'Alipore, Kolkata, West Bengal, India', 'Male'),
	('Tara', 'Chopra', 'Ellisbridge, Ahmedabad, Gujarat, India', 'Female');


INSERT INTO PRODUCTS VALUES
	('Marble Flooring', 15000),
    ('Solid Hardwood Parquet Flooring', 37500),
    ('Terrazzo Flooring', 75000),
    ('Exotic Hardwood Flooring', 75000),
    ('Custom Inlaid Wood Flooring', 225000),
    ('Handcrafted Tile Flooring', 150000),
    ('Glass Tile Mosaics', 225000),
	('Ceramic Tiles', 500),
    ('Porcelain Tiles', 1500),
    ('Natural Stone Tiles', 3000),
    ('Vinyl Tiles', 250),
    ('Linoleum Tiles', 300),
    ('Terrazzo Tiles', 3000),
    ('Cement Tiles', 1000),
    ('Rubber Tiles', 500),
    ('Mosaic Tiles', 2000),
    ('Quarry Tiles', 600),
	('Parquet de Versailles', 500000),
    ('Marble Inlay', 750000),
    ('Mosaic Marble', 1000000),
    ('Hand-Painted Terracotta Tiles', 500000),
    ('Encaustic Tile', 250000);

INSERT INTO ORDERS VALUES
(2,3,50,50 * dbo.GET_PROD_PRICE(3),50 * dbo.GET_PROD_PRICE(3)-500000,'2024-1-3'),
(2,6,40,40 * dbo.GET_PROD_PRICE(6),40 * dbo.GET_PROD_PRICE(6),'2024-5-5'),
(2,11,200,200 * dbo.GET_PROD_PRICE(11),200 * dbo.GET_PROD_PRICE(11),'2024-1-11'),
(5,19,30,30 * dbo.GET_PROD_PRICE(19),30 * dbo.GET_PROD_PRICE(19),'2023-9-3'),
(3,1,35,35 * dbo.GET_PROD_PRICE(1),35 * dbo.GET_PROD_PRICE(1)-100000,'2024-1-13'),
(3,4,42,42 * dbo.GET_PROD_PRICE(4),42 * dbo.GET_PROD_PRICE(4)-400000,'2024-1-3'),
(10,8,90,90 * dbo.GET_PROD_PRICE(8),90 * dbo.GET_PROD_PRICE(8),'2023-4-12'),
(10,20,20,20 * dbo.GET_PROD_PRICE(20),20 * dbo.GET_PROD_PRICE(20),'2024-1-18'),
(10,3,30,30 * dbo.GET_PROD_PRICE(3),30 * dbo.GET_PROD_PRICE(3)-300000,'2023-1-3'),
(10,5,47,47 * dbo.GET_PROD_PRICE(5),47 * dbo.GET_PROD_PRICE(5),'2020-5-8'),
(15,8,80,80 * dbo.GET_PROD_PRICE(8),80 * dbo.GET_PROD_PRICE(8),'2024-1-3'),
(4,11,200,200 * dbo.GET_PROD_PRICE(11),200 * dbo.GET_PROD_PRICE(11),'2024-2-3'),
(4,8,90,90 * dbo.GET_PROD_PRICE(8),90 * dbo.GET_PROD_PRICE(8),'2023-11-3'),
(4,5,80,80 * dbo.GET_PROD_PRICE(8),80 * dbo.GET_PROD_PRICE(8),'2024-7-13'),
(4,2,80,80 * dbo.GET_PROD_PRICE(2),80 * dbo.GET_PROD_PRICE(2)-400000,'2023-1-3'),
(4,3,90,90 * dbo.GET_PROD_PRICE(3),90 * dbo.GET_PROD_PRICE(3),'2022-5-23'),
(4,6,80,80 * dbo.GET_PROD_PRICE(6),80 * dbo.GET_PROD_PRICE(6),'2021-3-4'),
(13,11,200,200 * dbo.GET_PROD_PRICE(11),200 * dbo.GET_PROD_PRICE(11),'2024-1-11'),
(13,19,30,30 * dbo.GET_PROD_PRICE(19),30 * dbo.GET_PROD_PRICE(19)-1500000,'2022-4-3'),
(13,1,35,35 * dbo.GET_PROD_PRICE(1),35 * dbo.GET_PROD_PRICE(1),'2024-12-3');

--1.Create a stored procedure called "get_customers" that returns all customers from the "customers" table.
CREATE PROC GET_CUSTOMERS
AS
BEGIN
	SELECT CUST_FNAME+' '+CUST_LNAME AS CUSTOMERS FROM CUSTOMERS
END

EXEC GET_CUSTOMERS







--2.Create a stored procedure called "get_orders" that returns all orders from the "orders" table.
CREATE PROC GET_ORDERS 
AS
BEGIN
	SELECT * FROM ORDERS
END
EXEC GET_ORDERS






--3.Create a stored procedure called "get_order_details" that accepts an order ID as a parameter and returns the details of that order (i.e., the products and quantities).
CREATE PROC GET_ORDER_DETAILS
	@ORDER_ID BIGINT
AS
BEGIN
	SELECT P.PROD_NAME AS Product, O.ORD_QNTY AS Quantity
	FROM ORDERS AS O
	INNER JOIN PRODUCTS AS P
	ON O.PROD_ID=P.PROD_ID
	WHERE O.ORD_NO=@ORDER_ID
END

EXEC GET_ORDER_DETAILS 2






--4.Create a stored procedure called "get_customer_orders" that accepts a customer ID as a parameter and returns all orders for that customer.
CREATE PROC GET_CUSTOMER_ORDERS
	@CUSTOMER_ID INT
AS
BEGIN
	SELECT O.ORD_NO AS [ORDER NUMBER]
	FROM ORDERS AS O
	INNER JOIN CUSTOMERS AS C
	ON O.CUST_ID=C.CUST_ID
	WHERE O.CUST_ID=@CUSTOMER_ID
END

EXEC GET_CUSTOMER_ORDERS 5






--5.Create a stored procedure called "get_order_total" that accepts an order ID as a parameter and returns the total amount of the order.
CREATE PROC GET_ORDER_TOTAL 
	@ORDER_ID BIGINT
AS
BEGIN
	SELECT ORD_AMOUNT
	FROM ORDERS 
	WHERE ORD_NO=@ORDER_ID
END
  
EXEC GET_ORDER_TOTAL 2






--6.Create a stored procedure called "get_product_list" that returns a list of all products from the "products" table.
CREATE PROC GET_PRODUCT_LIST 
AS
BEGIN
	SELECT PROD_NAME AS [Products]
	FROM PRODUCTS
END

EXEC GET_PRODUCT_LIST






--7.Create a stored procedure called "get_product_info" that accepts a product ID as a parameter and returns the details of that product.
CREATE PROC GET_PRODUCT_INFO
	@PROD_ID SMALLINT
AS
BEGIN
	SELECT PROD_NAME, PROD_PRICE
	FROM PRODUCTS
	WHERE PROD_ID=@PROD_ID
END

EXEC GET_PRODUCT_INFO 1






--8.Create a stored procedure called "get_customer_info" that accepts a customer ID as a parameter and returns the details of that customer.
CREATE PROC GET_CUSTOMER_INFO 
	@CUST_ID INT
AS
BEGIN
	SELECT CUST_FNAME+' '+CUST_LNAME AS Customer, CUST_ADDRESS AS Address, CUST_GENDER AS Gender
	FROM CUSTOMERS 
	WHERE CUST_ID=@CUST_ID
END

EXEC GET_CUSTOMER_INFO 3






--9.Create a stored procedure called "update_customer_info" that accepts a customer ID and new information as parameters and updates the customer's information in the "customers" table.
CREATE PROC UPDATE_CUSTOMER_INFO
	@CUST_ID INT,
	@ADDRESS VARCHAR(300)
AS
BEGIN
	UPDATE CUSTOMERS
	SET CUST_ADDRESS=@ADDRESS
	WHERE CUST_ID=@CUST_ID
END

EXEC UPDATE_CUSTOMER_INFO 3,'DUSRE GRAH'






--10.Create a stored procedure called "delete_customer" that accepts a customer ID as a parameter and deletes that customer from the "customers" table.
CREATE PROC DELETE_CUSTOMER
	@CUST_ID INT
AS
BEGIN
	DELETE ORDERS
	WHERE CUST_ID=@CUST_ID
	DELETE CUSTOMERS
	WHERE CUST_ID=@CUST_ID
END

EXEC DELETE_CUSTOMER 3






--11.Create a stored procedure called "get_order_count" that accepts a customer ID as a parameter and returns the number of orders for that customer.
CREATE PROC GET_ORDER_COUNT
	@CUST_ID INT
AS
BEGIN
	SELECT COUNT(ORD_NO) AS [Num of orders]
	FROM ORDERS 
	WHERE CUST_ID=@CUST_ID
END

EXEC GET_ORDER_COUNT 4






--12.Create a stored procedure called "get_customer_balance" that accepts a customer ID as a parameter and returns the customer's balance (i.e., the total amount of all orders minus the total amount of all payments).
CREATE PROC GET_CUSTOMER_BALANCE
	@CUST_ID INT
AS
BEGIN
	SELECT SUM(ORD_PAYMENT) - SUM(ORD_AMOUNT) AS [Customer Balance]
	FROM ORDERS
	WHERE CUST_ID=@CUST_ID
END

EXEC  GET_CUSTOMER_BALANCE 3







--13.Create a stored procedure called "get_customer_payments" that accepts a customer ID as a parameter and returns all payments made by that customer.
CREATE PROC GET_CUSTOMER_PAYMENTS
	@CUST_ID INT
AS
BEGIN
	SELECT SUM(ORD_PAYMENT) AS [Total Payment]
	FROM ORDERS 
	WHERE  CUST_ID=@CUST_ID
END

EXEC GET_CUSTOMER_PAYMENTS 4






 --14.Create a stored procedure called "add_customer" that accepts a name and address as parameters and adds a new customer to the "customers" table.
CREATE PROC ADD_CUSTOMER
	@FNAME VARCHAR(30),
	@LNAME VARCHAR(30),
	@ADDRESS VARCHAR(300),
	@GENDER CHAR(6) = 'Male'
AS
BEGIN
	INSERT INTO CUSTOMERS VALUES (@FNAME, @LNAME, @ADDRESS, @GENDER)
END

EXEC ADD_CUSTOMER 'Yagnik','Rathod','College Road, Dahod'






--15.Create a stored procedure called "get_top_products" that returns the top 10 products based on sales volume.
CREATE PROC GET_TOP_PRODUCTS
AS
BEGIN
	SELECT TOP 10 P.PROD_NAME AS Products, SUM(ORD_QNTY) AS [Sales]
	FROM ORDERS AS O
	INNER JOIN PRODUCTS AS P
	ON O.PROD_ID=P.PROD_ID
	GROUP BY P.PROD_NAME
	ORDER BY Sales DESC
END

EXEC GET_TOP_PRODUCTS 






--16.Create a stored procedure called "get_product_sales" that accepts a product ID as a parameter and returns the total sales volume for that product.
CREATE PROC GET_PRODUCT_SALES
	@PROD_ID SMALLINT
AS
BEGIN
	SELECT P.PROD_NAME AS Product, SUM(ORD_QNTY) AS [Sales]
	FROM ORDERS AS O
	INNER JOIN PRODUCTS AS P
	ON O.PROD_ID=P.PROD_ID
	WHERE P.PROD_ID=@PROD_ID
	GROUP BY P.PROD_NAME
END

EXEC GET_PRODUCT_SALES  20






--17.Create a stored procedure called "get_customer_orders_by_date" that accepts a customer ID and date range as parameters and returns all orders for that customer within the specified date range.
CREATE PROC GET_CUSTOMER_ORDERS_BY_DATE 
	@CUST_ID INT, 
	@SDATE DATE, 
	@EDATE DATE
AS
BEGIN
	SELECT ORD_NO 
	FROM ORDERS
	WHERE CUST_ID=@CUST_ID AND ORD_DATE BETWEEN @SDATE AND @EDATE
END

EXEC GET_CUSTOMER_ORDERS_BY_DATE 4, '2023-1-1', '2024-1-1'






--18.Create a stored procedure called "get_order_details_by_date" that accepts an order ID and date range as parameters and returns the details of that order within the specified date range.
CREATE PROC GET_ORDER_DETAILS_BY_DATE
	@ORD_ID INT,
	@SDATE DATE, 
	@EDATE DATE
AS
BEGIN
	SELECT ORD_NO
	FROM ORDERS 
	WHERE ORD_NO=@ORD_ID AND ORD_DATE BETWEEN @SDATE AND @EDATE
END

EXEC GET_ORDER_DETAILS_BY_DATE 4, '2023-1-1', '2024-1-1'






--19.Create a stored procedure called "get_product_sales_by_date" that accepts a product ID and date range as parameters and returns the total sales volume for that product within the specified date range.
CREATE PROC GET_PRODUCT_SALES_BY_DATE
	@PROD_ID SMALLINT, 
	@SDATE DATE, 
	@EDATE DATE
AS
BEGIN
	SELECT PROD_ID, SUM(ORD_QNTY) AS Sales
	FROM ORDERS
	WHERE PROD_ID=@PROD_ID AND ORD_DATE BETWEEN @SDATE AND @EDATE
	GROUP BY PROD_ID
END

EXEC GET_PRODUCT_SALES_BY_DATE 3, '2020-1-1', '2025-1-1'







--20.Create a stored procedure called "get_customer_balance_by_date" that accepts a customer ID and date range as parameters and returns the customer's balance within the specified date range.
CREATE PROC GET_CUSTOMER_BALANCE_BY_DATE 
	@CUST_ID INT,
	@SDATE DATE, 
	@EDATE DATE
AS
BEGIN
	SELECT SUM(ORD_PAYMENT)-SUM(ORD_AMOUNT) AS Balance
	FROM ORDERS 
	WHERE CUST_ID=@CUST_ID AND ORD_DATE BETWEEN @SDATE AND @EDATE
END

EXEC GET_CUSTOMER_BALANCE_BY_DATE 3, '2024-1-10', '2024-2-10' 







--21.Create a stored procedure called "add_order" that accepts a customer ID, order date, and total amount as parameters and adds a new order to the "orders" table.
CREATE PROC ADD_ORDER 
	@CUST_ID INT,
	@ORD_DATE DATE,
	@ORD_AMOUNT DECIMAL(10,2),
	@PROD_ID SMALLINT = 5,
	@QNTY SMALLINT = 30
AS
BEGIN
	INSERT INTO ORDERS VALUES (@CUST_ID, @PROD_ID, @QNTY, @ORD_AMOUNT, @ORD_AMOUNT, @ORD_DATE)
END


EXEC ADD_ORDER 1,'2024-3-14', @AMT, 1, 30


--ALTER PROC GET_PROD_PRICE1
--	@PROD_ID SMALLINT,
--	@PRICE DECIMAL(10,2) OUTPUT
--AS
--BEGIN
--	SELECT @PRICE = PROD_PRICE  
--	FROM PRODUCTS   
--	WHERE PROD_ID=@PROD_ID;
--END

--DECLARE @OUT DECIMAL(10,2)
--EXEC GET_PROD_PRICE1 1, @PRICE=@OUT OUTPUT;
--SELECT @OUT * 30







--22.Create a stored procedure called "update_order_total" that accepts an order ID and a new total amount as parameters and updates the total amount of the order in the "orders" table.
CREATE PROC UPDATE_ORDER_TOTAL
	@ORD_ID INT, 
	@NEW_TOTAL DECIMAL(10,2)
AS
BEGIN
	UPDATE ORDERS 
	SET ORD_AMOUNT = @NEW_TOTAL
	WHERE ORD_NO=@ORD_ID
END

EXEC UPDATE_ORDER_TOTAL 21, 450000.00







--23.Create a stored procedure called "delete_order" that accepts an order ID as a parameter and deletes that order from the "orders" table.
CREATE PROC DELETE_ORDER 
	@ORD_ID BIGINT
AS
BEGIN
	DELETE ORDERS
	WHERE ORD_NO=@ORD_ID
END

EXEC DELETE_ORDER 21
