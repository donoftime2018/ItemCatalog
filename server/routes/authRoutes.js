const mongoose = require('mongoose')
const express = require('express');
const app = express()
const bcrypt = require('bcryptjs')
const User = require("../schemas/User");
const Item = require("../schemas/Item")

mongoose.set('setDefaultsOnInsert', true);

app.post("/login", async (req, res) => {
    let name = req.body.name
    let pwd = req.body.pwd

    try {
        let findUser = await User.find({username: name})
        console.log(findUser)
        if (findUser.length>0)
        {
            console.log(pwd)
            console.log(findUser[0].password)

            let matches = await bcrypt.compare(pwd, findUser[0].password)
            console.log(matches)
            if (matches)
            {
                res.status(200).json(findUser)
            }

            else {
                res.status(400).send({msg: "Password incorrect"})
            }
        }
        else {
            res.status(400).send({msg: "Invalid username or password"})
        }
    } catch(err) {
        console.log(err)
        res.status(400).send({msg: err})
    }

})

app.post("/register", async(req, res) => {
    let name = req.body.name
    let pwd = req.body.pwd
    let email = req.body.email

    try {
        let newUser = await User.create({username: name, password: pwd, email: email})
        console.log(newUser)
        if (newUser)
        {
            res.status(200).send()
        }
    } catch(err) {
        console.log(err)
        res.status(400).send({msg: err})
    }
    
})

app.put("/updatePassword", async(req, res) => {
    let name = req.body.name
    let pwd = req.body.pwd

    try {
        let findUser = await User.find({username: name})
        console.log(findUser)
        if(findUser.length>0)
        {
            let findPwd = await User.find({password: pwd})
            console.log(findPwd)

            let matches = await bcrypt.compare(pwd, findUser[0].password)
            console.log(matches)
            
            if (matches)
            {
                res.status(400).send({msg: "The password you entered is in use"})
            }
          
            let updatedPwd = await User.updateOne({username: name}, {password: pwd})
            console.log(updatedPwd)
            res.status(200).send()
        }

        else
        {
            res.status(400).send({msg: name + " is not a registered user"})
        }
    } catch(err)
    {
        console.log(err)
        res.status(400).send({msg: err})
    }
})

app.delete("/deleteUser/:user", async(req, res, next)=>{
    req.user = req.params.user
    next()
}, deletePostedItems, removeLikes, removeUser)

async function deletePostedItems(req, res, next)
{   
    console.log(req.user)
    let postedItems = await Item.deleteMany({poster: req.user})
    console.log(postedItems.deletedCount)
    next()
}

async function removeLikes(req, res, next)
{
    console.log(req.user)
    let checkUserLiked = await Item.find({usersRated: req.user})
    console.log(checkUserLiked.length)

    if (checkUserLiked.length>0)
    {
        let removeLikes = await Item.updateMany({usersRated: req.user}, 
            {$inc: {rating: -1}, 
            $pull: {usersRated: req.user}}, 
            {new: true, upsert: true, runValidators: true})
        console.log(removeLikes)
    }
    next()
}

async function removeUser(req, res)
{
    console.log(req.user)
    let deleteUser = await User.deleteOne({username: req.user})
    console.log(deleteUser)
    res.status(200).send()
}
module.exports = app;
