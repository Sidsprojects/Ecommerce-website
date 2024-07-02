const Order = require("../models/ordersModel");
const Product = require("../models/productModel")
const catchasyncerrors = require("../Middleware/catchasyncerrors");
const ApiFeatures = require("../Utils/apiFeatures");
const ErrorHandler = require("../Utils/errorHandler");
const User = require('../models/userModel')

// Creating a new order
exports.newOrder = catchasyncerrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user: req.user._id,
  })

  res.status(201).json({
    success:true,
    order,
  })
});

// Get Single order
exports.getSingleOrder = catchasyncerrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user","name email")
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    res.status(200).json({
      success: true,
      order,
    });
  });

// Get orders of the user logged in
exports.myOrders = catchasyncerrors(async (req,res,next) => {
    const orders = await Order.find({user: req.user._id})
    res.status(200).json({
        success:true,
        orders
    })
})

// Get all orders -- Admin
exports.getAllOrders = catchasyncerrors(async (req,res,next)=>{
    const orders = await Order.find()
    let totalPrice = 0
    orders.forEach((order)=>{
        totalPrice += order.totalPrice
    })
    res.status(200).json({
        success:true,
        totalPrice,
        orders,
    })
})

// Update the order status --admin
exports.updateOrder = catchasyncerrors(async (req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler("Order doesnt exist with this id"))
    }
    if(order.orderStatus === "Delivered"){
        return next(
            new ErrorHandler("The order has already been delivered",400)
        )
    }

    order.orderItems.forEach(async (order)=>{
        await updateStock(order.product,order.quantity)
    })

    order.orderStatus = req.body.status

    if(req.body.status === "Delivered") {
        order.deliveredAt = Date.now()
    }

    await order.save({ validateBeforeSave: false })

    res.status(200).json({
        success:true,
    })
})

async function updateStock(id,quantity) {
    const product = await Product.findById(id)
    product.Stock -= quantity
    await product.save({ validateBeforeSave:false })
}


// delete order -- admin
exports.deleteOrder = catchasyncerrors(async (req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler("Order doesnt exist with this id"))
    }
    await order.deleteOne()
    res.status(200).json({
        success:true,
        message:"Order deleted successfully"
    })
})