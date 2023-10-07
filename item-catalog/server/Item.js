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

    poster : {
        type: String,
        required: true
    },
    
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
        required: true
    }
}, {
    collection: 'item',
    timestamps: true
})

module.exports = mongoose.model("Item", itemSchema);