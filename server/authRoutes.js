const mongoose = require('mongoose')
const express = require('express');
const router = express.Router()
const User = require("./User");
const Item = require("./Item")


router.route("/login").post(async(req, res) => {
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
        let findUser = await User.find({username: name, password: pwd})
        // console.log(findUser)
        if (findUser.length>0)
        {
            res.status(200).json(findUser)
        }
        else {
            res.status(400).send({msg: "Invalid username or password"})
        }
    } catch(err) {

    }

})

router.route("/register").post(async(req, res) => {
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

    }
    
})

router.route("/updatePassword").put(async(req, res) => {
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
                let updatedPwd = await User.updateOne({username: name, password: pwd})
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

router.route("/deleteUser/:user").delete(async(req, res, next)=>{
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

async function deleteUser(req, res)
{
    console.log(req.user)
    let deleteUser = await User.deleteOne({username: req.user})
    console.log(deleteUser)
    res.status(200).send()
}



router.use(deletePostedItems)
router.use(removeLikes)
router.use(deleteUser)
module.exports = router;
