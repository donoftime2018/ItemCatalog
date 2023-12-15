const mongoose = require('mongoose');
const {Schema} = mongoose
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email:  {
        type: String,
        required: true
    }  

}, {
    collection: 'user',
    timestamps: true
})


userSchema.pre('validate', function(){
    if (this.password === this.username)
    {
        const validationError = this.invalidate('password', 'Password should be distinct from username');
        throw validationError;
    }

    if (this.username === this.password)
    {
        const validationError = this.invalidate('username', 'Username should be distinct from password');
        throw validationError;
    }

    const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "i")
    
    if (emailRegex.test(this.email)===false)
    {
        console.log(this.email);
        const validationError = this.invalidate('email', 'Email should be formatted such as harrypotter@hogwarts.edu');
        throw validationError;
    }

})

userSchema.pre('save', async function(next){
    if (this.isNew)
    {
        console.log(this.password)
        const salt = await bcrypt.genSalt(this.password.length)
        const hashedPwd = await bcrypt.hash(this.password, salt);
        this.password = hashedPwd
        console.log(this.password)
    }

    return next()
})

userSchema.pre('updateOne', async function(next){
    const update = this.getUpdate()
    console.log(update.password)
    const salt = await bcrypt.genSalt(update.password.length)
    const hashedPwd = await bcrypt.hash(update.password, salt);
    update.password = hashedPwd
    console.log(update.password)

    return next()
})

module.exports = mongoose.model("User", userSchema);