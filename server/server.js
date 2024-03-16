const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const itemRoute = require("./routes/routes.js")
const userRoute = require("./routes/authRoutes.js")
const app = express()
require('dotenv').config()

// const corsOption = {
//     origin: "http://localhost:3000"
// }

mongoose.connect("mongodb://127.0.0.1/items").then(()=>{console.log("Connected!")}).catch((err)=>{console.error(err)})
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use("/items", itemRoute)
app.use(userRoute)


const port = process.env.PORT | 4000

app.listen(port, ()=>{
    console.log("Connected to port " + port)
})

