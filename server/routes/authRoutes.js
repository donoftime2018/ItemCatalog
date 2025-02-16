const mongoose = require('mongoose')
const express = require('express');
const app = express()
const bcrypt = require('bcryptjs')
const User = require("../schemas/User");
const Item = require("../schemas/Item")
const jwt = require("jsonwebtoken")
const sendMail = require('./mailing')

mongoose.set('setDefaultsOnInsert', true);

app.post("/login", async (req, res) => {
    let name = req.body.name
    let pwd = req.body.pwd

    if (new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "i").test(name))
    {
        name = name.toLowerCase()
    }

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

    email = email.toLowerCase()

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
    
    try
    {
        const findUser = await User.findOne({email: email})
        
        if (!findUser)
        {
            res.status(404).send({msg: "No such user with the email " + email + " exists"})
        }
        else
        {
            const token = jwt.sign({userId: findUser._id}, process.env.JWT_SECRET, {expiresIn: '10m'})
            sendMail(email, `<a href="${process.env.HOSTED_CLIENT}/updatePassword/${token}">Click here to reset your password.</a> <p>The link expires in 10 minutes.</p>`, "Reset Password")
            res.status(200).send()
        }
    } catch(err) {
        res.status(400).send({msg: err})
    }
})

app.put("/updatePassword/:token", async(req, res) => {
    let pwd = req.body.pwd
    let token = req.params.token

    
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if(decodedToken)
        {
            let findUser = await User.findOne({_id: decodedToken.userId})
            let pwdInUse = await bcrypt.compare(pwd, findUser.password)

            if (pwdInUse === true)
            {
                res.status(400).send({msg: "You are already using this password"})
            }
            else
            {
                let updatedPwd = await User.updateOne({_id: decodedToken.userId}, {password: pwd})
                sendMail(findUser.email, "<p>Your password for Put a Price On It! has been updated.</p>", "Password Updated")
                res.status(200).send()
            }
        }

        else
        {
            res.status(400).send({msg: "Invalid token"})
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
