class Order {
    constructor(id, product_id, clientId, placed_on, completedOn, standartPrice, discountPrice){
        this.id = id
        this.product_id = product_id /* */
        this.clientId = clientId     /* */
        this.placed_on = placed_on
        this.completedOn = completedOn 
        this.standartPrice = standartPrice
        this.discountPrice = discountPrice 
    }
}

export {Order}