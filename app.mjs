import postgres from 'postgres'
import { Product } from './Poduct.mjs'

const sql = postgres({
    host:"localhost",
    port: "5434",
    database:"node_landing_db",
    username:"postgres",
    password:"qazwsx"
})

const products = await sql`SELECT * FROM products WHERE id=1`

const product_1 = new Product(products[0].id, products[0].name, 
                        products[0].image, products[0].describtion,
                        products[0].price_standard_amount,
                        products[0].price_currency,
                        products[0].price_discount_amount)

console.log(product_1)