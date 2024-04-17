--CREATE DATABASE MY_MOVIE
USE MY_MOVIES
CREATE TABLE actor(
	act_id int IDENTITY(1,1),
	act_fname varchar(30) NOT NULL,
	act_lname varchar(30) NOT NULL,
	act_gender char(6) NOT NULL
	CONSTRAINT pk_actor PRIMARY KEY (act_id)
)

CREATE TABLE genre(
	gen_id tinyint IDENTITY(1,1),
	gen_title varchar(30) NOT NULL
	CONSTRAINT pk_genre PRIMARY KEY (gen_id)
)

CREATE TABLE director(
	dir_id smallint IDENTITY(1,1),
	dir_fname varchar(30) NOT NULL,
	dir_lname varchar(30) NOT NULL
	CONSTRAINT pk_director PRIMARY KEY (dir_id)
)

CREATE TABLE movie(
	mov_id int IDENTITY(901,1), 
	mov_title varchar(200) NOT NULL,
	mov_year date NOT NULL,
	mov_time time NOT NULL,
	mov_lang varchar(30) NOT NULL,
	mov_dt_rel date,
	mov_rel_country varchar(max)
	CONSTRAINT pk_movie PRIMARY KEY (mov_id)
)

CREATE TABLE movie_genres(
	mov_id int NOT NULL, 
	gen_id tinyint NOT NULL
	CONSTRAINT Fk_movie_genres_mov_id FOREIGN KEY (mov_id) REFERENCES movie(mov_id),
	CONSTRAINT fk_movie_genres_gen_id FOREIGN KEY (gen_id) REFERENCES genre(gen_id)
)

CREATE TABLE movie_direction(
	dir_id smallint NOT NULL, 
	mov_id int NOT NULL
	CONSTRAINT fk_movie_direction_dir_id FOREIGN KEY (dir_id) REFERENCES director(dir_id),
	CONSTRAINT fk_movie_direction_mov_id FOREIGN KEY (mov_id) REFERENCES movie(mov_id)
)

CREATE TABLE reviewer(
	rev_id bigint IDENTITY(1,1), 
	rev_name varchar(60) NOT NULL
	CONSTRAINT pk_reviewer PRIMARY KEY (rev_id)
)

CREATE TABLE rating(
	mov_id int NOT NULL, 
	rev_id bigint NOT NULL,
	rev_stars decimal(3,2) NOT NULL,
	num_o_rating bigint NOT NULL 
	CONSTRAINT fk_rating_mov_id FOREIGN KEY (mov_id) REFERENCES movie(mov_id),
	CONSTRAINT fk_rating_rev_id FOREIGN KEY (rev_id) REFERENCES reviewer(rev_id)
)

CREATE TABLE movie_cast(
	act_id int NOT NULL, 
	mov_id int NOT NULL, 
	role varchar(60) NOT NULL
	CONSTRAINT fk_movie_cast_act_id FOREIGN KEY (act_id) REFERENCES actor(act_id),
	CONSTRAINT fk_movie_cast_mov_id FOREIGN KEY (mov_id) REFERENCES movie(mov_id)
)

-- actor table
INSERT INTO actor (act_fname, act_lname, act_gender) VALUES ('Shah Rukh', 'Khan', 'Male'), ('Deepika', 'Padukone', 'Female'), ('Amitabh', 'Bachchan', 'Male'), ('Priyanka', 'Chopra', 'Female'), ('Salman', 'Khan', 'Male'), ('Aamir', 'Khan', 'Male'), ('Kareena', 'Kapoor', 'Female'), ('Hrithik', 'Roshan', 'Male'), ('Alia', 'Bhatt', 'Female'), ('Varun', 'Dhawan', 'Male');

-- genre table
INSERT INTO genre (gen_title) VALUES('Mystery'), ('Romance'), ('Action'), ('Comedy'), ('Drama'), ('Thriller'), ('Musical'), ('Biography'), ('Adventure'), ('Horror'), ('Sci-Fi');

-- director table
INSERT INTO director (dir_fname, dir_lname) VALUES ('Karan', 'Johar'), ('Rajkumar', 'Hirani'), ('Sanjay', 'Leela Bhansali'), ('Zoya', 'Akhtar'), ('Rohit', 'Shetty'), ('Kabir', 'Khan'), ('Imtiaz', 'Ali'), ('Anurag', 'Basu'), ('Anurag', 'Kashyap'), ('Vikramaditya', 'Motwane');

-- movie table
INSERT INTO movie (mov_title, mov_year, mov_time, mov_lang, mov_dt_rel, mov_rel_country) VALUES('Naseeb', '1995-10-20', '03:09:00', 'Hindi', '1995-10-20', 'India'), ('Welcome Back', '2014-10-20', '03:09:00', 'Hindi', '1995-10-20', 'India'), ('Agneepathe', '1995-10-20', '03:09:00', 'Hindi', '1995-10-20', 'India'), ('3 Idiots', '2009-12-25', '02:51:00', 'Hindi', '2009-12-25', 'India'), ('Chennai Express', '2013-08-09', '02:21:00', 'Hindi', '2013-08-09', 'India'), ('Padmaavat', '2018-01-25', '02:44:00', 'Hindi', '2018-01-25', 'India'), ('Bajrangi Bhaijaan', '2015-07-17', '02:43:00', 'Hindi', '2015-07-17', 'India'), ('PK', '2014-12-19', '02:33:00', 'Hindi', '2014-12-19', 'India'), ('Kabhi Khushi Kabhie Gham', '2001-12-14', '03:30:00', 'Hindi', '2001-12-14', 'India'), ('Om Shanti Om', '2007-11-09', '02:42:00', 'Hindi', '2007-11-09', 'India'), ('Barfi!', '2012-09-14', '02:31:00', 'Hindi', '2012-09-14', 'India'), ('Gangs of Wasseypur', '2012-06-22', '05:21:00', 'Hindi', '2012-06-22', 'India'), ('Dil Se..', '1999-08-20', '02:45:00', 'Hindi', '1999-08-20', 'India'), ('Hum Dil De Chuke Sanam', '1999-06-18', '03:07:00', 'Hindi', '1999-06-18', 'India');

-- movie_genres table
INSERT INTO movie_genres (mov_id, gen_id) VALUES(914, 11),(913, 11), (901, 11), (904, 11) ,(906, 11), (901, 1), (902, 4), (903, 3), (904, 5), (905, 2), (906, 4), (907, 1), (908, 1), (909, 4), (910, 5), (910, 7), (910, 9);

-- movie_direction table
INSERT INTO movie_direction (dir_id, mov_id) VALUES(2, 902), (3, 903), (4, 904), (5, 905), (6, 906), (7, 907), (8, 908), (9, 909), (10, 910);

-- reviewer table
INSERT INTO reviewer (rev_name) VALUES ('Aryan Kapoor'), ('Rhea Sharma'), ('Vijay Singh'), ('Pooja Patel'), ('Arjun Gupta'), ('Neha Sharma'), ('Raj Kumar'), ('Shivani Gupta'), ('Akash Singh'), ('Sonia Jain');

-- rating table
INSERT INTO rating (mov_id, rev_id, rev_stars, num_o_rating) VALUES(907, 4, 6, 150),(907, 3, 5.5, 150),(907, 6, 7.3, 150),(908, 4, 5, 150),(908, 4, 5, 150),(905, 7, 5, 150),(905, 2, 5, 150),(905, 4, 4.8, 150),(905, 4, 4.8, 150),(905, 4, 4.8, 150), (905, 1, 4.8, 150),(903, 1, 4.8, 150),(901, 1, 4.8, 150), (902, 2, 4.6, 130), (903, 3, 4.2, 100), (904, 4, 4.7, 125), (905, 5, 4.5, 110), (906, 6, 4.4, 105), (907, 7, 4.6, 120), (908, 8, 4.3, 95), (909, 9, 4.1, 90), (910, 10, 4.6, 115);

-- movie_cast table
INSERT INTO movie_cast (act_id, mov_id, role) VALUES (1, 901, 'Raj Malhotra'), (2, 901, 'Simran Singh'), (3, 902, 'Rancho'), (4, 902, 'Pia'), (5, 903, 'Rahul'), (1, 903, 'Meena'), (4, 904, 'Rani Padmavati'), (5, 905, 'Pawan Kumar Chaturvedi'), (6, 906, 'PK'), (7, 907, 'Rahul Raichand'), (8, 908, 'Om Prakash Makhija'), (9, 909, 'Barfi'), (10, 910, 'Sardar Khan');


--1) From the following table, write a SQL query to find the name and year of the movies. Return movie title, movie release year
SELECT mov_title AS [Movie], YEAR(mov_year) AS [Release Year]
FROM movie




--2. From the following table, write a SQL query to find when the movie specific released. Return movie release year
SELECT mov_title AS [Movie], YEAR(mov_dt_rel) AS [Release Year]
FROM movie




--3. From the following table, write a SQL query to find the movie that was released in 1999. Return movie title.
SELECT mov_title AS [Movie released in 1999]
FROM movie
WHERE YEAR(mov_dt_rel)=1999




--4. From the following table, write a SQL query to find those movies, which were released before 1998. Return movie title.
SELECT mov_title AS [Movie released before 1998]
FROM movie
WHERE YEAR(mov_year)<1998




--5. From the following tables, write a SQL query to find the name of all reviewers and movies together in a single list.
SELECT DISTINCT rw.rev_name AS [Name], mov_title AS [Movie]
FROM movie AS m
INNER JOIN rating AS r
ON m.mov_id=r.mov_id
INNER JOIN reviewer AS rw
ON r.rev_id=rw.rev_id




--6. From the following table, write a SQL query to find all reviewers who have rated seven or more stars to their rating. Return reviewer name.
SELECT rw.rev_name AS [Name of reviewer who rated above 7]
FROM rating AS r
INNER JOIN reviewer AS rw
ON r.rev_id=rw.rev_id
WHERE r.rev_stars>7




--7. From the following tables, write a SQL query to find the movies without any rating. Return movie title.
SELECT mov_title AS [Movie without any rating]
FROM movie AS m
LEFT JOIN rating AS r
ON m.mov_id=r.mov_id
WHERE r.rev_id IS NULL




--8. From the following table, write a SQL query to find the movies with ID 905 or 907 or 917. Return movie title.
SELECT mov_title AS Movie
FROM movie
WHERE mov_id IN (905,907,917)




--9. From the following table, write a SQL query to find the movie titles that contain the specific word. 
--Sort the result-set in ascending order by movie year. Return movie ID, movie title and movie release year.
SELECT mov_id AS ID, mov_title AS Movie, YEAR(mov_dt_rel) AS [Release Year] 
FROM movie
WHERE mov_title LIKE '_a%'
ORDER BY [Release Year]




--10. From the following table, write a SQL query to find those actors with the first name 'Woody' and the last name 'Allen'. Return actor ID
SELECT act_id AS ID
FROM actor
WHERE act_fname='Woody' AND act_lname='Allen'




--11. get directors who have directed movies with avrage rating higher then 5
SELECT d.dir_fname AS [Directors with AVG rating above 5]
FROM movie_direction AS md
INNER JOIN rating AS r
ON md.mov_id=r.mov_id
INNER JOIN director AS d
On d.dir_id=md.dir_id
GROUP BY d.dir_fname
HAVING AVG(r.rev_stars) > 5;




--12. get all actors who have worked for movies that were directed by specific director
SELECT a.act_fname+' '+a.act_lname AS [Actor], d.dir_fname+' '+d.dir_lname AS [Director], m.mov_title AS [Movie]
FROM movie_cast AS mc
INNER JOIN movie_direction AS md
ON mc.mov_id=md.mov_id
INNER JOIN actor AS a
ON a.act_id=mc.act_id
INNER JOIN director AS d
ON d.dir_id=md.dir_id
INNER JOIN movie as m
ON m.mov_id=md.mov_id
WHERE d.dir_fname='Rajkumar' AND d.dir_lname='Hirani'



 
--13. create a stored proc to get list of movies which is 3 years old and having rating greater than 5
SELECT m.mov_title AS [3 Year old movie], CONVERT(DECIMAL(3,2), AVG(r.rev_stars)) AS Rating
FROM movie AS m
INNER JOIN rating as r
ON m.mov_id=r.mov_id
WHERE YEAR(GETDATE())-YEAR(m.mov_dt_rel)=3 AND r.rev_stars > 5
GROUP BY m.mov_title





----14. create a stored proc to get list of all directors who have directed more then 2 movies
SELECT d.dir_fname+' '+d.dir_lname AS [Director], COUNT(m.mov_id) AS Movies
FROM movie AS m
INNER JOIN movie_direction as md
ON m.mov_id=md.mov_id
INNER JOIN director AS d
ON d.dir_id=md.dir_id
GROUP BY d.dir_fname+' '+d.dir_lname
HAVING COUNT(m.mov_id) > 2




----15. create a stored proc to get list of all directors which have directed a movie which have rating greater than 3.
SELECT d.dir_fname+' '+d.dir_lname AS [Director], m.mov_title AS Movie, CONVERT(DECIMAL(3,2), AVG(r.rev_stars)) AS Rating
FROM movie AS m
INNER JOIN movie_direction as md
ON m.mov_id=md.mov_id
INNER JOIN director AS d
ON d.dir_id=md.dir_id
INNER JOIN rating AS r
ON r.mov_id=m.mov_id
WHERE r.rev_stars > 3
GROUP BY d.dir_fname+' '+d.dir_lname , m.mov_title
HAVING AVG(r.rev_stars) > 3




----16. create a function to get worst director according to movie rating
SELECT TOP 1 d.dir_fname+' '+d.dir_lname AS [Worst Director], r.rev_stars AS Rating
FROM movie AS m
INNER JOIN movie_direction as md
ON m.mov_id=md.mov_id
INNER JOIN director AS d
ON d.dir_id=md.dir_id
INNER JOIN rating AS r
ON r.mov_id=m.mov_id
ORDER BY Rating





----17.  create a function to get worst actor according to movie rating
SELECT TOP 1 a.act_fname+' '+a.act_lname AS Actor, r.rev_stars AS Rating
FROM movie AS m
INNER JOIN movie_cast as mc
ON m.mov_id=mc.mov_id
INNER JOIN actor AS a
ON mc.act_id=a.act_id
INNER JOIN rating AS r
ON r.mov_id=m.mov_id
ORDER BY Rating





----18. create a parameterized stored procedure which accept genre and give movie accordingly 
SELECT m.mov_title AS Movie
FROM movie AS m
INNER JOIN movie_genres AS mg
ON m.mov_id=mg.mov_id
INNER JOIN genre AS g
ON g.gen_id=mg.gen_id
WHERE g.gen_title='romance'




--19. get list of movies that start with 'a' and end with letter 'e' and movie released before 2015
SELECT mov_title
FROM movie
WHERE mov_title LIKE 'a%e' AND YEAR(mov_dt_rel) < 2015;





--20. get a movie with highest movie cast
SELECT TOP 1 m.mov_title, COUNT(mc.act_id) AS [CAST]
FROM movie AS m
INNER JOIN movie_cast AS mc
ON m.mov_id=mc.mov_id
GROUP BY m.mov_title
ORDER BY [CAST] DESC






--21. create a function to get reviewer that has rated highest number of movies
SELECT TOP 1 rw.rev_name AS Name, COUNT(r.rev_id) AS Reviews
FROM reviewer as rw
INNER JOIN rating as r
ON rw.rev_id=r.rev_id
GROUP BY r.rev_id, rw.rev_name
ORDER BY Reviews DESC


USE MY_MOVIE


use my_movies


--22. From the following tables, write a query in SQL to generate a report, which contain the fields 
--movie title, name of the female actor, year of the movie, role, movie genres, the director, 
--date of release, and rating of that movie.

CREATE FUNCTION GET_GENRE(@MOV_ID INT)
RETURNS VARCHAR(100)
as
begin 
	DECLARE @RET1 XML
	SET @RET1 = (
		SELECT ', ' + G.GEN_TITLE
		FROM MOVIE AS M
		INNER JOIN MOVIE_GENRES AS MG
		ON M.MOV_ID = MG.MOV_ID
		INNER JOIN GENRE AS G
		ON G.GEN_ID = MG.GEN_ID
		WHERE M.MOV_ID = @MOV_ID
		FOR XML PATH('')
	)
	RETURN STUFF(@RET1, 1, 2, '')
end

alter FUNCTION GET_DIRECTOR(@MOV_ID INT)
RETURNS VARCHAR(100)
AS
BEGIN
	DECLARE @RET varchar(100)
	SET @RET = (
		SELECT ', ' + D.dir_fname+' '+D.dir_lname
		FROM MOVIE AS M
		INNER JOIN MOVIE_DIRECTION AS MD
		ON M.MOV_ID = MD.MOV_ID
		INNER JOIN DIRECTOR AS D
		ON D.DIR_ID = MD.DIR_ID
		WHERE M.MOV_ID = @mov_id
		FOR XML PATH('')
	)
	RETURN STUFF(@RET, 1, 2, '');
END


SELECT m.mov_title AS [Movie], a.act_fname+' '+a.act_lname AS [Actor Name], YEAR(m.mov_year) AS [Year of movie], mc.role, DBO.GET_GENRE(M.MOV_ID), DBO.GET_DIRECTOR(M.MOV_ID) AS Director, m.mov_dt_rel AS [Release Date], AVG(r.rev_stars) AS Rating
FROM movie AS m
INNER JOIN movie_cast AS mc
on m.mov_id=mc.mov_id
INNER JOIN actor AS a
ON a.act_id=mc.act_id
INNER JOIN movie_genres AS mg
ON mg.mov_id=m.mov_id
INNER JOIN genre AS g
ON g.gen_id=mg.gen_id
INNER JOIN movie_direction AS md
ON md.mov_id=m.mov_id
INNER JOIN director AS d
ON d.dir_id=md.dir_id
INNER JOIN rating AS r
ON r.mov_id=m.mov_id
WHERE a.act_gender='female'
GROUP BY m.mov_title, a.act_fname+' '+a.act_lname, m.mov_year, mc.role, DBO.GET_GENRE(M.MOV_ID), DBO.GET_DIRECTOR(M.MOV_ID), m.mov_dt_rel


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


CREATE VIEW VW_GENRE
AS
	SELECT M.MOV_ID, 
	STUFF((
		SELECT ', '+G.gen_title
		FROM GENRE AS G
		INNER JOIN MOVIE_GENRES AS MG
		ON G.GEN_ID = MG.GEN_ID
		INNER JOIN MOVIE AS M1
		ON M1.MOV_ID = MG.MOV_ID
		WHERE M.MOV_ID = M1.MOV_ID
		FOR XML PATH('')), 1, 2, '')
	AS GENRES
	FROM MOVIE AS M

create VIEW VW_DIRECTOR
AS
	SELECT M.MOV_ID, 
	STUFF((
		SELECT ', '+ CONCAT(D.DIR_FNAME, ' ', D.DIR_LNAME)
		FROM DIRECTOR AS D
		INNER JOIN MOVIE_DIRECTION AS MD
		ON D.DIR_ID = MD.DIR_ID
		INNER JOIN MOVIE AS M1
		ON M1.MOV_ID = MD.MOV_ID
		WHERE M.MOV_ID = M1.MOV_ID
		FOR XML PATH('')), 1, 2, '')
	AS DIRECTORS
	FROM MOVIE AS M


SELECT m.mov_title AS [Movie], a.act_fname+' '+a.act_lname AS [Actor Name], YEAR(m.mov_year) AS [Year of movie], mc.role, MG.GENRES , MD.DirectorS, m.mov_dt_rel AS [Release Date], AVG(r.rev_stars) AS Rating
FROM movie AS m
INNER JOIN movie_cast AS mc
on m.mov_id=mc.mov_id
INNER JOIN actor AS a
ON a.act_id=mc.act_id
INNER JOIN VW_GENRE AS mg
ON mg.mov_id=m.mov_id
INNER JOIN VW_DIRECTOR AS md
ON md.mov_id=m.mov_id
INNER JOIN rating AS r
ON r.mov_id=m.mov_id
WHERE a.act_gender='female'
GROUP BY m.mov_title, a.act_fname+' '+a.act_lname, m.mov_year, mc.role, MG.GENRES, MD.DirectorS, m.mov_dt_rel

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE PROC SP_GENRE
AS
BEGIN
	SELECT MOV_ID, STUFF((
		SELECT ', ' + G.GEN_TITLE
		FROM MOVIE AS M
		INNER JOIN MOVIE_GENRES AS MG
		ON MG.MOV_ID = M.MOV_ID
		INNER JOIN GENRE AS G
		ON G.GEN_ID = MG.GEN_ID
		WHERE M.MOV_ID = M1.MOV_ID
		FOR XML PATH('')), 1, 2, '')
	FROM MOVIE AS M1 
END

CREATE TABLE #TEMP1(
	MOV_ID INT,
	GENRE VARCHAR(100)
)
INSERT INTO #TEMP1
EXEC SP_GENRE

CREATE PROC SP_DIRECTOR
AS
BEGIN
	SELECT M.MOV_ID, 
	STUFF((
		SELECT ', '+ CONCAT(D.DIR_FNAME, ' ', D.DIR_LNAME)
		FROM DIRECTOR AS D
		INNER JOIN MOVIE_DIRECTION AS MD
		ON D.DIR_ID = MD.DIR_ID
		INNER JOIN MOVIE AS M1
		ON M1.MOV_ID = MD.MOV_ID
		WHERE M.MOV_ID = M1.MOV_ID
		FOR XML PATH('')), 1, 2, '')
	AS DIRECTORS
	FROM MOVIE AS M 
END

CREATE TABLE #TEMP2(
	MOV_ID INT,
	DIRECTOR VARCHAR(100)
)
INSERT INTO #TEMP2
EXEC SP_DIRECTOR


SELECT m.mov_title AS [Movie], a.act_fname+' '+a.act_lname AS [Actor Name], YEAR(m.mov_year) AS [Year of movie], mc.role, MG.GENRE , MD.Director, m.mov_dt_rel AS [Release Date], AVG(r.rev_stars) AS Rating
FROM movie AS m
INNER JOIN movie_cast AS mc
on m.mov_id=mc.mov_id
INNER JOIN actor AS a
ON a.act_id=mc.act_id
INNER JOIN #TEMP1 AS mg
ON mg.mov_id=m.mov_id
INNER JOIN #TEMP2 AS md
ON md.mov_id=m.mov_id
INNER JOIN rating AS r
ON r.mov_id=m.mov_id
WHERE a.act_gender='female'
GROUP BY m.mov_title, a.act_fname+' '+a.act_lname, m.mov_year, mc.role, MG.GENRE, MD.Director, m.mov_dt_rel




--23. From the following tables, write a SQL query to find the years when most of the ‘Mystery Movies’ produced. Count the number of 
--generic title and compute their average rating. Group the result set on movie release year, generic title. 
--Return movie year, generic title, number of generic title and average rating.
SELECT TOP 3 YEAR(m.mov_year) AS [Year], g.gen_title AS Genre, COUNT(m.mov_id) AS [Num of Movies Released], CONVERT(DECIMAL(3,2), AVG(r.rev_stars)) AS Rating
FROM movie AS m
INNER JOIN movie_genres AS mg
ON mg.mov_id=m.mov_id
INNER JOIN genre AS g
ON g.gen_id=mg.gen_id
INNER JOIN rating AS r
ON r.mov_id=m.mov_id
WHERE g.gen_title='Mystery'
GROUP BY YEAR(m.mov_year),g.gen_title 
ORDER BY COUNT(m.mov_id) DESC

--SELECT g.gen_title AS Genre, CONVERT(Decimal(3,2), AVG(r.rev_stars)) AS Rating
--FROM movie AS m
--INNER JOIN movie_genres AS mg
--ON m.mov_id=mg.mov_id
--INNER JOIN genre AS g
--ON g.gen_id=mg.gen_id
--INNER JOIN rating AS r
--ON r.mov_id=m.mov_id
--GROUP BY g.gen_title









--24.  From the following tables, write a SQL query to find the highest-rated ‘Mystery Movies’. Return the title, year, and rating
SELECT TOP 1 m.mov_title AS Movie, YEAR(m.mov_year) AS [Year], CONVERT(DECIMAL(3,2), AVG(r.rev_stars)) AS Rating
FROM movie AS m
INNER JOIN movie_genres AS mg
ON m.mov_id=mg.mov_id
INNER JOIN genre AS g
ON g.gen_id=mg.gen_id
INNER JOIN rating AS r
ON r.mov_id=m.mov_id
WHERE g.gen_title='Mystery'
GROUP BY m.mov_title, YEAR(m.mov_year)
ORDER BY AVG(r.rev_stars) DESC






--25. create a function which accepts genre and suggests best movie according to ratings
SELECT TOP 1 m.mov_title AS Movie, CONVERT(decimal(3,2), AVG(r.rev_stars)) AS Rating
FROM movie AS m
INNER JOIN movie_genres AS mg
ON m.mov_id=mg.mov_id
INNER JOIN genre AS g
ON g.gen_id=mg.gen_id
INNER JOIN rating AS r
ON r.mov_id=m.mov_id
WHERE g.gen_title='romance'
GROUP BY m.mov_title
ORDER BY AVG(r.rev_stars) DESC







----26. create a function which accepts genre and suggests best director according to ratings
SELECT TOP 1 d.dir_fname+' '+d.dir_lname AS Director, CONVERT(DECIMAL(3,2),AVG(r.rev_stars)) AS [Rating]
FROM movie AS m
INNER JOIN movie_direction AS md
ON m.mov_id=md.mov_id
INNER JOIN director AS d
ON md.dir_id=d.dir_id
INNER JOIN movie_genres AS mg
ON mg.mov_id=m.mov_id
INNER JOIN genre AS g
ON g.gen_id=mg.gen_id
INNER JOIN rating AS r
ON r.mov_id=m.mov_id
WHERE g.gen_title='drama'
GROUP BY d.dir_fname+' '+d.dir_lname
ORDER BY [Rating] DESC







--27. create a function that accepts a genre and give random movie according to genre
SELECT TOP 1 m.mov_title AS Movie
FROM movie AS m
INNER JOIN movie_genres AS mg
ON m.mov_id=mg.mov_id
INNER JOIN genre AS g
ON g.gen_id=mg.gen_id
WHERE g.gen_title='drama'
ORDER BY newid()