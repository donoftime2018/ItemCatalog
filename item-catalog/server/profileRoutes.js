const mongoose = require('mongoose')
const express = require('express');
const router = express.Router()
const User = require("./User")
const Item = require("./Item")

router.route("/getCredentials").post((req, res) => {
    let user = req.body.loggedInUser
    User.find({username: user}).then(function(data) {
        // console.log(req.body)
        // console.log(data)
        if(data.length>0)
        {
            res.json(data).status(200).send()
        }
        // console.log("User not found :/")
    }).catch(function(error) {console.error(error)})
})

router.route("/getPostedItems").post((req, res) => {
    let user = req.body.loggedInUser
    Item.find({poster: user}).then(function (data) {
        // console.log(req.body)
        // console.log(data)
        if(data.length>0)
        {
            res.json(data).status(200).send()
        }
        // res.json(data).status(200).send()
    }).catch(function(error) {console.error(error)})
})
router.route("/getLikedItems").post((req, res) => {
    let user = req.body.loggedInUser
    Item.find({usersRated: user}).then(function (data) {
        // console.log(req.body)
        // console.log(data)
        if(data.length>0)
        {
            res.json(data).status(200).send()
        }
    }).catch(function(error) {console.error(error)})
})

module.exports = router;