class Order {
    constructor(id, client, product, quantity, placed, completedOn, standartPrice, discountPrice){

        this.id = id
        this.client = client     
        this.product = product 
        this.quantity = quantity 
        this.placed = placed
        this.completedOn = completedOn 
        this.standartPrice = standartPrice
        this.discountPrice = discountPrice 

    }
}

export {Order}