import {createServer} from 'node:http'
import { readFile } from 'node:fs/promises';
import {
  getProductById,
  addClient,
  placeOrder,
  getClientById,
  getClientByEmailOrPhone,
} from "./modules/e_shop.mjs";
import querystring from 'node:querystring'

 const server = createServer(async (req, res) => {
    let html;
    if (req.url === '/') {
        let product_id = 1;
        let product = await getProductById(product_id);
        html = (await readFile('./templates/home.html')).toString();
        html = html.replace(
            "{%product%}",
            `<h1>${product.name}</h1>
            <img src='./img/${product.img}'>
            <br>
            <h3> Price: ${product.standartPrice.amount} 
            ${product.standartPrice.currency}</h3>
            <h3> Discount Price: ${product.discountPrice.amount} 
            ${product.discountPrice.currency}</h3>  
            <a href='/order/${product_id}'> PAY </a>`
        );
       
    } else if (req.url.startsWith('/order')) {

        /* extract the last array's element and transform to integer  */
        const product_id = parseInt(req.url.split("/").pop()) 

        html = (await readFile("./templates/order.html")).toString();
        html = html.replace('(% PRODUCT_ID %)', product_id)

       
    } else if (req.url === '/payment') {
    // 1.extract all data of order.html's Form in querrysting format
        let requestBody = ''
         /* when POSTED(in small fragments), take all the fragments into a variables  */
        req.on('data', (chunk) => {
            requestBody += chunk 
        })
        // Save Client data in db
        req.on('end', async () => {
            let data = querystring.parse(requestBody) /* at the end parse querystring into an object "data" */
            let client = await addClient(data.fullName, data.email, data.phone )
        // Extract product from db 
        console.log(data)
        console.log(data.product_id)
            let product = await getProductById(data.product_id);
          console.log(product);  
        // Place order 
            let order = await placeOrder(client, product, data.quantity)
            console.log(order); 
        })

        html = '<h1>Payment</h1>';
       
    } else if (req.url === '/contacts') {
        html = '<h1>CONTACTS INFO</h1>';
       
    } else {
        if (req.url.startsWith('/img')) {
            let parts = req.url.split('/');
            let img = parts.pop();
        html = await readFile(`./img/${img}`);
           
        } else {
        html = '404: Page not found';
            res.writeHead(404);
           ;
        }
    }
    

    res.end(html)
    
})

server.listen('3000', 'localhost')