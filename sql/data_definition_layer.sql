CREATE TABLE products(
    id int PRIMARY KEY,
    name varchar(200) not null,
    image varchar(100) not null,
    description varchar(1000),
    price_standard_amount int not null,
    price_standart_currency varchar(4),
    price_discount_amount int
);

-- ALTER TABLE products
-- ADD price_discount_amount int;
-- ADD COLUMN price_discount_currency varchar(4);

CREATE TABLE clients(
    id SERIAL PRIMARY KEY,
    full_name varchar(100),
    email varchar(100),
    phone varchar(20)
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    product_id int not null,
    quantity int not null,  
    client_id int not null,
    placed_on timestamptz,
    completed_on timestamptz,
    const_standart_amount int not null,
    const_standart_currency varchar(4) not null,
    const_discount_amount int, 
    const_discount_currency varchar(4) not null, 
    CONSTRAINT fk_oreders_product FOREIGN KEY (product_id) REFERENCES products (id),
    CONSTRAINT fk_oreders_clients FOREIGN KEY (client_id) REFERENCES clients (id)
);


CREATE TABLE payments(
    id SERIAL PRIMARY KEY,
    client_id int not null,
    order_id int not null,
    remote_id varchar(100),
    completed_on timestamptz,
    state varchar(20) not null,
    bill_standart_amount int not null,
    bill_standart_currency varchar(4) not null,
    bill_discount_amount int, 
    bill_discount_currency varchar(4) not null, 
    CONSTRAINT fk_payments_orders FOREIGN KEY (order_id) REFERENCES orders (id),
    CONSTRAINT fk_payments_clients FOREIGN KEY (client_id) REFERENCES clients (id)
);