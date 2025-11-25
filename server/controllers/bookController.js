const bookService = require("../services/bookService");
const Books = require("../models/Book");
const BorrowRequests = require("../models/borrowRequests");

exports.addBook = async (req, res) => {
  try {
    const bookImages = req.files?.bookImages || [];
    const existingBook = await Books.findOne({ bookTitle: req.body.bookTitle });
    if (existingBook) {
      throw new Error(`Book with title ${req.body.bookTitle} already exists.`);
    }
    const existingGenre = await Books.findOne({ genre: req.body.genre });
    if (existingGenre) {
      throw new Error(`Book with genre ${req.body.genre} already exists.`);
    }

    const data = await bookService.createBook({
      ...req.body,
      bookImages,
    });
    res.status(201).json(data);
  } catch (error) {
    console.error("Error in addBook:", error);
    res.status(400).json({ message: "Server error", error: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { search } = req.query;
    const books = await bookService.getBooks({ search });
    res.status(200).json({ data: books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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
    const bookId = req.params.bookId;
    if (!bookId) throw new Error("Book id is required");

    const bookCoverImage = req.files.bookCoverImage?.[0];
    const bookImages = req.files?.bookImages || [];

    const updatedBook = await bookService.editBook(bookId, {
      ...req.body,
      bookCoverImage,
      bookImages,
    });

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Err while updating book: ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    if (!bookId) {
      throw new Error("Book ID is required");
    }
    await Books.findByIdAndDelete(bookId);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("err while deleting book >>>", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.requestBorrowBook = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookId = req.params.bookId;
    const { dueDate } = req.body;
    if (!userId) {
      throw new Error("User ID is required");
    }
    if (!bookId) {
      throw new Error("Book ID is required");
    }
    if (!dueDate) {
      throw new Error("Due date is required");
    }

    const result = await bookService.requestBorrowBook(userId, bookId, dueDate);

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
      status
    );

    return res
      .status(200)
      .json({ message: "Status updated successfully!", data: updatedRequest });
  } catch (error) {
    console.error("Err while changing request status >>>>", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
