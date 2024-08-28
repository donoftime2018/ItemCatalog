const mongoose = require('mongoose')
const {Schema} = mongoose
const User = require("./User")

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    desc: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    poster: {
        type: String,
        required: true
    },
    
    rating: {
        type: Number,
        min: 0,
        max: 999,
        default: 0,
        required: true,
    },
    usersRated: [String]
}, {
    collection: 'item',
    timestamps: true
})

itemSchema.post('save', function(error, doc, next) {
    if(error.name === 'MongoServerError' && error.code === 11000)
    {
       return(next(this.name + " already exists in the catalog"))
    }
})

module.exports = mongoose.model("Item", itemSchema);