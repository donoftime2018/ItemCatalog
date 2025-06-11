const mongoose = require('mongoose')
const express = require('express');
const app = express();
const multer = require('multer');
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const Item = require('../schemas/Item.js');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

mongoose.set('setDefaultsOnInsert', true);



const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },

    filename: function(req, file, cb){
        cb(null, uuid.v4()+'-'+Date.now()+path.extname(file.originalname))
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

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//             folder: '/uploads'
//     }
// })

let upload = multer({storage})

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

    console.log(itemName, itemDesc, itemSiteOrLink, itemPrice, itemPoster, itemImage)
    try {

        // const cloudinaryRes = await cloudinaryConfig.uploader.upload(itemImage.path, {
        //     folder: 'uploads'
        // })

        // console.log(cloudinaryRes)

        // const fileURL = cloudinaryRes.url(cloudinaryRes.public_id, {
        //     secure: true,
        //     resource_type: 'raw'
        // })

        // console.log(fileURL)

        // fs.unlink(itemImage.path, (err)=>{
        //     if (err)
        //     {
        //         res.status(400).send({msg: err})
        //     }
        // })

        let newItem = await Item.create({name: itemName, 
            desc: itemDesc, website: itemSiteOrLink, price: itemPrice, poster: itemPoster, image: fileURL})
        if (newItem)
        {
            res.status(200).send()
        }
        else
        {
            res.status(400).send({msg: "Error adding " + itemName})
        }
    } catch(err)
    {
        res.status(400).send({msg: err})
    }
  
    
})

app.delete("/deleteItems/:id", async(req, res)=>{
    let itemImage = req.body.image
    fs.unlink(`uploads/${itemImage}`, (err)=>{
        if (err)
        {
            res.status(400).send({msg: err})
        }
    })
    Item.deleteOne({_id: req.params.id}).then(()=>{
        res.status(200).send();
    }).catch((err)=>{
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