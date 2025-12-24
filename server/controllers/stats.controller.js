const Books = require("../models/Book");
const Users = require("../models/User");
const BorrowedBooks = require("../models/borrowRequests");

exports.getDashboardStats = async (req, res) => {
  try {
    const books = await Books.find();
    const users = await Users.find();
    const requests = await BorrowedBooks.find({ status: "borrowed" });

    res.status(200).json({
      message: "Stats fetched successfully.",
      data: {
        books: books.length,
        users: users.length,
        requests: requests.length,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong on server." });
  }
};
