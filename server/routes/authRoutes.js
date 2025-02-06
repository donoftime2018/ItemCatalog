const mongoose = require('mongoose')
const express = require('express');
const app = express()
const bcrypt = require('bcryptjs')
const User = require("../schemas/User");
const Item = require("../schemas/Item")
const sendMail = require('./mailing')

mongoose.set('setDefaultsOnInsert', true);

app.post("/login", async (req, res) => {
    let name = req.body.name
    let pwd = req.body.pwd
   
    try {
        let findUser = await User.find({$or: [{username: name}, {email: name}]})
  
        if (findUser.length>0)
        {
            let matches = await bcrypt.compare(pwd, findUser[0].password)
            if (matches)
            {
                res.status(200).json(findUser)
            }

            else {
                res.status(400).send({msg: "Incorrect password and username combination"})
            }
        }
        else {
            res.status(400).send({msg: name + " is not a registered user."})
        }
    } catch(err) {
        res.status(400).send({msg: err})
    }

})

app.post("/register", async(req, res) => {
    let name = req.body.name
    let pwd = req.body.pwd
    let email = req.body.email
    let birthdate = new Date(req.body.birthdate)

    try {
        let newUser = await User.create({username: name, password: pwd, email: email, birthdate: birthdate})
        if (newUser)
        {
            sendMail(newUser.email, "Thank you for registering for Put a Price On It!", "Welcome to Put a Price On It!")
            res.status(200).send()
        }
    } catch(err) {
        res.status(400).send({msg: err})
    }
    
})

app.post("/resetPasswordLink", async (req, res) => {
    let email = req.body.email
    console.log(email)
    console.log(process.env.REACT_APP_LOCAL_HOST)
    console.log(process.env.REACT_APP_SERVER_URL)

})

app.put("/updatePassword", async(req, res) => {
    let email = req.body.email
    let pwd = req.body.pwd
    
    try {
        let findUser = await User.find({email: email})
        if(findUser.length>0)
        {
            let allPasswords = await User.findOne({email: email}).select("password")
            let pwdInUse = await bcrypt.compare(pwd, allPasswords.password)

            if (pwdInUse === true)
            {
                res.status(400).send({msg: "You are already using this password"})
            }
            else
            {
                let updatedPwd = await User.updateOne({email: email}, {password: pwd})
                sendMail(findUser[0].email, "Your password for Put a Price On It! has been updated.", "Password Updated")
                res.status(200).send()
            }
        }

        else
        {
            res.status(400).send({msg:  email + " is not an email associated with a registered user"})
        }
    } catch(err)
    {
        res.status(400).send({msg: err})
    }
})

app.delete("/deleteUser", async(req, res, next)=>{
    let pwd = req.body.password
    let user = req.body.user
    console.log(user + ", " + pwd)
    let findUser = await User.findOne({username: user})
    let checkPwdMatch = await bcrypt.compare(pwd, findUser.password)
 
    if (checkPwdMatch)
    {
        req.user = findUser.username
        req.email = findUser.email
        next()
    }
    else
    {
        res.status(400).send({msg: "Password incorrect"})
    }

    next()
}, deletePostedItems, removeLikes, removeUser)

async function deletePostedItems(req, res, next)
{   
    console.log(req.user)
    let postedItems = await Item.deleteMany({poster: req.user})
    next()
}

async function removeLikes(req, res, next)
{
    console.log(req.user)

    let checkUserLiked = await Item.find({usersRated: req.user})

    if (checkUserLiked.length>0)
    {
        let removeLikes = await Item.updateMany({usersRated: req.user}, 
            {$inc: {rating: -1}, 
            $pull: {usersRated: req.user}}, 
            {new: true, upsert: true, runValidators: true})
    }
    next()
}

async function removeUser(req, res)
{
    console.log(req.user)
    console.log(req.email)
    sendMail(req.email, "We're sorry to see you go. We hope your stay with us was a good one.", "Put a Price On It! Account Deleted")
    res.status(200).send()
}
module.exports = app;
