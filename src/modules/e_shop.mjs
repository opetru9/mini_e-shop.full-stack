import { Product } from './Poduct.mjs';
import { Order } from './Order.mjs';
import { Client } from './Client.mjs';
import { StandartPrice, DiscountPrice } from './Money.mjs'
import { dbConnect } from "./db.mjs";

const sql = dbConnect()

async function getProductById(id){
    const products = await sql`SELECT * FROM products WHERE id=${id}`
    const product  = products[0]

    const product1 = new Product(   
        product.id, 
        product.name, 
        product.image, 
        product.describtion,
        new StandartPrice(
            product.price_standard_amount,
            product.price_standart_currency),
        new DiscountPrice(
            product.price_discount_amount, 
            product.price_discount_currency) 
    )

    return product1
}

async function addClient( fullName, email, phone ){

    const client = new Client(null, fullName, email, phone);
    
    const clientData = await sql`
        INSERT INTO clients (full_name, email, phone)
        VALUES (${client.fullName}, ${client.email}, ${client.phone})
        RETURNING id`;

    client.id = clientData[0].id

    return client
        
}   

async function getClientById(id){
    const clients = await sql`SELECT * FROM clients WHERE id=${id}`
    const clientData  = clients[0]

    const client = new Client(   
        clientData.id, 
        clientData.full_name, 
        clientData.email, 
        clientData.phone,
    )

    return client
}

async function getClientByEmailOrPhone(emailOrPhone) {
    let clients = [];

    if (emailOrPhone.includes('@')) {
        clients = await sql`SELECT * FROM clients WHERE email=${emailOrPhone}`;
    } else {
        clients = await sql`SELECT * FROM clients WHERE phone=${emailOrPhone}`;
    }

    if (clients.length > 0) {
        const clientData = clients[0];
        const client = new Client(
            clientData.id,
            clientData.full_name,
            clientData.email,
            clientData.phone
        );

        return client;

    } else {
        return null; 
    }
}

async function placeOrder(client, product, quantity){
    let order = new Order(  
        null, 
        client, 
        product, 
        quantity,
        new Date(),
        null,
        new StandartPrice(product.standartPrice.amount * quantity,
                   product.standartPrice.currency ),
        new DiscountPrice(product.discountPrice.amount * quantity,
                   product.discountPrice.currency ),
        );
    
        const orderData = await sql`
            INSERT INTO orders (
                product_id,
                quantity,
                client_id,
                placed_on,
                completed_on,
                const_standart_amount,
                const_standart_currency,
                const_discount_amount,
                const_discount_currency
            )VALUES (
                ${order.product.id},
                ${order.quantity},
                ${order.client.id},
                ${order.placed},
                ${order.completedOn},
                ${order.product.standartPrice.amount},
                ${order.product.standartPrice.currency},
                ${order.product.discountPrice.amount},
                ${order.product.discountPrice.currency}
            )
            RETURNING id`;
    order.id = orderData[0].id

    return order
}
    
    export {getProductById, addClient, placeOrder, getClientById, getClientByEmailOrPhone}
    
