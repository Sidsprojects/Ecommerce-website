const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "please enter the price"],
    maxLength: [8, "Price cannot exceed 8 charectors"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter the product category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please enter the product stock"],
    maxLength: [4, "Cannot exceed 4 charectors"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
