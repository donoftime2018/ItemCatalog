const mongoose = require('mongoose')
const express = require('express');
const router = express.Router()
const User = require("./User")
const Item = require("./Item")

router.route("/").post((req, res) => {
    User.find({username: req.body.loggedInUser}).then(function(data) {
        console.log(req.body)
        console.log(data)
        if(data.length===1)
        {
            res.json(data).status(200).send()
        }
        // console.log("User not found :/")
    })
})

router.route("/getPostedItems").post((req, res) => {
    Item.find({poster: req.body.loggedInUser}).then(function (data) {
        console.log(req.body)
        console.log(data)
        if(data.length>0)
        {
            res.json(data).status(200).send()
        }
        // res.json(data).status(200).send()
    })
})
router.route("/getLikedItems").post((req, res) => {
    Item.find({usersRated: req.body.loggedInUser}).then(function (data) {
        console.log(req.body)
        console.log(data)
        if(data.length>0)
        {
            res.json(data).status(200).send()
        }
    })
})

module.exports = router;