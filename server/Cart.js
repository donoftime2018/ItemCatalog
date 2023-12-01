const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    itemsInCart: [
        {
            itemName: String,
            addedBy: String
        }
    ]
});

cartSchema.pre('validate', function() {
    if (this.itemsInCart.length > 3)
    {
        this.itemsinCart.pop()
        this.itemsinBought.pop()

        console.log(this.itemsinCart)
        console.log(this.itemsinBought)
    }
})

module.exports = mongoose.model("Cart", cartSchema);
