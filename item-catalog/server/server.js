const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const itemRoute = require("./routes.js")
const User = require("./User.js")
const app = express()
const router = express.Router()

mongoose.connect('mongodb://127.0.0.1/items').then(()=>{console.log("Connected!")}).catch((err)=>{console.error(err)})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use("/items", itemRoute)

router.route("/login").post((req, res) => {
    let name = req.body.name
    let pwd = req.body.pwd

    User.find({username: name, password: pwd}).then(function(data){
        console.log(data)
        console.log(name + " " + pwd)
        if(data.length>0){
            res.json(data).status(200).send()
        }
        else {
            console.log("User doesn't exist")
        }
    }).catch(function(error) {console.error(error)})
})

router.route("/register").post((req, res) => {
    let name = req.body.name
    let pwd = req.body.pwd
    let email = req.body.email

    User.find({$or: [
            {username: name, password: pwd, email: email},
            {username: name},
            {password: pwd},
            {email: email}
        ]}).then(
        function(data){
            console.log(name + " " + pwd + " " + email)
            console.log(data)
            if(data.length>0)
            {
                console.log("User already exists")
                // res.status(405).send()
            }
            else {
                User.create({username: name, password: pwd, email: email}).then((result)=>{
                    console.log(result); 
                    res.status(200).send()}).catch((err)=>{console.error(err)})
            }
        }
    ).catch(function(error) {console.error(error)})
})

router.route("/updatePassword").put((req, res) => {
    let name = req.body.name
    let pwd = req.body.pwd

    User.find({username: name}).then(
        function(data){
            console.log(data)
            if(data.length>0)
            {
                User.find({password: pwd}).then((function(data){
                    console.log(data);
                    if(data.length===0)
                    {   User.updateOne({username: name, password: pwd}).then(function(docs){
                            console.log(docs);
                            res.status(200).send()
                        }).catch((err)=>{console.error(err)})
                    }
                    else {
                        console.log(pwd + " exists in db")
                    }
                }))
            }
    })})


app.use(router)

const port = 4000

app.listen(port, ()=>{
    console.log("Connected to port " + port)
})

