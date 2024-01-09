const mongoose = require('mongoose')
const express = require('express');
const app = express()
const bcrypt = require('bcrypt')
const User = require("../schemas/User");
const Item = require("../schemas/Item")

mongoose.set('setDefaultsOnInsert', true);

app.post("/login", async (req, res) => {
    let name = req.body.name
    let pwd = req.body.pwd

    // User.find({username: name, password: pwd}).then(function(data){
    //     console.log(data)
    //     console.log(name + " " + pwd)
    //     if(data.length>0){
    //         res.json(data).status(200).send()
    //     }
    //     else if (data.length===0){
    //         console.log("Can't find user " + name) 
    //         res.status(400).send({msg: "Invalid username or password"});
    //     }
    // }).catch(function(error) {console.error(error)})

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
        // res.status(400).send(err)
    }

})

app.post("/register", async(req, res) => {
    let name = req.body.name
    let pwd = req.body.pwd
    let email = req.body.email

    // User.find({$or: [
    //         {username: name, password: pwd, email: email},
    //         {username: name},
    //         {password: pwd},
    //         {email: email}
    //     ]}).then(
    //     function(data){
    //         console.log(name + " " + pwd + " " + email)
    //         console.log(data)
    //         if(data.length>0)
    //         {
    //             console.log("User already exists")
    //             res.status(400).send({msg: name + " already exists!"})
    //         }
    //         else {
    //             User.create({username: name, password: pwd, email: email}).then((result)=>{
    //                 console.log(result); 
    //                 res.status(200).send()}).catch((err)=>{console.error(err)})
    //         }
    //     }
    // ).catch(function(error) {console.error(error)})

    try {
        let findUser = await User.find({$or: [
            {username: name, password: pwd, email: email},
            {username: name},
            {password: pwd},
            {email: email}
        ]})
        console.log(findUser)
    if (findUser.length>0)
    {  
        res.status(400).send({msg: "Username, password, or email already in use!"})
    }

    else {
        let newUser = await User.create({username: name, password: pwd, email: email})
        console.log(newUser)
        if (newUser)
        {
            res.status(200).send()
        }
    }
    } catch(err) {
        console.log(err)
        // res.status(400).send(err)
        // res.status(400).send(err.errors.password)
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

            if (findPwd.length===0)
            {
                let updatedPwd = await User.updateOne({username: name}, {password: pwd})
                console.log(updatedPwd)
                if (updatedPwd)
                {
                    res.status(200).send()
                }
            }

            else {
                res.status(400).send({msg: "The password you entered is in use"})
            }
            
        }

        else
        {
            res.status(400).send({msg: name + " is not a registered user"})
        }
    } catch(err)
    {
        console.log(err)
        res.status(400).send({msg: err})
        // res.status(400).send(err)
    }
    

    // User.find({username: name}).then(
    //     function(data){
    //         console.log(data)
    //         if(data.length>0)
    //         {
    //             User.find({password: pwd}).then((function(data){
    //                 console.log(data);
    //                 if(data.length===0)
    //                 {   User.updateOne({username: name, password: pwd}).then(function(docs){
    //                         console.log(docs);
    //                         res.status(200).send()
    //                     }).catch((err)=>{console.error(err)})
    //                 }
    //                 else {
    //                     console.log(pwd + " exists in db")
    //                     res.status(400).send({msg: "The password you entered is in use"})
    //                 }
    //             }))
    //         }
    //         else {
    //             res.status(400).send({msg: name + " is not a registered user"})
    //         }
    // })
})

app.delete("/deleteUser/:user", async(req, res, next)=>{
    req.user = req.params.user
    next()
})

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

async function removeBookmarks(req, res, next)
{
    console.log(req.user)
    let checkUserBookmarked = await Item.find({usersBookmarked: req.user})
    console.log(checkUserBookmarked.length)

    if (checkUserBookmarked.length>0)
    {
        let removeBookmarks = await Item.updateMany({usersBookmarked: req.user}, 
            {$pull: {usersBookmarked: req.user}}, 
            {new: true, upsert: true})
        console.log(removeBookmarks)
    
    }
    next()
}

async function deleteUser(req, res)
{
    console.log(req.user)
    let deleteUser = await User.deleteOne({username: req.user})
    console.log(deleteUser)
    res.status(200).send()
}



app.use(deletePostedItems)
app.use(removeLikes)
app.use(removeBookmarks)
app.use(deleteUser)
module.exports = app;
