const mongoose = require('mongoose')
const express = require('express');
const router = express.Router()
const User = require("./User")
const Item = require("./Item")

router.route("/getProfileInfo").get((req, res) => {
    User.find({username: req.body.user}).then((data)=>{
        res.json(data).status(200).send()
    })
})

router.route("/getPostedItems").get((req, res) => {
    Item.find({poster: req.body.user, name: 1}).then((data)=>{
        res.json(data).status(200).send()
    })
})
router.route("/getLikedItems").get((req, res) => {
    Item.find({usersRated: req.body.user, name: 1}).then((data)=>{
        res.json(data).status(200).send()
    })
})

module.exports =router