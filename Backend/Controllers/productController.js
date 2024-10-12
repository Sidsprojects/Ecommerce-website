const catchasyncerrors = require("../Middleware/catchasyncerrors");
const ApiFeatures = require("../Utils/apiFeatures");
const ErrorHandler = require("../Utils/errorHandler");
const Product = require("../models/productModel");

// Create product -- Admin
exports.createProduct = catchasyncerrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get all products
exports.getAllProducts = catchasyncerrors(async (req, res,next) => {
  // return next(new ErrorHandler("This is my temp error",500)) 
  const resultsPerPage = 9;
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
  // console.log(req.query.keyword)
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
    resultsPerPage,
  });
});

// Get single product
exports.getProductDetails = catchasyncerrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Update the product -- Admin

exports.updateProduct = catchasyncerrors(async (req, res, next) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete the product
exports.deleteProduct = catchasyncerrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(500).json({
      success: false,
      message: "Product was not found",
    });
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "The product was deleted",
  });
});

// Create Product review by user
exports.createProductReview = catchasyncerrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  let review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
// Get all the reviews for a product
exports.getAllReviews = catchasyncerrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(
      new ErrorHandler(
        `The product with id ${req.query.id} does not exits`,
        400
      )
    );
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete the review
exports.deleteReview = catchasyncerrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(
      new ErrorHandler(
        `The product with id ${req.query.productId} does not exists`
      )
    );
  }
  // here the req.query.id is the id of the review
  console.log(product.reviews[0].id.toString() !== req.query.id.toString())
  const reviews = product.reviews.filter(
    rev=> rev.id.toString() !== req.query.id.toString()
    );
  console.log(reviews)
  // For re-calculating the avg rating of product
  let total = 0;

  reviews.forEach((rev) => {
    console.log(rev.rating)
    total = total +  rev.rating;
  });
  console.log(total)

  ratings = Number(total / reviews.length);
  numOfReviews = reviews.length
  if(reviews.length === 0){
  total = 0
  ratings = 0
  }
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success:true,
    message:"Review deleted"
  })
});
