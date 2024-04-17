use Bhavya

Employee Table Creation

create table emp_department(
	DPT_CODE tinyint not null, 
	DPT_NAME varchar(50) not null,
	DPT_ALLOTMENT int
	PRIMARY KEY (DPT_CODE)
)
create table emp_details(
	EMP_IDNO int PRIMARY KEY,
	EMP_FNAME varchar(50) not null,
	EMP_LNAME varchar(50) not null,
	EMP_DEPT tinyInt not null
	FOREIGN KEY (EMP_DEPT) REFERENCES emp_department(DPT_CODE)
)

INSERT INTO emp_department values(57,'IT',65000),(63,'Finance',15000),(47,'HR',240000),(27,'RD',55000),(89,'QC',75000);
INSERT INTO emp_details values(127323,'Michale','Robbin',57),(526689 ,'Carlos','Snares',63),(843795 ,'Enric','Dosio',57),(328717 ,'Jhon','Snares',63),(444527 ,'Joseph','Dosni ',47),(659831 ,'Zanifer','Emily',47),(847674 ,'Kuleswar','Sitaraman',57),(748681 ,'Henrey','Gabriel ',47),(555935 ,'Alex','Manuel',57),(539569 ,'George','Mardy',27),(733843 ,'Mario','Saule',63),(631548 ,'Alan','Snappy',27),(839139 ,'Maria','Foster',57)

select * from emp_department
select * from emp_details

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

Company Table Creation

CREATE TABLE company_mast(
	COM_ID INT, 
	COM_NAME VARCHAR(50) NOT NULL
	PRIMARY KEY (COM_ID)
)

CREATE TABLE item_mast(
	PRO_ID INT,
	PRO_NAME VARCHAR(100),
	PRO_PRICE INT,
	PRO_COM INT
	PRIMARY KEY (PRO_ID)
	FOREIGN KEY (PRO_COM) REFERENCES company_mast(COM_ID)
)

INSERT INTO company_mast VALUES(11,'Samsung'),(12,'iBall'),(13,'Epsion'),(14,'Zebronics'),(15,'Asus'),(16,'Frontech');
INSERT INTO item_mast VALUES(101,'Mother Board',3200,15),(102,'Key Board',450,16),(103,'ZIP drive',250,14),(104,'Speaker',550,16),(105,'Monitor',5000,11),(106,'DVD drive',900,12),(107,'CD drive',800,12),(108,'Printer',2600,13),(109,'Refill cartridge',350,13),(110,'Mouse',250,12);

SELECT * FROM company_mast;
SELECT * FROM item_mast;

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

Orders Table Creation

CREATE TABLE salesman(
	salesman_id int, 
	name varchar(100),
	city varchar(50),
	commission decimal(4,2)
	PRIMARY KEY (salesman_id)
)

CREATE TABLE customer(
	customer_id int,
	cust_name varchar(100),
	city varchar(50),
	grade int,
	salesman_id int
	PRIMARY KEY (customer_id)
	FOREIGN KEY (salesman_id) REFERENCES salesman(salesman_id)
)


CREATE TABLE orders(
	ord_no bigint,
	purch_amt decimal(10,2),
	ord_date date,
	customer_id int,
	salesman_id int
	PRIMARY KEY (ord_no)
	FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
	FOREIGN KEY (salesman_id) REFERENCES salesman(salesman_id)
)

INSERT INTO salesman VALUES(5001,'James Hoog','New York',0.15),(5002,'Nail Knite','Paris',0.13),(5005,'Pit Alex','London',0.11),(5006,'Mc Lyon','Paris',0.14),(5007,'Paul Adam','Rome',0.13),(5003,'Lauson Hen','San Jose',0.12);
INSERT INTO customer VALUES(3002,'Nick Rimando','New York',100,5001),(3007,'Brad Davis','New York',200,5001),(3005,'Graham Zusi','California',200,5002),(3008,'Julian Green','London',300,5002),(3004,'Fabian Johnson','Paris',300,5006),(3009,'Geoff Cameron','Berlin',100,5003),(3003,'Jozy Altidor','Moscow',200,5007),(3001,'Brad Guzan','London',NULL,5005);
INSERT INTO orders VALUES(70001,150.5,'2012-10-05',3005,5002),(70009,270.65,'2012-09-10',3001,5005),(70002,65.26,'2012-10-05',3002,5001),(70004,110.5,'2012-08-17',3009,5003),(70007,948.5,'2012-09-10',3005,5002),(70005,2400.6,'2012-07-27',3007,5001),(70008,5760,'2012-09-10',3002,5001),(70010,1983.43,'2012-10-10',3004,5006),(70003,2480.4,'2012-10-10',3009,5003),(70012,250.45,'2012-06-27',3008,5002),(70011,75.29,'2012-08-17',3003,5007),(70013,3045.6,'2012-04-25',3002,5001);

SELECT * FROM customer
SELECT * FROM orders
SELECT * FROM salesman

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/



/*(1) Write a SQL statement to find the total purchase amount of all orders.*/
SELECT SUM(purch_amt) as [Total Purchase Amount] 
from orders

/*(2) Write a SQL statement to find the average purchase amount of all orders.*/
SELECT AVG(purch_amt) as [Average Purchase Amount] 
from orders

/*(3) Write a SQL statement to find the number of salesmen currently listing for all of their customers*/
SELECT COUNT(DISTINCT salesman_id) AS [Listed Salesman] 
from customer

/*(4) Write a SQL statement to know how many customer have listed their names.*/
SELECT COUNT(customer_id) AS [Number Of Customers] 
FROM customer

/*(5) Write a SQL statement find the number of customers who gets at least a gradation for his/her performance*/
SELECT COUNT(customer_id) AS Grade 
FROM customer 
WHERE grade IS NOT NULL

/*(6) Write a SQL statement to get the maximum purchase amount of all the orders*/
SELECT MAX(purch_amt) AS [Maximun Purchase Amount] 
FROM orders

/*(7) Write a SQL statement to get the minimum purchase amount of all the orders*/
SELECT MIN(purch_amt) AS [Minimun Purchase Amount] 
FROM orders

/*(8) Write a SQL statement which selects the highest grade for each of the cities of the custom*/
SELECT MAX(grade) AS [Max Grade] , city 
FROM customer 
GROUP BY city;

/*(9) Write a SQL statement to find the highest purchase amount ordered by the each customer with their ID and highest purchase amount.*/
SELECT MAX(purch_amt) AS [Max Purchase] , customer_id 
FROM orders 
GROUP BY customer_id;

/*(10) Write a SQL statement to find the highest purchase amount ordered by the each customer on a particular date with their ID, order date and highest purchase amount. */
SELECT customer_id, ord_date, MAX(purch_amt) AS [Max Purchase Amount] 
FROM orders 
GROUP BY customer_id, ord_date 
ORDER BY customer_id

/*(11) Write a SQL statement to find the highest purchase amount on a date '2012-08-17' for each salesman with their ID.*/
SELECT salesman_id, MAX(purch_amt) AS [Highest Purchase Amount] 
FROM orders 
WHERE ord_date='2012-08-17' 
GROUP BY salesman_id

/*(12) Write a SQL statement to find the highest purchase amount with their ID and order date, for only those customers who have highest purchase amount in a day is more than 2000. */
SELECT customer_id, ord_date, max(purch_amt) AS [Highest Purchase Amount] 
FROM orders 
group by customer_id, ord_date 
having max(purch_amt)>2000

/*(13) Write a SQL statement to find the highest purchase amount with their ID and order date, for those customers who have a higher purchase amount in a day is within the range 2000 and 6000*/
SELECT customer_id, ord_date, max(purch_amt) AS [Highest Purchase Amount] 
FROM orders 
where purch_amt BETWEEN 2000 AND 6000 
group by customer_id, ord_date

/*(14) Write a SQL statement to find the highest purchase amount with their ID and order date, for only those customers who have a higher purchase amount in a day is within the list 2000, 3000, 5760 and 6000. */
SELECT customer_id, ord_date, max(purch_amt) AS [Highest Purchase] 
FROM orders 
where purch_amt IN (2000, 3000, 5760, 6000) 
group by customer_id, ord_date

/*(15) Write a SQL statement to find the highest purchase amount with their ID, for only those customers whose ID is within the range 3002 and 3007.*/
SELECT customer_id, max(purch_amt) AS [HIGHEST PURCHASE] 
FROM orders 
where customer_id BETWEEN 3002 AND 3007 
group by customer_id

/*(16) Write a SQL statement to display customer details (ID and purchase amount) whose IDs are within the range 3002 and 3007 and highest purchase amount is more than 1000. */
SELECT customer_id, max(purch_amt) AS [HIGHEST PURCHASE] 
FROM orders
WHERE customer_id BETWEEN 3002 AND 3007
GROUP BY customer_id 
HAVING MAX(purch_amt) > 1000

/*(17) Write a SQL statement to find the highest purchase amount with their ID, for only those salesmen whose ID is within the range 5003 and 5008. */
SELECT salesman_id, max(purch_amt) AS [HIGHEST PURCHASE] 
FROM orders 
WHERE (salesman_id BETWEEN 5003 AND 5008) 
GROUP BY salesman_id

/*(18) Write a SQL statement that counts all orders for a date August 17th, 2012. */
SELECT CONVERT(DATE, 'August 17, 2012', 101) AS ORD_DATE, COUNT(ord_no) AS [TOTAL ORDERS] 
FROM orders 
WHERE ord_date=CONVERT(DATE, 'August 17, 2012', 101)

/*(19) Write a SQL statement that count the number of salesmen for whom a city is specified. Note that there may be spaces or no spaces in the city column if no city is specified.*/
SELECT count(*) AS [Number Of Salesman] FROM salesman 
WHERE not RTRIM(city) = '';

/*(20) Write a query that counts the number of salesmen with their order date and ID registering orders for each day.*/
SELECT salesman_id, COUNT(salesman_id) AS [Count Of Salesman], ord_date AS [Order Date] 
FROM orders 
GROUP BY ord_date, salesman_id

/*(21) Write a SQL query to calculate the average price of all the products. */
SELECT AVG(PRO_PRICE) AS [Average Price] 
FROM item_mast

/*(22) Write a SQL query to find the number of products with a price more than or equal to Rs.350.*/
SELECT COUNT(PRO_ID) AS [Number Of Products] 
FROM item_mast 
WHERE PRO_PRICE>350

/*(23) Write a SQL query to display the average price of each company's products, along with their code.*/
SELECT PRO_COM AS [Company Code], AVG(PRO_PRICE) AS [Average Of Prices] 
FROM item_mast 
GROUP BY PRO_COM;

/*(24) Write a query in SQL to find the sum of the allotment amount of all departments. */
SELECT SUM(DPT_ALLOTMENT) AS [Total Sum] 
FROM emp_department

/*(25) Write a query in SQL to find the number of employees in each department along with the department code.*/
SELECT COUNT(EMP_IDNO) AS [Number Of Employee], EMP_DEPT AS [Department Code] 
FROM emp_details 
GROUP BY EMP_DEPT