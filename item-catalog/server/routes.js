const mongoose = require('mongoose')
const express = require('express');
const router = express.Router()
const Item = require('./Item.js');

mongoose.set('runValidators', true);
mongoose.set('setDefaultsOnInsert', true);
// mongoose.set('debug', true);
//Read all items
router.route('/').get(async(req, res)=>{
    Item.find({}).sort({rating: -1, price: 1, name: 1}).then(function(data) {
     
            res.json(data)
            res.send(data)
            res.render(data)
            res.status(200)
    }).catch(function(err){
        // console.log(err);
    })
})

//add items 
router.route("/insertItems").post(async(req, res)=>{

    Item.find({name: req.body.name}, {desc: req.body.desc}, {price: req.body.price}).then(function(data){
        console.log(data)
        if(data.length > 0)
        {
            console.log("Item exists")
            // Item.findOneAndUpdate({name: req.body.name, desc: req.body.desc, price: req.body.price, rating: req.body.rating}, {quantity: ++data.length}).then((result)=>{console.log(result)}).catch((err)=>{console.error(err)})
        }
        else {
            Item.create({name: req.body.name, desc: req.body.desc, price: req.body.price}).then((result)=>{console.log(result)}).catch((err)=>{console.error(err)})
        }
    }).catch(function(err){
        // console.log(err);
    })
    
})

//delete items
router.route("/deleteItems/:id").delete(async(req, res)=>{
   Item.deleteOne({_id: req.params.id}).then((result)=>{console.log(result)}).catch((err)=>{console.error(err)})
})

//update rating
router.route("/increaseRating/:id").put(async(req, res)=>{
   Item.updateOne({_id: req.params.id}, {$inc: {rating: 1}}).then((result)=>{console.log(result)}).catch((err)=>{console.error(err)})
})

router.route("/decreaseRating/:id").put(async(req, res)=>{
    Item.updateOne({_id: req.params.id}, {$inc: {rating:-1}}).then((result)=>{console.log(result)}).catch((err)=>{console.error(err)})
})

module.exports = router