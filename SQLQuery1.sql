    --first create a table named pivot_demo to demonstrate the PIVOT and UNPIVOT operators.
    
    CREATE TABLE pivot_demo    
    (    
       Region varchar(45),    
       Year int,    
       Sales int    
    ) 

    --Next, we will insert values into this table
    
        INSERT INTO pivot_demo  
    VALUES ('North', 2010, 72500),  
    ('South', 2010, 60500),  
    ('South', 2010, 52000),  
    ('North', 2011, 45000),  
    ('South', 2011, 82500),    
    ('North', 2011, 35600),  
    ('South', 2012, 32500),   
    ('North', 2010, 20500);   

    SELECT * FROM pivot_demo 

    --PIVOT

    SELECT Year, North, South FROM     
    (SELECT Region, Year, Sales FROM pivot_demo ) AS Tab1    
    PIVOT    
    (SUM(Sales) FOR Region IN (North, South)) AS Tab2    
    ORDER BY Tab2.Year  

    --Executing this statement will produce an error because we cannot specify the numeric value as a column name directly.
    
    SELECT Region, 2010, 2011, 2012 FROM     
(SELECT Region, [Year], Sales FROM pivot_demo ) AS Tab1    
PIVOT    
(SUM(Sales) FOR [Year] IN (2010], 2011, 2012)) AS Tab2  
ORDER BY Tab2.Region; 

--However, SQL Server allows us to avoid this problem by using the brackets before each integer value.
--The updated statement is shown in the following code snippet:

--This statement executed successfully and display the calculated sum of sales for each year corresponding to the region values:

SELECT Region, [2010], [2011], [2012] FROM     
(SELECT Region, [Year], Sales FROM pivot_demo ) AS Tab1    
PIVOT    
(SUM(Sales) FOR [Year] IN ([2010], [2011], [2012])) AS Tab2  
ORDER BY Tab2.Region; 

--The dynamic PIVOT table query encapsulates the entire PIVOT script in a stored procedure. This procedure will provide adjustable options, 
--allowing us to modify our requirements by changing a few parameterized values. 

    CREATE PROCEDURE DynamicPivotTable  
      @Akshay NVARCHAR(255),  
      @Sharma NVARCHAR(255)  
    AS  
    BEGIN  
     DECLARE @Query NVARCHAR(MAX);    
     SET @Query = N'  
        SELECT * FROM (SELECT [Region], [Year], [Sales] FROM pivot_demo) AS tab1  
        PIVOT (SUM([Sales]) FOR ['+@Akshay+'] IN ('+@Sharma+')) AS PivotTable';  
      EXEC(@Query)  
    END  

    --After the successful creation of the dynamic stored procedure, we are ready to execute it. 
    --The following statement is used to call the dynamic stored procedure to display the PIVOT table at run time:
    
    EXEC DynamicPivotTable N'Region', N'[North], [South]'  

    --The following code snippet first declares a temporary table variable @Tab:

        DECLARE @Tab TABLE    
    (    
       Year int,    
       North varchar(45),  
       South varchar(45)  
    )  

    --Next, we will insert values into this table as below:

        INSERT INTO @Tab    
    SELECT Year, North, South FROM     
    (SELECT Region, Year, Sales FROM pivot_demo ) AS Tab1    
    PIVOT    
    (SUM(Sales) FOR Region IN (North, South)) AS PivotTable    
    ORDER BY PivotTable.Year  

    --Now, we can perform UNPIVOT operation using the below statement:

        SELECT Region, Year, Sales FROM @Tab t    
    UNPIVOT    
    (    
    Sales FOR Region IN (North, South)    
    ) AS UnpivotTable  

    --The below code snippet is another example to first performs 
    --PIVOT operation and then UNPIVOT operation on the same table within a single query:

        SELECT Region, Year, Sales FROM (  
    SELECT Year, North, South FROM     
    (SELECT Region, Year, Sales FROM pivot_demo ) AS Tab1    
    PIVOT    
    (SUM(Sales) FOR Region IN (North, South)) AS PivotTable    
    ) P  
    --Perform UNPIVOT Operation  
    UNPIVOT    
    (    
    Sales FOR Region IN (North, South)    
    ) AS UnpivotTable  


    --Sequence

        CREATE TABLE newstudents (  
        studID varchar(10),  
        rollNo int,  
        Name varchar(30)  
    );  

    SELECT * FROM newstudents

INSERT INTO newstudents(rollNo, Name) VALUES(87459, 'Andrew');  
INSERT INTO newstudents(rollNo, Name) VALUES(54786, 'Samuel');  
INSERT INTO newstudents(rollNo, Name) VALUES(22149, 'Nirnay');  
INSERT INTO newstudents(rollNo, Name) VALUES(94365, 'Paul');  
INSERT INTO newstudents(rollNo, Name) VALUES(35479, 'Casey');  
INSERT INTO newstudents(rollNo, Name) VALUES(74566, 'Martin');  
INSERT INTO newstudents(rollNo, Name) VALUES(10259, 'Raphel'); 
   
   CREATE SEQUENCE stud_seq   
AS INT  
START WITH 101  
INCREMENT BY 1; 
go
UPDATE newstudents SET studID = NEXT VALUE FOR stud_seq;  
go

--In this case you could also consider
--Alernative Like Oprator

SELECT * FROM 
newstudents
WHERE rollNo LIKE '10259%'
      OR rollNo LIKE '74566%'

      --underscore (_) wildcard characters.

      SELECT Name FROM 
newstudents
WHERE Name LIKE 'Rap___'

--Let’s now look at the percent (%) wildcard in detail and apply it

SELECT Name
FROM newstudents
WHERE Name LIKE '%ul'

     --INTERSECT

--     SELECT  ID, NAME, Amount, Date
--     FROM Customers
--     LEFT JOIN Orders
--     ON Customers.ID = Orders.Customer_id
--INTERSECT
--     SELECT  ID, NAME, Amount, Date
--     FROM Customers
--     RIGHT JOIN Orders
--     ON Customers.ID = Orders.Customer_id;


  