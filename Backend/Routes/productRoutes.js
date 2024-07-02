const express = require("express");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllReviews,
  deleteReview,
} = require("../Controllers/productController");
const { isAuthenticatedUser, authoriseRoles } = require("../Middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
// create new product
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authoriseRoles("admin"), createProduct);
// update the product and delete the product and get details
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authoriseRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authoriseRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/reviews")
  .get(getAllReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
