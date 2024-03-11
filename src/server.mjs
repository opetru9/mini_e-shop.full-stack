import {createServer} from 'node:http'

const server = createServer((req, res) => {
    let html;
    switch (req.url){
        case '/': 
                html= '<h1>HOME PAGE<h1/>';
        break;
        case '/order': 
                html= '<h1>ORDER<h1/>';
        break;
        case '/contacts': 
                html= '<h1>CONTACTS INFO<h1/>';
        break;
        default:
            html = '404: page not found'
            res.writeHead(404)
    }

    res.end(html)
    
})

server.listen('3000', 'localhost')