const ErrorHandler = require("../Utils/errorHandler")

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"

    // handling the mongodb id errors or cast error
    if(err.name === "CastError"){
        const message = `Resource not found. invalid ${err.path}`
        err= new ErrorHandler(message,400)
    }
    //mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message,400)
    }

    // JWT Token error
    if(err.name === "JsonWebTokenError"){
        const message = `Invalid Json web token`
        err = new ErrorHandler(message,400)
    }

    // JWT token expired error
    if(err.name === "TokenExpiredError"){
        const message = `Json web token is expired`
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.message
    })
}