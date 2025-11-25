const userService = require("../services/userService");
const Users = require("../models/User");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await userService.getProfile(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { search, page, limit, role } = req.query;

    const users = await userService.getUsers({
      search,
      page,
      limit,
      role,
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { role } = req.body;
    if (!userId) {
      throw new Error("User id is required");
    }
    if (!role) {
      throw new Error("role is required");
    }

    const updatedUser = await userService.updateUserRole(userId, role);

    if (!updatedUser) {
      return res.status(404).json({ message: "USer not found" });
    }

    res
      .status(200)
      .json({ message: "User role updated successfully", data: updatedUser });
  } catch (error) {
    console.error("err while updating user role:  ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      throw new Error("User id is required");
    }

    const user = await Users.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await Users.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("err while deleting user >>>>>", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.approveUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      throw new Error("User id is required");
    }
    const { isApproved } = req.body;

    if (!isApproved) {
      throw new Error("User profile status is required");
    }
    const updatedUser = await userService.approveUserProfile(
      userId,
      isApproved
    );

    res.status(200).json({ message: "Account approved", data: updatedUser });
  } catch (error) {
    console.error("err while approving profile >>>>", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
