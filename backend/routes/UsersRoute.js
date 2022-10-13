const express = require("express");
const {
  authController,
  getUserProfile,
  registerUser,
  updateUserProfile,
  forgetPassword,
  resetGetLink,
  resetLink
} = require("../controllers/usersController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

//user registration
router.route("/").post(registerUser);

//post email and password auth
router.post("/login", authController);

//Forget Password
router.post("/forgot-password", forgetPassword);

router
  .route("/reset-password/:id/:token")
  .get(resetGetLink)
  .post(resetLink);

//get user profile Private Route
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
