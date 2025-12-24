const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  getUsers,
  updateUserRole,
  deleteUser,
  approveUserProfile,
  getUser,
} = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// get logged in user profile
router.get("/my-profile", protect, getUserProfile);

// get all users
router.get("/", protect, roleMiddleware("admin"), getUsers);

// update user role (admin only)
router.put(`/:userId`, protect, roleMiddleware("admin"), updateUserRole);

// get user profile
router.get(`/:userId`, protect, roleMiddleware("admin"), getUser);

// delete user
router.delete(`/:userId`, protect, roleMiddleware("admin"), deleteUser);

// approve/reject user account (admin only)
router.put(
  `/approveUserProfile/:userId`,
  protect,
  roleMiddleware("admin"),
  approveUserProfile
);

module.exports = router;
