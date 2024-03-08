class Payment {
    constructor(id, clientId, orderId, remoteId, completedOn, state, standartPrice, discountPrice){
        this.id = id
        this.clientId = clientId  /* */
        this.orderId = orderId    /* */
        this.remoteId = remoteId 
        this.completedOn = completedOn 
        this.state = state 
        this.standartPrice = standartPrice
        this.discountPrice = discountPrice 
    }
}

export {Payment}