const mongoose = require('mongoose')
const express = require('express');
const router = express.Router()
const Item = require('./Item.js');

const app = express()

// function checkDuplicateRaters(req, res, next)
// {

// }

// app.use(checkDuplicateRaters)

mongoose.set('setDefaultsOnInsert', true);
// mongoose.set('debug', true);

//Read all items
router.route('/').get(async(req, res)=>{
    Item.find({}).sort({rating: -1, price: 1, name: 1}).then(function(data) {
     
            // res.json(data)
            res.json(data).status(200).send()
    }).catch(function(err){
        // console.log(err);
    })
})

router.route("/getPostedItems").post(async(req, res)=>{
    let user = req.body.user;

    Item.find({poster: user}).then(function (data) {
        if(data.length>0)
        {
            res.json(data).status(200).send()
        }
    }).catch(function(error) {console.error(error)})

})

router.route("/getLikedItems").post((req, res) => {
    let user = req.body.user
    Item.find({usersRated: user}).then(function (data) {
        // console.log(req.body)
        // console.log(data)
        if(data.length>0)
        {
            res.json(data).status(200).send()
        }
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
            console.log("Item exists")
            // Item.findOneAndUpdate({name: req.body.name, desc: req.body.desc, price: req.body.price, rating: req.body.rating}, {quantity: ++data.length}).then((result)=>{console.log(result)}).catch((err)=>{console.error(err)})
        }
        else {
            Item.create({name: req.body.name, desc: req.body.desc, price: req.body.price, poster: req.body.user}).then(
                (result)=>{
                console.log(result); 
                res.status(200).send()}).catch((err)=>{console.error(err)})
        }
    }).catch(function(err){
        // console.log(err);
    })
    
})

//delete items
router.route("/deleteItems/:id").delete(async(req, res)=>{
   Item.deleteOne({_id: req.params.id}).then((result)=>{console.log(result); res.status(200).send()}).catch((err)=>{console.error(err)})
})

//update rating
router.route("/increaseRating/:id").put(async(req, res, next)=>{
    // const validator = {upsert: true, new: true};
//    Item.findOneAndUpdate({_id: req.params.id}, {$inc: {rating: 1}}, {new: true}).then((result)=>{
//     // console.log(result)
//     return result.validate().then(()=>result)
// }).then(
//     (validatedDoc)=>{return validatedDoc.save()}
//     ).then(
//         (savedDoc)=>{console.log(savedDoc)}
//         ).catch(
//             (err)=>{console.error(err)
//             })

Item.findOne({_id: req.params.id}).then((doc)=>{
    doc.rating+=1
    return doc.validate().then(()=>doc)
}).then((validatedDoc)=>{
    if(validatedDoc.usersRated.includes(req.body.user))
    {
        console.log("You already rated for this item!")
    }

    else if (validatedDoc.poster === req.body.user)
    {
        console.log("You cannot rate for an item you posted")
    }
    else {
        return Item.findOneAndUpdate({_id: req.params.id}, 
            {rating: validatedDoc.rating, $addToSet: {usersRated: req.body.user}}, 
            {new: true, upsert: true, runValidators: true}).then((updatedDoc)=>{
                console.log(updatedDoc);
                res.status(200).send()})
    }
}).then(()=>{
    // console.log("Flop")
}).catch(err=>{console.error(err)})

})

router.route("/decreaseRating/:id").put(async(req, res, next)=>{
    // const validator = {upsert: true, new: true};
    // Item.findOneAndUpdate({_id: req.params.id}, {$inc: {rating:-1}}, {new: true}).then((result)=>{
    //     // console.log(result)
    //     return result.validate().then(()=>result)
    // }).then(
    //     (validatedDoc)=>{return validatedDoc.save()}
    //     ).then(
    //         (savedDoc)=>{console.log(savedDoc)}
    //         ).catch(
    //             (err)=>{console.error(err)
    //             })

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
            console.log("You cannot rate for an item you posted")
        }
        else
        {
            console.log("You haven't even rated this item yet dude!");
        }
    }).then(()=>{
    //    console.log("Flop")
    }).catch(err=>{console.error(err)})
})

module.exports = router