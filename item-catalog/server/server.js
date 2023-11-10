const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const itemRoute = require("./routes.js")
const userRoute = require("./authRoutes.js")
const app = express()
require('dotenv').config()

const corsOption = {
    origin: "http://localhost:3000"
}

const connectDB = async() => {
    await mongoose.connect("mongodb://localhost:27017/items").then(()=>{console.log("Connected!")}).catch((err)=>{console.error(err)})
}
connectDB()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors(corsOption))
app.use("/items", itemRoute)
app.use(userRoute)

const port = 4000

app.listen(port, ()=>{
    console.log("Connected to port " + port)
})

