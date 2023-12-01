const mongoose = require('mongoose')
const express = require('express');
const router = express.Router()
const User = require('./User');

router.route("/addToCart/:user").put(async(req, res, next) => {
    console.log(req.body.name)
    console.log(req.params.user)
    console.log(req.body.price)
    console.log(req.body.maxQuantity)
    
    req.user = req.params.user
    req.item = req.body.name
    req.price = req.body.price
    req.maxQuantity = req.body.maxQuantity

    next()
})

async function checkInCart(req, res, next) {
    console.log(req.user)
    console.log(req.item)
    console.log(req.price)

    let checkItemAdded = await User.findOne({username: req.user})
    console.log(checkItemAdded)

    let itemsAdded = checkItemAdded.itemsInCart
    console.log(itemsAdded)
    
    let quantityEdited = false

    for (let i = 0; i < itemsAdded.length; i++) {
        if (itemsAdded[i].name === req.item) {
            if (itemsAdded[i].quantityAdded < itemsAdded[i].maximumQuantity)
            {
                let updateQuantity = await User.updateOne({username: req.user}, {
                    $inc: {'itemsInCart.$.quantityAdded': 1}
                })

                console.log(updateQuantity)

                if (updateQuantity.modifiedCount>0)
                {
                    quantityEdited = true
                }
            }

            else
            {
                res.status(400).send({msg: "All " + itemsAdded[i].maximumQuantity + " occurrences of " + itemsAdded[i].name + " have been added to the cart!"})
            }
        }
    }

    if (quantityEdited === true)
    {
        next()
    }

}

async function addItem(req, res, next)
{
    console.log(req.user)
    console.log(req.item)
    console.log(req.price)

    var itemFields = {name: req.item, price: req.price}

    let updateItemsInCart = await User.updateOne({username: req.user}, {
        $addToSet: {itemsInCart: itemFields}, $inc: {'itemsInCart.$.quantityAdded': 1}
    }, {new: true, upsert: true, runValidators: true})

    console.log(updateItemsInCart)
    if (updateItemsInCart.modifiedCount>0)
    {
        res.json(updateItemsInCart).status(200).send()
    }
}

router.use(checkInCart)
router.use(addItem)

router.route("/numItemsInCart/:user").get(async(req, res) => {
    
})

router.route("/itemsInCart/:user").get(async(req, res) => {

})

router.route("/removeFromCart/:user").delete(async(req, res) => {

})

module.exports = router