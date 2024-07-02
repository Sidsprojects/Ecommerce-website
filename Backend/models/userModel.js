const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please enter the name"],
        maxLength: [30,"Cannot exceed 30 charectors"],
        minLength: [2,"Minimum name charector limit is 2"],
    }, 
    email: {
        type: String,
        required: [true,"Please enter the Email"],
        unique:true,
        validate: [validator.isEmail,"Please enter a valid Email"]
    },
    password: {
        type: String,
        required: [true,"Please enter the Password"],
        minLength: [8,"Minimum 8 charectors"],
        select: false, 
    },
    avatar:{
        public_id:{
            type:String,
            required: true,
        },
        url:{
            type:String,
            required: true,
        }
    },
    role:{
        type: String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire: Date, 
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

// JWT token
userSchema.methods.getJWTToken = function() {
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
}
// Compare the password in the database to the entered password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

// Generating the resetpassword token
userSchema.methods.getResetPasswordToken = async function() {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex")

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 15*60*1000

    return resetToken
}


module.exports = mongoose.model("User",userSchema)