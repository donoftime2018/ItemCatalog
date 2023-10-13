const mongoose = require('mongoose')
const express = require('express');
const router = express.Router()
const User = require("./User")
const Item = require("./Item")

router.route("/getPostedItems").post((req, res) => {
    let user = req.body.user
    Item.find({poster: user}).then(function (data) {
        if(data.length>0)
        {
            res.json(data).status(200).send()
        }
    }).catch(function(error) {console.error(error)})
})

router.route("/getLikedItems").post((req, res) => {
    let user = req.body.user
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