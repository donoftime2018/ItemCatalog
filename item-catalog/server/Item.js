const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },

    quantity: {
        type: Number,
        required: true
    }
}, {
    collection: 'item'
})

module.exports = mongoose.model("Item", itemSchema);