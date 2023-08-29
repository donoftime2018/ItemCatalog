const mongoose = require('mongoose')
const express = require('express');
const router = express.Router()
const Item = require('./Item.js');

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

    Item.find({$or: [
        {name: req.body.name, desc: req.body.desc, price: req.body.price},
        {name: req.body.name, desc: req.body.desc},
        {name: req.body.name, price: req.body.price},
        {name: req.body.name}
    ]
    }).then(function(data){
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
    return Item.findOneAndUpdate({_id: req.params.id}, {rating: validatedDoc.rating}, {new: true, runValidators: true})
}).then((updatedDoc)=>{
    console.log(updatedDoc)
}).catch(err=>{console.error(err)})

})

router.route("/decreaseRating/:id").put(async(req, res)=>{
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
        return Item.findOneAndUpdate({_id: req.params.id}, {rating: validatedDoc.rating}, {new: true, runValidators: true})
    }).then((updatedDoc)=>{
        console.log(updatedDoc)
    }).catch(err=>{console.error(err)})
})

module.exports = router