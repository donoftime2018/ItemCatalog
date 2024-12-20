const mongoose = require('mongoose');
const {Schema} = mongoose
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        unique: true
    },

    email:  {
        type: String,
        required: true,
        unique: true
    }  

}, {
    collection: 'user',
    timestamps: true
})


userSchema.pre('validate', function(next){
    if (this.password === this.username)
    {
        return(next('Password should be distinct from username'))
    }
     
    if (this.username === this.password)
    {
        return(next('Username should be distinct from password'))
    }

    if (this.password === "password")
    {
        return(next('Password cannot be "pass" or "password"'))
    }
    
    if (new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "i").test(this.email)===false)
    {
        return(next('Email should be formatted such as harrypotter@hogwarts.edu'))
    }

    next()

})

userSchema.pre('save', async function(next){
    if (this.isNew)
    {
        const salt = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(this.password, salt);
        this.password = hashedPwd
    }
    next()
})

userSchema.post('save', function(error, doc, next) {
   
    if(error.name === 'MongoServerError' && error.code === 11000)
    {
        return(next("Username or email already exists in the database"))
    }

    next()
})

userSchema.pre('updateOne', async function(next){
    const update = this.getUpdate()

    if (update.password === "password")
    {
        return(next('Password cannot be "pass" or "password"'));
    }

    else
    {
        const salt = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(update.password, salt);
        update.password = hashedPwd
        return next()
    }
})

module.exports = mongoose.model("User", userSchema);