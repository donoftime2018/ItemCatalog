const mongoose = require('mongoose')
const express = require('express');
const app = express();
const Item = require('../schemas/Item.js');

mongoose.set('setDefaultsOnInsert', true);

app.get("/", async(req, res)=>{

    try {
        let allItems = await Item.find({}).sort({ rating: -1, price: 1, name: 1})
        res.status(200).json(allItems)
    } catch (err) {
        console.error(err)
    }
})

app.get("/getPostedItems/:user", async(req, res)=>{
    let user = req.params.user;

    try {
        let itemsPosted = await Item.find({poster: user}).select("name").sort({updatedAt: -1}).limit(5)
        res.status(200).json(itemsPosted)
    } catch(err){}
})

app.get("/numPostedItems/:user", async(req, res)=>{

    try {
        let user = req.params.user;
        const count = await Item.countDocuments({poster: user});
        res.status(200).json(count)
    } catch (error) {
    }

})

app.get("/numLikedItems/:user", async(req, res)=>{

    try {
        let user = req.params.user;
        const count = await Item.countDocuments({usersRated: user});
        res.status(200).json(count)
    } catch(error){
    }
})

app.get("/mostPopularItems/:user", async(req, res)=>{

    let user = req.params.user;
    try {
        let popularItems = await Item.find({poster: user, rating: {$gte: 1}}).select("name rating").sort({rating: -1, updatedAt: -1}).limit(5)
        res.status(200).json(popularItems)
    } catch(err) {

    }
})

app.get("/getLikedItems/:user", async(req, res) => {

    let user = req.params.user
    try {
        let likedItems = await Item.find({usersRated: user}).select("name").sort({updatedAt: -1}).limit(5)
        res.status(200).json(likedItems)
    } catch(err){

    }
})


app.post("/insertItems", async(req, res)=>{

    try {
        let newItem = await Item.create({name: req.body.name, desc: req.body.desc, price: req.body.price, poster: req.body.user})
        console.log(newItem)
        if(newItem)
        {
            res.status(200).send()
        }
    } catch(err)
    {
        console.log(err);
        res.status(400).send({msg: err})
    }
  
    
})

app.delete("/deleteItems/:id", async(req, res)=>{
   Item.deleteOne({_id: req.params.id}).then((result)=>{console.log(result); res.status(200).send()}).catch((err)=>{
    })
})


app.put("/increaseRating/:id", async(req, res, next)=>{

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
    }).catch(err=>{
        console.log(err)
        res.status(400).send({msg: err})
    })

})

app.put("/decreaseRating/:id", async(req, res, next)=>{

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
    }).catch(err=>{
        console.error(err)
            res.status(400).send({msg: err})
    })
})

module.exports = app