const mongoose = require('mongoose')
const express = require('express');
const app = express();
const multer = require('multer');
const {v4: uuidv4} = require('uuid')
const path = require('path')
const Item = require('../schemas/Item.js');

mongoose.set('setDefaultsOnInsert', true);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../uploads/')
    },

    filename: function(req, file, cb){
        cb(null, uuidv4()+'-'+Date.now()+path.extname(file.originalname))
    }   
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']

    if (allowedTypes.includes(file.mimetype))
    {
        cb(null, true)
    }

    else
    {
        cb(null, false)
    }
}

let upload = multer({storage, fileFilter})

app.get("/", async(req, res)=>{

    try {
        let allItems = await Item.find({}).sort({ rating: -1, price: 1, name: 1})
        res.status(200).json(allItems)
    } catch (err) {
        res.status(400).send({msg: err})
    }
})

app.post("/getPostedItems", async(req, res)=>{
    let user = req.body.user;
    try {
        let itemsPosted = await Item.find({poster: user}).select("name").sort({updatedAt: -1}).limit(5)
        res.status(200).json(itemsPosted)
    } catch(err){
        res.status(400).send({msg: err})
    }
})

app.post("/numPostedItems", async(req, res)=>{

    let user = req.body.user;
    try {
        const count = await Item.countDocuments({poster: user});
        res.status(200).json(count)
    } catch (error) {
        res.status(400).send({msg: err})
    }

})

app.post("/numLikedItems", async(req, res)=>{

    let user = req.body.user;

    try {
        const count = await Item.countDocuments({usersRated: user});
        res.status(200).json(count)
    } catch(error){
        res.status(400).send({msg: err})
    }
})

app.post("/mostPopularItems", async(req, res)=>{

    let user = req.body.user;
    try {
        let popularItems = await Item.find({poster: user, rating: {$gte: 1}}).select("name rating").sort({rating: -1, updatedAt: -1}).limit(5)
        res.status(200).json(popularItems)
    } catch(err) {
        res.status(400).send({msg: err})
    }
})

app.post("/getLikedItems", async(req, res) => {

    let user = req.body.user
    
    try {
        let likedItems = await Item.find({usersRated: user}).select("name").sort({updatedAt: -1}).limit(5)
        res.status(200).json(likedItems)
    } catch(err){
        res.status(400).send({msg: err})
    }
})



app.post("/insertItems", upload.single('image'), async(req, res)=>{
    const itemName = req.body.name
    const itemDesc = req.body.desc
    const itemSiteOrLink = req.body.website
    const itemPrice = req.body.price
    const itemPoster = req.body.user
    const itemImage = req.file ? req.file.filename : null

    console.log(itemImage)

    try {
        let newItem = await Item.create({name: itemName, 
            desc: itemDesc, website: itemSiteOrLink, price: itemPrice, poster: itemPoster, image: itemImage})
        if (newItem)
        {
            res.status(200).send()
        }
    } catch(err)
    {
        res.status(400).send({msg: err})
    }
  
    
})

app.delete("/deleteItems/:id", async(req, res)=>{
   Item.deleteOne({_id: req.params.id}).then((result)=>{console.log(result); res.status(200).send()}).catch((err)=>{
    res.status(400).send({msg: err})
    })
})


app.put("/increaseRating/:id", async(req, res, next)=>{

    Item.findOne({_id: req.params.id}).then((doc)=>{
        doc.rating+=1
        return doc.validate().then(()=>doc)
    }).then((validatedDoc)=>{
        if(validatedDoc.usersRated.includes(req.body.user))
        {
            res.status(400).send({msg: 'You already rated for this item!'});
        }

        else if (validatedDoc.poster === req.body.user)
        {
            res.status(400).send({msg: 'You cannot rate for an item you posted'});
        }
        else {
            return Item.findOneAndUpdate({_id: req.params.id}, 
                {rating: validatedDoc.rating, $addToSet: {usersRated: req.body.user}}, 
                {new: true, upsert: true, runValidators: true}).then((updatedDoc)=>{
                    res.status(200).send()})
        }
    }).catch(err=>{
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
            res.status(400).send({msg: err})
    })
})

module.exports = app