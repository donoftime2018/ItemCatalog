const mongoose = require('mongoose')
const express = require('express');
const app = express()
const bcrypt = require('bcryptjs')
const User = require("../schemas/User");
const Item = require("../schemas/Item")
const jsonwebtoken = require("jsonwebtoken")
const sendMail = require('./mailing')

mongoose.set('setDefaultsOnInsert', true);

app.post("/login", async (req, res) => {
    let name = req.body.name
    let pwd = req.body.pwd
   
    try {
        let findUser = await User.findOne({$or: [{username: name}, {email: name}]})
  
        if (findUser)
        {
            let matches = await bcrypt.compare(pwd, findUser.password)
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
            sendMail(newUser.email, "<h1>Thank you for registering for Put a Price On It!</h1> <p>We hope you have an enjoyable time using our site!</p>", "Welcome to Put a Price On It!")
            res.status(200).send()
        }
    } catch(err) {
        res.status(400).send({msg: err})
    }
    
})

app.post("/resetPasswordLink", async (req, res) => {
    let email = req.body.email
    console.log(email)
    console.log(process.env.JWT_SECRET)
    
    try
    {
        const findUser = await User.findOne({email: email})
        console.log(findUser)
        if (!findUser)
        {
            res.status(404).send({msg: "No such user with the email " + email + " exists"})
        }
        else
        {
            const token = jsonwebtoken.sign({userId: findUser._id}, process.env.JWT_SECRET, {expiresIn: '10m'})
            console.log(token)
            sendMail(email, '<a href=http://localhost:3000/updatePassword/${token}>Click here to reset your password.</a> <p>The link expires in 10 minutes.</p>', "Reset Password")
            res.status(200).send()
        }
    } catch(err) {
        res.status(400).send({msg: err})
    }
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
                sendMail(findUser[0].email, "<p>Your password for Put a Price On It! has been updated.</p>", "Password Updated")
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
    let findUser = await User.findOne({username: user})
    let checkPwdMatch = await bcrypt.compare(pwd, findUser.password)
    try
    {
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
    } 
    catch(err)
    {
        res.status(400).send({msg: err})
    }
  
}, deletePostedItems, removeLikes, removeUser)

async function deletePostedItems(req, res, next)
{   
    let postedItems = await Item.deleteMany({poster: req.user})
    next()
}

async function removeLikes(req, res, next)
{
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
    let deleteUser = await User.deleteOne({username: req.user})
    sendMail(req.email, "<h1>Thank you for using Put a Price On It!</h1><p>We're sorry to see you go. We hope your stay with us was a good one.</p>", "Put a Price On It! Account Deleted")
    res.status(200).send()
}
module.exports = app;
