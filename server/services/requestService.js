const BorrowRequests = require("../models/borrowRequests");

// submit a request to borrow a book
const requestBorrowBook = async (userId, bookId) => {
  const existingRequest = await BorrowRequests.findOne({
    user: userId,
    book: bookId,
    status: { $in: ["pending", "borrowed"] },
  });

  if (existingRequest) {
    const error = new Error(
      "You already have a pending or borrowed request for this book.",
    );
    error.statusCode = 409;
    throw error;
  }

  const borrowRequest = await BorrowRequests.create({
    user: userId,
    book: bookId,
    status: "pending",
    borrowedDate: null,
    returnDate: null,
  });

  return borrowRequest;
};

// update request admin only
const updateRequestStatus = async (requestId, status) => {
  const request = await BorrowRequests.findById(requestId);
  if (!request) {
    const error = new Error("Request not found!");
    error.statusCode = 404;
    throw error;
  }

  const currentDate = new Date();

  let updateData = { status };

  switch (status) {
    case "borrowed":
      updateData.borrowedDate = currentDate;
      updateData.returnDate = null;
      break;

    case "returned":
      updateData.returnDate = currentDate;
      break;

    case "rejected":
      updateData.borrowedDate = null;
      updateData.returnDate = null;
      break;

    case "late-return":
      updateData.borrowedDate = null;
      updateData.returnDate = currentDate;
      break;

    case "pending":
      updateData.borrowedDate = null;
      updateData.returnDate = null;
      break;

    default:
      throw new Error("Invalid status update");
  }

  const updatedRequest = await BorrowRequests.findByIdAndUpdate(
    requestId,
    updateData,
    { new: true },
  );

  return updatedRequest;
};

const getBorrowRequests = async ({ search, page, limit, status }) => {
  const query = {};

  if (status) {
    query.status = status;
  }

  if (search) {
    query.$or = [{}];
  }
};

module.exports = {
  requestBorrowBook,
  updateRequestStatus,
};
