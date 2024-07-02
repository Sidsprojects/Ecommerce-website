const ErrorHandler = require("../Utils/errorHandler");
const catchasyncerrors = require("../Middleware/catchasyncerrors");
const User = require("../models/userModel");
const sendToken = require("../Utils/getJWTToken");
const sendEmail = require("../Utils/sendEmail")
const crypto = require("crypto")

exports.registerUser = catchasyncerrors(async (req,res,next)=>{
    const {name,email,password} = req.body
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"This is sample id",
            url: "Sample url"
        }
    })
    sendToken(user,200,res)
})


// User Login
exports.userLogin = catchasyncerrors(async (req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password){
        next(new ErrorHandler("Please enter email and password"),400)
    }
    const user = await User.findOne({ email }).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid Email or password"),401)
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or password"),401)
    }
    sendToken(user,201,res)
})

// Logout User
exports.Logout = catchasyncerrors(async (req,res,next)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success:true,
        message: ":Logged Out",
    })
})

// Password reset
// exports.forgotPassword = catchasyncerrors(async (req,res,next)=>{
//     const user = await User.findOne({email: req.body.email})
//     if(!user){
//         return next(new ErrorHandler("User not found",404))
//     }

//     // generate a reset password token
//     const resetToken = user.getResetPasswordToken();
//     await user.save({validateBeforeSave: false});
//     const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
//     const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`
//     try{
//         await sendEmail({
//             email: user.email,
//             subject: `Armentia Password Recovery`,
//             message,
//           });
      
//         res.status(200).json({
//             success: true,
//             message: `Email sent to ${user.email} successfully`,
//         });
//     }
//     catch(error){
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined;
//         await user.save({validateBeforeSave: false})
//         return next(new ErrorHandler(error.message,500))
//     }
// })

exports.forgotPassword = catchasyncerrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
  
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  
    // Get ResetPassword Token
    const resetToken = await user.getResetPasswordToken();
  
    await user.save({ validateBeforeSave: false });
  
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken.toString()}`;
  
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: `Armentia Password Recovery`,
        message,
      });
  
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return next(new ErrorHandler(error.message, 500));
    }
  });

exports.resetPassword = async(req,res,next)=>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
    const user = await User.findOne(
        {
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()}
        }
    )

    if(!user){
        return next(new ErrorHandler("Invalid reset password token or expired token"),400)
    }

    if(req.body.password != req.body.confirmPassword){
        return next(new ErrorHandler("Passwords dont match",400))
    }

    user.password = req.body.password
    user.resetPasswordExpire = undefined
    user.resetPasswordToken = undefined
    await user.save()
    sendToken(user,200,res)
}


// Get user details
exports.getUserDetails = async (req,res,next)=>{
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
}

// Update password
exports.updatePassword = async (req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password")
    const isPasswordMatched = await user.comparePassword(req.body.oldpassword)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid old password entered",400))
    }

    if(req.body.newpassword !== req.body.confirmpassword){
        return next(new ErrorHandler("The passwords do not match",400))
    }

    user.password = req.body.newpassword

    await user.save()

    sendToken(user,200,res)
}

// update the profile info like name email photo etc
exports.updateProfileinfo = async (req,res,next)=>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,   
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true
    })

}

// get all the users --admin
exports.getAllUsers = async(req,res,next)=>{
    const users = await User.find()
    if(users === null){
        return next(new ErrorHandler("No users exists",404))
    }
    res.status(200).json({
        success:true,
        users
    })
}

// get single user detail --admin
exports.getSingleUser = async(req,res,next)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler(`No user exists with the id ${req.params.id}`,400))
    }
    res.status(200).json({
        success:true,
        user
    })
}

// update the user --admin
exports.updateUserRole = async (req,res,next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }
    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    res.status(200).json({
        success:true,
        user
    })
}
// Delte the user --admin
exports.deleteUser = async (req,res,next)=>{
    const user = await User.findById(req.params.id) 

    if(!user){
        return next(new ErrorHandler(`User with the id ${req.params.id} does not exist`))
    }

    await user.deleteOne()

    res.status(200).json({
        success:true,
        message:"removed successfully",
    })
}