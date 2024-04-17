CREATE TABLE Employees(
	EmployeeID int IDENTITY(1,1),
	LastName varchar(30),
	FirstName varchar(30) NOT NULL,
	Title varchar(50) NOT NULL,
	BirthDate date NOT NULL,
	HireDate date NOT NULL,
	ReportsTo int,
	_Address varchar(300) NOT NULL
	CONSTRAINT emp_pk PRIMARY KEY (EmployeeID)
)

CREATE TABLE Orders(
	OrderID int IDENTITY(101,1),
	CustomerID int NOT NULL,
	EmployeeID int NOT NULL,
	OrderDate date NOT NULL
	CONSTRAINT ord_pk PRIMARY KEY(OrderID)
	CONSTRAINT cust_fk FOREIGN KEY(CustomerID) REFERENCES Customers(CustomerID),
	CONSTRAINT emp_fk FOREIGN KEY(EmployeeID) REFERENCES Employees(EmployeeID)
)

CREATE TABLE Customers(
	CustomerID int IDENTITY(1,1),
	CompanyName varchar(100) NOT NULL,
	ContactName varchar(60) NOT NULL,
	ContactTitle varchar(50) NOT NULL,
	_Address varchar(300) NOT NULL,
	City varchar(50) NOT NULL,
	Country varchar(50) NOT NULL
	CONSTRAINT cust_pk PRIMARY KEY (CustomerID)
)

INSERT INTO Employees VALUES('Smith','John','Manager','1980-05-15','2010-03-01',NULL,'123 Main St, Anytown'),('Johnson','Alice','Sales Associate','1985-08-22','2012-06-15',1,'456 Oak St, Othertown'),('Williams','Robert','Technician','1990-12-10','2015-02-20',1,'789 Pine St, Anycity'),('Miller','Karen','Accountant','1988-09-05','2013-04-18',1,'567 Elm St, Othertown'),('Brown','Michael','Sales Manager','1983-11-20','2014-08-12',1,'789 Birch St, Somecity'),('Davis','Amanda','IT Specialist','1992-03-28','2016-01-25',2,'123 Cedar St, Newville'),('Garcia','Carlos','Customer Service Rep','1985-06-15','2017-09-03',2,'456 Maple St, Anycity'),('Johnson','Susan','Marketing Coordinator','1990-01-10','2018-12-07',3,'890 Pine St, Othertown')
INSERT INTO Orders VALUES(1,2,'2024-03-08'),(2,1,'2024-03-09'),(3,3,'2024-03-10'),(4,4,'2024-03-15'),(5,5,'2024-03-18'),(6,6,'2024-03-21'),(3,7,'2024-03-25'),(2,8,'2024-03-28')
INSERT INTO Customers VALUES('ABC Electronics','Mark Johnson','CEO','567 Broadway St, Anytown','Anytown','USA'),('XYZ Corp','Sarah Smith','Purchasing Manager','890 Oak St, USA','Othertown','USA'),('LMN Industries','David Williams','Operations Manager','111 Pine St, Anycity','Anycity','USA'),('Global Tech','Jennifer Lee','Sales Manager','456 Main St, Othertown','Othertown','Canada'),('International Innovations','Brian Davis','Marketing Director','789 Pine St, Anycity','Anycity','UK'),('Regional Solutions','Emily White','HR Manager','234 Oak St, Somecity','Somecity','Germany')

INSERT INTO Employees VALUES('Cruise','Tom','Boss','1980-05-15','2010-03-01',3,'53 Holy St, Anytown'),('Holland','Tom','Project Manager','1980-05-15','2010-03-01',2,'53 Holy St, Anytown'),('Chan','Jacky','Trainee','1980-05-15','2010-03-01',3,'53 Holy St, Anytown')
INSERT INTO Orders VALUES(1,3,'2024-03-08');
INSERT INTO Customers VALUES('NEXON','Subhash Iyear','SR. Manager','567 Broadway St, Anytown','Anytown','Netherlands'),('Dabang','Kishor Mishra','Team Lead','890 Oak St, USA','Othertown','Singapore');

SELECT * FROM Employees;
SELECT * FROM Orders;
SELECT * FROM Customers;

--(1) Write a SQL query to retrieve the list of all orders made by customers in the "USA".
SELECT o.OrderID AS [Orders Made in USA]
FROM Orders AS o
INNER JOIN Customers AS c
ON o.CustomerID=c.CustomerID
WHERE c.Country='USA'

--(2)Write a SQL query to retrieve the list of all customers who have placed an order.
SELECT DISTINCT c.CustomerID, c.ContactName AS [Name]
FROM Orders AS o
INNER JOIN Customers AS c
ON o.CustomerID= c.CustomerID

--(3)Write a SQL query to retrieve the list of all employees who have not yet placed an order.
SELECT e.EmployeeID, e.FirstName + ' ' + e.LastName AS [Name] 
FROM Employees AS e 
LEFT JOIN Orders as o
ON e.EmployeeID=o.EmployeeID
WHERE o.OrderID IS NULL

--(4)Write a SQL query to retrieve the list of all employees who have placed an order.
SELECT DISTINCT e.EmployeeID, e.FirstName + ' ' + e.LastName AS [Name] 
FROM Employees as e
INNER JOIN Orders as o
ON e.EmployeeID=o.EmployeeID

--(5)Write a SQL query to retrieve the list of all customers who have not yet placed an order.
SELECT c.CustomerID, c.ContactName AS [Name]
FROM Customers AS c
LEFT JOIN Orders AS o
ON c.CustomerID=o.CustomerID
WHERE o.OrderID IS NULL

--(6)Write a SQL query to retrieve the list of all customers who have placed an order, along with the order date.
SELECT c.CustomerID, c.ContactName AS [Name], o.OrderDate
FROM Customers AS c
INNER JOIN Orders AS o
ON c.CustomerID=o.CustomerID
ORDER BY c.CustomerID

--(7)Write a SQL query to retrieve the list of all orders placed by a particular customer.
SELECT c.CustomerID, c.ContactName AS [Name], o.OrderID
FROM Customers AS c
INNER JOIN Orders as o
ON c.CustomerID=o.CustomerID
ORDER BY c.CustomerID

--(8)Write a SQL query to retrieve the list of all orders placed by a particular employee.
SELECT e.EmployeeID, e.FirstName + ' ' + e.LastName AS [Name], o.OrderID
FROM Employees AS e
INNER JOIN Orders AS o
ON e.EmployeeID=o.EmployeeID
ORDER BY EmployeeID

--(9)Write a SQL query to retrieve the list of all orders placed by a particular customer on a particular date.
SELECT c.CustomerID, c.ContactName AS [Name], o.OrderID, o.OrderDate
FROM Customers AS c
INNER JOIN Orders AS o
ON c.CustomerID=o.CustomerID
ORDER BY CustomerID

--(10)Write a SQL query to retrieve the list of all customers who have not yet placed an order, sorted by their country.
SELECT c.CustomerID, c.ContactName, c.Country
FROM Customers AS c
LEFT JOIN Orders AS o
ON c.CustomerID=o.CustomerID
WHERE o.OrderID IS NULL
ORDER BY c.Country

--(11)Write a SQL query to retrieve the list of all orders placed by customers in the "USA", sorted by order date.
SELECT c.CustomerID, c.ContactName AS [Name], o.OrderID, o.OrderDate
FROM Customers AS c
INNER JOIN Orders AS o
ON c.CustomerID=o.CustomerID
WHERE c.country='USA'
ORDER BY o.Orderdate

--(12)Write a SQL query to retrieve the list of all employees who have not yet placed an order, sorted by last name.
SELECT e.EmployeeID, e.FirstName + ' ' + e.LastName AS [Name] 
FROM Employees AS e 
LEFT JOIN Orders as o
ON e.EmployeeID=o.EmployeeID
WHERE o.OrderID IS NULL
ORDER BY e.LastName

--(13)Write a SQL query to retrieve the list of all customers who have placed an order, sorted by their company name.
SELECT DISTINCT c.CustomerID, c.ContactName AS [Name], c.CompanyName
FROM Orders AS o
INNER JOIN Customers AS c
ON o.CustomerID= c.CustomerID
ORDER BY c.CompanyName

--(14)Write a SQL query to retrieve the list of all employees who have placed an order, sorted by their hire date.
SELECT DISTINCT e.EmployeeID, e.FirstName + ' ' + e.LastName AS [Name], e.HireDate
FROM Employees as e
INNER JOIN Orders as o
ON e.EmployeeID=o.EmployeeID
ORDER BY e.HireDate

--(15)Write a SQL query to retrieve the list of all customers who have placed an order on a particular date, sorted by their company name.
SELECT DISTINCT c.CustomerID, c.ContactName AS [Name], o.OrderDate, c.CompanyName
FROM Customers AS c
INNER JOIN Orders AS o
ON c.CustomerID=o.CustomerID
WHERE o.OrderDate='2024-03-09'
--ORDER BY c.CompanyName

--(16)Write a SQL query to retrieve the list of all customers who have placed an order, along with the employee who handled the order.
SELECT  o.OrderID, c.ContactName AS [Customer], e.FirstName + ' ' + e.LastName AS [Employee]
FROM Employees AS e
INNER JOIN Orders AS o
ON e.EmployeeID=o.EmployeeID
INNER JOIN Customers AS c
ON o.CustomerID=c.CustomerID

--(17)Write a SQL query to retrieve the list of all employees who have placed an order, along with the customer who placed the order.

--(18)Write a SQL query to retrieve the list of all orders placed by customers in a particular country, along with the customer name and order date.
SELECT DISTINCT o.OrderID, c.ContactName, o.OrderDate,  c.Country
FROM Customers AS c
INNER JOIN Orders AS o
ON c.CustomerID=o.CustomerID
--WHERE c.Country='Canada'

--(19)Write a SQL query to retrieve the list of all orders placed by employees who were born in a particular year, along with the employee name and order date.
SELECT o.OrderID, e.FirstName+' '+e.LastName AS [Name], YEAR(e.BirthDate) AS [Born Year], o.OrderDate
FROM Orders AS o
INNER JOIN Employees AS e
ON e.EmployeeID=o.EmployeeID
--WHERE YEAR(e.BirthDate)='1985'

--(20)Write a SQL query to retrieve the list of all customers who have placed an order, along with the customer name, order date, and employee who handled the order.
SELECT o.OrderID, c.ContactName AS Customer, e.FirstName+' '+e.LastName AS [Employee], o.Orderdate
FROM Customers AS c
INNER JOIN Orders AS o
ON c.CustomerID=o.CustomerID
INNER JOIN Employees AS e
ON o.EmployeeID=e.EmployeeID

--(21)Write a SQL query to retrieve the list of all orders placed by customers who have a particular contact title, along with the customer name and order date.
SELECT o.OrderID, c.ContactName, c.ContactTitle, o.OrderDate
FROM Orders AS o
INNER JOIN Customers AS c
ON o.CustomerID=c.CustomerID
--WHERE c.ContactTitle='CEO'

--(22)Write a SQL query to retrieve the list of all orders placed by employees who have a particular job title, along with the employee name and order date.
SELECT o.OrderID, e.FirstName+' '+e.LastName AS [Employee], e.Title, o.OrderDate
FROM Orders AS o
INNER JOIN Employees AS e
ON e.EmployeeID=o.EmployeeID
--WHERE e.Title='IT Specialist'

--(23)Write a SQL query to retrieve the list of all customers who have placed an order on a particular date, along with the customer name, order date, and employee who handled the order.
SELECT o.OrderID, c.ContactName AS Customer, e.FirstName+' '+e.LastName AS [Employee], o.Orderdate
FROM Customers AS c
INNER JOIN Orders AS o
ON c.CustomerID=o.CustomerID
INNER JOIN Employees AS e
ON o.EmployeeID=e.EmployeeID
--WHERE o.OrderDate='2024-03-08'

--(24)Write a SQL query to retrieve the list of all orders placed by customers in a particular city, along with the customer name and order date.
SELECT o.OrderID, c.ContactName, c.city, o.OrderDate
FROM Orders AS o
INNER JOIN Customers AS c
ON o.CustomerID=c.CustomerID
--WHERE c.city='Somecity'

--(25)Write a SQL query to retrieve the list of all orders placed by employees who were born in a particular city, along with the employee name and order date.

--(26)Write a SQL query to retrieve the list of all customers who have placed an order, along with the customer name, order date, and employee who handled the order, sorted by order date.
SELECT o.OrderID, c.ContactName AS Customer, e.FirstName+' '+e.LastName AS [Employee], o.Orderdate
FROM Customers AS c
INNER JOIN Orders AS o
ON c.CustomerID=o.CustomerID
INNER JOIN Employees AS e
ON o.EmployeeID=e.EmployeeID
ORDER BY o.OrderDate

--(27)Write a SQL query to retrieve the list of all orders placed by customers in a particular country, along with the customer name and order date, sorted by order date.
SELECT o.OrderID, c.ContactName AS [Name], c.Country, o.Orderdate AS [Order date]
FROM Orders AS o
INNER JOIN Customers AS c
ON o.CustomerID=c.CustomerID
--WHERE c.Country='Germany'
ORDER BY o.OrderDate

SELECT * FROM Employees;
SELECT * FROM Orders;
SELECT * FROM Customers;