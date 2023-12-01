const mongoose = require('mongoose')
const express = require('express');
const router = express.Router()
const User = require('./User');

router.route("/addToCart/:user").put(async(req, res) => {
    
})

router.route("/numItemsInCart/:user").get(async(req, res) => {
    
})

router.route("/itemsInCart/:user").get(async(req, res) => {

})

module.exports = router