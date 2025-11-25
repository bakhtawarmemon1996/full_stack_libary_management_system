const User = require("../models/User");
const BorrowRequests = require("../models/borrowRequests");

const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  return user;
};

// userService.js
const getUsers = async ({ search, page, limit, role }) => {
  const query = {};

  // -------- ROLE FILTER --------
  if (role) {
    query.role = { $in: role.split(",") }; // supports multiple roles
  } else {
    query.role = { $in: ["student", "manager"] };
  }

  // -------- SEARCH FILTER --------
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { idNumber: { $regex: search, $options: "i" } },
      { role: { $regex: search, $options: "i" } },
    ];
  }

  // -------- PAGINATION --------
  page = Number(page) || 1;
  limit = Number(limit) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find(query)
    .select("-password")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(query);

  return {
    data: users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const updateUserRole = async (userId, role) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { role: role },
    { new: true }
  ).select("-password");
  return user;
};

const approveUserProfile = async (userId, isApproved) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isApproved },
    { new: true }
  ).select("-password");
  return user;
};

module.exports = {
  getProfile,
  getUsers,
  updateUserRole,
  approveUserProfile,
};
