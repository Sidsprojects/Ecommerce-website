// Authenticating the user
const ErrorHandler = require("../Utils/errorHandler")
const catchasyncerrors = require("./catchasyncerrors")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

exports.isAuthenticatedUser = catchasyncerrors(async (req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("Please Login to access this feature"))
    }

    // console.log(token)
    const decodedData = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decodedData.id)
    // console.log(req.user.name)
    next()
})

exports.authoriseRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403)
            )
        }
        next()
    }
}