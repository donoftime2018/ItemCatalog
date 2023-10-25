const mongoose = require('mongoose')
const express = require('express');
const router = express.Router()
const Item = require('./Item.js');

mongoose.set('setDefaultsOnInsert', true);

//Read all items
router.route('/').get(async(req, res)=>{
    Item.find({}).sort({rating: -1, price: 1, name: 1}).then(function(data) {
            res.json(data).status(200).send()
    }).catch(function(err){
        
    })
})

router.route("/getPostedItems").post(async(req, res)=>{
    let user = req.body.user;

    Item.find({poster: user}).sort({updatedAt: -1}).limit(5).then(function (data) {
        res.json(data).status(200).send()
        
    }).catch(function(error) {console.error(error)})

})

router.route("/numPostedItems").post(async(req, res)=>{

    try {
        let user = req.body.user;
        const count = await Item.countDocuments({poster: user});
        res.json(count).status(200).send()
    } catch (error) {
        console.error(error)
    }

})

router.route("/numLikedItems").post(async(req, res)=>{

    try {
        let user = req.body.user;
        const count = await Item.countDocuments({usersRated: user});
        res.json(count).status(200).send()
    } catch(error){
        console.error(error)
    }
})

router.route("/mostPopularItems").post(async(req, res)=>{
    let user = req.body.user;

    Item.find({poster: user}).sort({rating: -1, updatedAt: -1}).limit(5).then(function(data) {
        res.json(data).status(200).send()
    }).catch(function(error) {console.error(error)})
})

router.route("/getLikedItems").post((req, res) => {
    let user = req.body.user
    Item.find({usersRated: user}).sort({updatedAt: -1}).limit(5).then(function (data) {
         res.json(data).status(200).send()
        
    }).catch(function(error) {console.error(error)})
})

//add items 
router.route("/insertItems").post(async(req, res)=>{

    Item.find({$or: [
        {name: req.body.name, desc: req.body.desc, price: req.body.price},
        {name: req.body.name, desc: req.body.desc},
        {name: req.body.name, price: req.body.price},
        {name: req.body.name}
    ]
    }).then(function(data){
        console.log(req.body)
        console.log(data)
        if(data.length > 0)
        {
            console.log("Item exists");
            res.status(400).send({msg: req.body.name + " already exists"});
            
        }
        else {
            Item.create({name: req.body.name, desc: req.body.desc, price: req.body.price, poster: req.body.user}).then(
                (result)=>{
                console.log(result); 
                res.status(200).send()}).catch((err)=>{console.error(err)})
        }
    }).catch(function(err){
        console.error(err)
    })
    
})

//delete items
router.route("/deleteItems/:id").delete(async(req, res)=>{
   Item.deleteOne({_id: req.params.id}).then((result)=>{console.log(result); res.status(200).send()}).catch((err)=>{console.error(err)})
})

//update rating
router.route("/increaseRating/:id").put(async(req, res, next)=>{
    Item.findOne({_id: req.params.id}).then((doc)=>{
        doc.rating+=1
        return doc.validate().then(()=>doc)
    }).then((validatedDoc)=>{
        if(validatedDoc.usersRated.includes(req.body.user))
        {
            console.log("You already rated for this item!");
            res.status(400).send({msg: 'You already rated for this item!'});
        }

        else if (validatedDoc.poster === req.body.user)
        {
            console.log("You cannot rate for an item you posted");
            res.status(400).send({msg: 'You cannot rate for an item you posted'});
        }
        else {
            return Item.findOneAndUpdate({_id: req.params.id}, 
                {rating: validatedDoc.rating, $addToSet: {usersRated: req.body.user}}, 
                {new: true, upsert: true, runValidators: true}).then((updatedDoc)=>{
                    console.log(updatedDoc);
                    res.status(200).send()})
        }
}).catch(err=>{console.error(err)})

})

router.route("/decreaseRating/:id").put(async(req, res, next)=>{

    Item.findOne({_id: req.params.id}).then((doc)=>{
        doc.rating-=1
        return doc.validate().then(()=>doc)
    }).then((validatedDoc)=>{
        if(validatedDoc.usersRated.includes(req.body.user))
        {
            return Item.findOneAndUpdate({_id: req.params.id}, 
                {rating: validatedDoc.rating, 
                $pull: {usersRated: req.body.user}}, 
                {new: true, upsert: true, runValidators: true}).then((updatedDoc)=>{
                    console.log(updatedDoc);
                    res.status(200).send()
                })
        }
        else if (validatedDoc.poster === req.body.user)
        {
            console.log("You cannot rate for an item you posted");
            res.status(400).send({msg: 'You cannot rate for an item you posted'});
        }
        else
        {
            console.log("You haven't even rated this item yet!");
            res.status(400).send({msg: "You haven't even rated this item yet!"});
        }
    }).catch(err=>{console.error(err)})
})

module.exports = router