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

        if (findUser.length>0)
        {
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
        res.status(400).send({msg: err})
    }

})

app.post("/register", async(req, res) => {
    let name = req.body.name
    let pwd = req.body.pwd
    let email = req.body.email
    
    try {
        let findDuplicatePwd = await User.find({}).select("password")
            
        let duplicateFound = false
        for (let i = 0; i < findDuplicatePwd.length; i++)
        {
            duplicateFound = await bcrypt.compare(pwd, findDuplicatePwd[i].password)
            if (duplicateFound===true)
            {
                break;
            }
        }

        if (duplicateFound===true)
        {
            res.status(400).send({msg: "Password is in use"})
        }

        else
        {
            let newUser = await User.create({username: name, password: pwd, email: email})
            if (newUser)
            {
                res.status(200).send()
            }
        }
    } catch(err) {
        res.status(400).send({msg: err})
    }
    
})

app.put("/updatePassword", async(req, res) => {
    let name = req.body.name
    let pwd = req.body.pwd
    
    try {
        let findUser = await User.find({username: name})
        if(findUser.length>0)
        {
            let findDuplicatePwd = await User.find({}).select("password")
            
            let duplicateFound = false
            for (let i = 0; i < findDuplicatePwd.length; i++)
            {
                duplicateFound = await bcrypt.compare(pwd, findDuplicatePwd[i].password)
                if (duplicateFound===true)
                {
                    res.status(400).send({msg: "Password is in use"})
                    break;
                }
            }
            
            let updatedPwd = await User.updateOne({username: name}, {password: pwd})
            res.status(200).send()
        }

        else
        {
            res.status(400).send({msg: name + " is not a registered user"})
        }
    } catch(err)
    {
        res.status(400).send({msg: err})
    }
})

app.delete("/deleteUser/:user", async(req, res, next)=>{
    req.user = req.params.user
    next()
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
    res.status(200).send()
}
module.exports = app;
