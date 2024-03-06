CREATE TABLE products(
    id int PRIMARY KEY,
    name varchar(200) not null,
    image varchar(100) not null,
    description varchar(1000),
    price_standard_amount int not null,
    price_currency varchar(4)
);
ALTER TABLE products
ADD COLUMN price_discount_amount int;

CREATE TABLE orders();
CREATE TABLE clients();
CREATE TABLE payments();