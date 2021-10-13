CREATE DATABASE sample;

CREATE TABLE IF NOT EXISTS account (
    account_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    account_email VARCHAR(50),
    account_password VARCHAR(50)
);

INSERT INTO account (first_name, last_name, account_email, account_password)
VALUES ('2', '43', '4', '5');

SELECT * FROM account;