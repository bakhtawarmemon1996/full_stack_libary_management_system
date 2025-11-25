const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const register = async ({
  name,
  email,
  password,
  idNumber,
  role = "student",
  isApproved = true,
}) => {
  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new Error(
      `An account with '${existingUser.email}' email already exists`
    );

  if (role === "admin") {
    if (!idNumber) {
      idNumber = null;
    }

    isApproved = true;
  } else if (role === "student") {
    if (!idNumber) throw new Error("ID is required.");
    if (idNumber?.length !== 13) {
      throw new Error("ID must contain 13 digits.");
    }
    isApproved = false;

    const existingId = await User.findOne({ idNumber });
    if (existingId) throw new Error("ID is already registered!");
  }

  const user = await User.create({
    name,
    email,
    password,
    idNumber,
    role,
    isAccountApproved: isApproved,
  });

  return {
    success: true,
    message: `Account created successfully.`,

    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      idNumber: user.idNumber,
      isAccountApproved: user.isAccountApproved,
    },
    token: generateToken(user._id),
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    throw new Error("Invalid email or password.");
  }

  return {
    success: true,
    message: "Login successfull",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      idNumber: user.idNumber,
      role: user.role,
      isAccountApproved: user.isAccountApproved,
      booksBorrowedCount: user.booksBorrowedCount,
    },
    token: generateToken(user._id),
  };
};

module.exports = {
  register,
  login,
};
