import { getProductById, addClient, placeOrder, 
            getClientById, getClientByEmailOrPhone } from "./modules/e_shop.mjs";

let product  = await getProductById(1)
// let client   = await getClientById(2)
// let order    = await placeOrder(client, product, 3)
// let client   = await addClient('Peter Parcker', 'peter@mail.ro', '+123456789' )

// let client = await getClientByEmailOrPhone("+123456789")

console.log(product)
    