const bookService = require("../services/bookService");
const Books = require("../models/Book");
const BorrowRequests = require("../models/borrowRequests");

exports.addBook = async (req, res) => {
  try {
    const bookImages = req.files?.bookImages || [];
    const bookCoverImage = req.files?.bookCoverImage?.[0]; // ✅ FIX

    if (!bookCoverImage) {
      throw new Error("Book cover image is required");
    }

    const existingBook = await Books.findOne({
      bookTitle: req.body.bookTitle,
    });

    if (existingBook) {
      throw new Error(`Book with title ${req.body.bookTitle} already exists.`);
    }

    const data = await bookService.createBook({
      ...req.body,
      bookImages,
      bookCoverImage,
    });

    res.status(201).json(data);
  } catch (error) {
    console.error("Error in addBook:", error);
    res.status(400).json({ message: error.message });
  }
};

// get all books
exports.getBooks = async (req, res) => {
  try {
    const { search, department } = req.query;
    const books = await bookService.getBooks({ search, department });
    res.status(200).json({ data: books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get book by id
exports.getBook = async (req, res) => {
  try {
    if (!req.params.bookId) {
      throw new Error(`ID is ${req.params.bookId}`);
    }

    const book = await bookService.getBook(req.params.bookId);
    if (!book) {
      throw new Error("Book not found");
    }

    res.status(200).json({ data: book });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.editBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const bookImages = req.files?.bookImages || [];
    const bookCoverImage = req.files?.bookCoverImage?.[0] || null;

    const updatedBook = await bookService.editBook(bookId, {
      ...req.body,
      bookImages,
      bookCoverImage,
    });

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Err while updating book:", error);
    res.status(500).json({ message: error.message });
  }
};

// delete a book by id
exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required." });
    }
    await Books.findByIdAndDelete(bookId);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("err while deleting book >>>", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// request to borrow a book
exports.requestBorrowBook = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookId = req.params.bookId;
    // const { dueDate } = req.body;
    if (!userId) {
      throw new Error("User ID is required");
    }
    if (!bookId) {
      throw new Error("Book ID is required");
    }
    // if (!dueDate) {
    //   throw new Error("Due date is required");
    // }

    const result = await bookService.requestBorrowBook(userId, bookId);

    res.status(201).json({
      message: "Request submitted successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("err while submitting request >>>>", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// accept or reject borrow request submitted by a student
exports.acceptRejectRequestBorrowBook = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const { status } = req.body;
    if (!requestId) {
      throw new Error("Request ID is required!");
    }
    if (!status) {
      throw new Error("Status is required!");
    }

    const allowedStatus = ["Pending", "Borrowed", "Returned", "Rejected"];
    if (!allowedStatus.includes(status)) {
      throw new Error("Invalid status value!");
    }
    const updatedRequest = await bookService.updateRequestStatus(
      requestId,
      status,
    );

    return res
      .status(200)
      .json({ message: "Status updated successfully!", data: updatedRequest });
  } catch (error) {
    console.error("Err while changing request status >>>>", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
