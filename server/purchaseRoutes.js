const mongoose = require('mongoose')
const express = require('express');
const router = express.Router()
const User = require("./User");

mongoose.set('setDefaultsOnInsert', true);

router.route("/numItemsInCart/:user").get(async(req, res) => {
    
})

router.route("/itemsInCart/:user").get(async(req, res) => {

})

router.route("/removeFromCart/:user").delete(async(req, res) => {

})

router.route("/addToCart/:user").put(async(req, res, next) => {
    console.log(req.url)
    console.log(req.params.user)
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
    console.log(req.maxQuantity)

    let checkItemAdded = await User.findOne({username: req.user})
    console.log(checkItemAdded)

    let itemsAdded = checkItemAdded.itemsInCart
    console.log(itemsAdded)
    
    let quantityEdited = false

    for (let i = 0; i < itemsAdded.length; i++) {
        if (itemsAdded[i].name === req.item) {
            if (itemsAdded[i].quantityAdded < itemsAdded[i].maximumQuantity)
            {
                const doc = await User.findOne({username: req.user})
                doc.itemsInCart[i].quantityAdded++;
                await doc.save()

                console.log(doc)

                res.status(200).send()
            }

            else
            {
                res.status(400).send({msg: "All " + itemsAdded[i].maximumQuantity + " occurrences of " + itemsAdded[i].name + " have been added to the cart!"})
            }
        }
    }

    if(quantityEdited===false)
    {
        next()
    }

}

async function addItemToCart(req, res, next)
{
    console.log(req.user)
    console.log(req.item)
    console.log(req.price)
    console.log(req.maxQuantity)

    var itemFields = {name: req.item, price: req.price, maximumQuantity: req.maxQuantity}

    const doc = await User.findOne({username: req.user})
    doc.itemsInCart.push(itemFields)
    await doc.save()
    console.log(doc)
    res.status(200).send()
}

// router.use(checkInCart)
router.use(addItemToCart)

module.exports = router