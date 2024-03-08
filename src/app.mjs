import { getProductById, addClient } from "./modules/e_shop.mjs";

let product  = await getProductById(1)

let client   = await addClient( 1, 'Peter Parcker', 'peter@mail.ro', '+123456789' )

// console.log(product)
    