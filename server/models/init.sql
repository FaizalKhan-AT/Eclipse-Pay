CREATE DATABASE EclipsePay;
USE EclipsePay;
-- USERS TABLE 
CREATE TABLE IF NOT EXISTS Users (
Id INT PRIMARY KEY AUTO_INCREMENT,
Email VARCHAR(255) UNIQUE NOT NULL,
Password VARCHAR(50) NOT NULL 
);

ALTER TABLE bankaccount AUTO_INCREMENT = 10001;
select * from  user;

desc app;
create table cards (
cvv Int check(cvv REGEXP '^[0-9]{3}$')

);
drop table cards;
insert into cards values(001);

select * from bankaccount;
desc app;
update bankaccount set id = 0 where id = 10011;
INSERT INTO BankAccount (accountNumber, accountHolderName, balance, createdAt, isProd) 
VALUES 
(123456789, 'John Doe', 1999000.00, NOW(),1),
(987654321, 'Jane Smith', 509900.00, NOW(),1),
(111122223, 'Alice Johnson', 2599900.00, NOW(),1),
(555566667, 'Bob Williams', 70999900.00, NOW(),1),
(999900001, 'Emma Brown', 15099990.00, NOW(),1);
INSERT INTO BankAccount (accountNumber, accountHolderName, balance, createdAt, isProd) 
VALUES 
(985628745, 'Test Account', 999999.00, NOW(),0);

INSERT INTO CardDetails (cardNumber, cardHolderName, expirationDate, cvv, createdAt,accountNumber) 
VALUES 
('1234567812345678', 'John Doe', '12/25', '123', NOW(), 123456789),
('9876543298765432', 'Jane Smith', '08/24', '456', NOW(), 987654321),
('1111222233334444', 'Alice Johnson', '10/25', '789', NOW(), 111122223),
('5555666677778888', 'Bob Williams', '05/23', '321', NOW(), 555566667),
('9999000011112222', 'Emma Brown', '09/22', '654', NOW(),999900001);

INSERT INTO CardDetails (cardNumber, cardHolderName, expirationDate, cvv, createdAt,accountNumber) 
VALUES 
('1234567991234567', 'Test Account', '12/25', '123', NOW(), 985628745);





ALTER TABLE BankAccount
ADD CONSTRAINT CHK_Balance_Positive CHECK (balance >= 0);
