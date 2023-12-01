const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email:  {
        type: String,
        required: true
    },

    itemsInCart: {
        type: [{
            name: {type: String},
            price: {type: Number},
            quantityAdded: {
                type: Number,
                default: 0
            },
            maximumQuantity: {type: Number}
        }]
    }

}, {
    collection: 'user',
    timestamps: true
})

// userSchema.pre('validate', function() {
//     if (this.itemsInCart.length > 10 && this.itemsBought.length > 10)
//     {
//         this.itemsinCart.pop()
//         this.itemsBought.pop()

//         console.log(this.itemsinCart)
//         console.log(this.itemsinBought)
//     }
// })


module.exports = mongoose.model("User", userSchema);