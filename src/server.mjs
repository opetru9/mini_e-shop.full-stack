import {createServer} from 'node:http'
import { readFile } from 'node:fs/promises';
import {
  getProductById,
  addClient,
  placeOrder,
  getClientById,
  getClientByEmailOrPhone,
} from "./modules/e_shop.mjs";

 const server = createServer(async (req, res) => {
    let html;
    switch (req.url){
        case '/': 
                let product = await getProductById(1)
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
                        <a href= '/order'> PAY </a>  
                `);
        break;
        case '/order': 
                html = (await readFile("./templates/order.html")).toString();
        break;
        case '/order-confirm': 
                html = 'ORDER CONFIRMED';
        break;
        case '/contacts': 
                html= '<h1>CONTACTS INFO<h1/>';
        break;
        default:
            if (req.url.startsWith('/img')) {
                let parts = req.url.split('/');
                let img = parts.pop();
                html = await readFile(`./img/${img}`);
            } else {
                html = '404: Page not found';
                res.writeHead(404);
            }
    }

    res.end(html)
    
})

server.listen('3000', 'localhost')