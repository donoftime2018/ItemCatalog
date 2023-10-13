const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const itemRoute = require("./routes.js")
const userRoute = require("./authRoutes.js")
// const profileRoute = require("./profileRoutes.js")
const app = express()


mongoose.connect('mongodb://127.0.0.1/items').then(()=>{console.log("Connected!")}).catch((err)=>{console.error(err)})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use("/items", itemRoute)
app.use(userRoute)
// app.use("/userProfile", profileRoute)

const port = 4000

app.listen(port, ()=>{
    console.log("Connected to port " + port)
})

