import { Product } from './Poduct.mjs';
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

async function addClient(id, fullName, email, phone){

    try {
        const setClientDB = await sql`
            INSERT INTO clients (id, full_name, email, phone)
            VALUES (${id}, ${fullName}, ${email}, ${phone});`;

        const client_data = new Client(id, fullName, email, phone);
        
        return client_data;
        
    } catch (error) {
        if (error.code === '23505') {
            let existentClient =  await sql`SELECT * FROM clients WHERE id=${id}`
            console.log(existentClient)
            
            throw new Error(`Sorry, there is already a client with id = ${id} in our DB`);
        } else {
            throw error;
        }
    }
    }
    
    export {getProductById, addClient}
    
