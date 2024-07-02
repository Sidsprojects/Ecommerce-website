const express = require("express")
const { registerUser, userLogin, Logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfileinfo, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require("../Controllers/userController")
const router = express.Router()
const { isAuthenticatedUser, authoriseRoles } =  require("../Middleware/auth")


router.route("/register").post(registerUser)
router.route("/login").post(userLogin)
router.route("/password/forgot").post(forgotPassword)
router.route("/logout").get(Logout)
router.route("/password/reset/:token").put(resetPassword)
router.route("/me").get(isAuthenticatedUser,getUserDetails)
router.route("/password/update").put(isAuthenticatedUser,updatePassword)
router.route("/me/update").put(isAuthenticatedUser,updateProfileinfo)
router.route("/admin/users").get(isAuthenticatedUser,authoriseRoles("admin"),getAllUsers)
router.route("/admin/user/:id").get(isAuthenticatedUser,authoriseRoles("admin"),getSingleUser).put(isAuthenticatedUser,authoriseRoles("admin"),updateUserRole).delete(isAuthenticatedUser,authoriseRoles("admin"),deleteUser)

module.exports = router 