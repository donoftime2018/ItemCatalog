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

itemSchema.pre('validate', function(next) {
    if (this.rating < 0)
    {
        return(next("Rating cannot be negative"))
    }

    if (this.rating > 999)
    {
        return(next("Rating cannot be greater than 999"))
    }

    next()
})

itemSchema.post('save', function(error, doc, next) {
    if(error.name === 'MongoServerError' && error.code === 11000)
    {
       return(next(this.name + " already exists in the catalog"))
    }
})

module.exports = mongoose.model("Item", itemSchema);