drop database if exists carwash;
create database if not exists carwash;
-- use carwash;

-- create table if not exists Client(
-- 	client_id int unique auto_increment primary key not null,
--     first_name varchar(50) not null,
--     last_name varchar(50) not null,
--     email varchar(50) not null,
--     phone varchar(50) not null);
--     
-- create table if not exists Employee(
-- 	employee_id int unique auto_increment primary key not null,
--     first_name varchar(50) not null,
--     last_name varchar(50) not null,
--     salary int not null,
--     disponibility boolean not null);

-- create table if not exists EmployeeAddress (
--   employee_id int unique primary key not null,
--   street_address VARCHAR(255) NOT NULL,
--   city VARCHAR(255) NOT NULL,
--   state VARCHAR(255) NOT NULL,
--   FOREIGN KEY (employee_id) REFERENCES Employee(employee_id));
--     
-- create table if not exists Service(
-- 	service_id int unique auto_increment primary key not null,
--     service_name varchar(50) not null,
--     description varchar(250) not null,
--     price int not null);
--     
-- create table if not exists Transaction(
-- 	transaction_id int unique auto_increment primary key not null,
--     client_id int not null,
--     service_id int not null,
--     employee_id int not null,
--     transaction_date datetime not null,
--     price int not null,
--     FOREIGN KEY (client_id) REFERENCES Client(client_id),
--     FOREIGN KEY (service_id) REFERENCES Service(service_id),
--     FOREIGN KEY (employee_id) REFERENCES Employee(employee_id));
--  



--  
-- DELIMITER //
--  
-- CREATE FUNCTION check_employee_availability(employee_id INT, transaction_date DATE)
-- 	RETURNS BOOLEAN
-- 	DETERMINISTIC
-- 	BEGIN
-- 	  DECLARE employee_disponibility BOOLEAN;
--       
-- 	  SELECT disponibility INTO employee_disponibility FROM Employee WHERE employee_id = employee_id;

-- 	  if NOT employee_disponibility THEN RETURN FALSE;
-- 	  END IF;
--       
-- 	  SELECT COUNT(*) INTO @count FROM Transaction WHERE employee_id = employee_id AND transaction_date = transaction_date;

-- 	  IF @count > 0 THEN RETURN FALSE;
-- 	  END IF;
-- 	  RETURN TRUE;
-- 	  
-- 	END //
--     
-- DELIMITER ;

-- delimiter // 

-- CREATE TRIGGER check_employee_availability_trigger BEFORE INSERT ON Transaction
-- FOR EACH ROW
-- BEGIN
--   IF NOT check_employee_availability(NEW.employee_id, NEW.transaction_date) THEN
--     SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The employee is not available on the specified date and time.';
--   END IF;
-- END; //

-- delimiter ;