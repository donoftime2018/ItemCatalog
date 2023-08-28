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
        min: 0,
        default: 0,
        max: 10,
        required: true
    }
}, {
    collection: 'item'
})

module.exports = mongoose.model("Item", itemSchema);