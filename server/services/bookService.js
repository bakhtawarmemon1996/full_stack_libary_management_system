const Book = require("../models/Book");
const cloudinary = require("../utils/cloudinary");
const BorrowRequests = require("../models/borrowRequests");

const createBook = async ({
  bookTitle,
  author,
  genre,
  totalBooks,
  bookCoverImage,
  bookImages,
  bookSummary,
  bookPrimaryColor,
}) => {
  const existingBook = await Book.findOne({ bookTitle });

  if (existingBook)
    throw new Error(`Book already exists with title ${bookTitle}`);

  // Upload COVER IMAGE (single file)
  if (!bookCoverImage) {
    throw new Error("Book cover image is required");
  }

  const uploadCoverImage = await cloudinary.uploader.upload(
    `data:${bookCoverImage.mimetype};base64,${bookCoverImage.buffer.toString(
      "base64"
    )}`,
    {
      folder: "book_cover_images",
    }
  );

  const uploadBookImages = await Promise.all(
    bookImages.map(async (img) => {
      const res = await cloudinary.uploader.upload(
        `data:${img.mimetype};base64,${img.buffer.toString("base64")}`,
        {
          folder: "book_images",
        }
      );
      return res.secure_url;
    })
  );

  const booksCount = await Book.countDocuments();
  let generateBookId = booksCount + 1;

  let formattedBookId;

  if (generateBookId < 10) {
    formattedBookId = String(generateBookId).padStart(4, "0");
  } else {
    formattedBookId = String(generateBookId).padStart(3, "0");
  }

  const book = await Book.create({
    id: formattedBookId,
    bookTitle,
    author,
    genre,
    totalBooks,
    bookCoverImage: uploadCoverImage.secure_url,
    bookImages: uploadBookImages,
    bookSummary,
    bookPrimaryColor,
  });

  return {
    message: "Book added successfully",
    data: {
      id: book.id,
      _id: book._id,
      bookTitle: book.bookTitle,
      author: book.author,
      genre: book.genre,
      totalBooks: book.totalBooks,
      bookCoverImage: book.bookCoverImage,
      bookImages: book.bookImages,
      bookSummary: book.bookSummary,
      bookPrimaryColor: book.bookPrimaryColor,
    },
  };
};

const getBooks = async ({ search, page, limit }) => {
  const query = {};

  if (search) {
    query.$or = [
      { bookTitle: { $regex: search, $options: "i" } },
      { author: { $regex: search, $options: "i" } },
      { genre: { $regex: search, $options: "i" } },
      { bookSummary: { $regex: search, $options: "i" } },
    ];
  }

  // -------- PAGINATION --------
  page = Number(page) || 1;
  limit = Number(limit) || 10;
  const skip = (page - 1) * limit;

  const total = await Book.countDocuments(query);

  const books = await Book.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    books,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getBook = async (bookId) => {
  const book = await Book.findById({ _id: bookId });
  return book;
};

const editBook = async (bookId, payload) => {
  const book = await Book.findById(bookId);
  if (!book) throw new Error("Book not found");

  const {
    bookTitle,
    author,
    genre,
    totalBooks,
    bookSummary,
    bookPrimaryColor,
    bookImages = [],
    existingImages = [],
  } = payload;

  if (bookTitle) book.bookTitle = bookTitle;
  if (author) book.author = author;
  if (genre) book.genre = genre;
  if (totalBooks !== undefined) book.totalBooks = totalBooks;
  if (bookSummary) book.bookSummary = bookSummary;
  if (bookPrimaryColor) book.bookPrimaryColor = bookPrimaryColor;

  let uploadedImages = [];
  if (bookImages.length > 0) {
    uploadedImages = await Promise.all(
      bookImages.map(async (img) => {
        const res = await cloudinary.uploader.upload(
          `data:${img.mimetype};base64,${img.buffer.toString("base64")}`,
          { folder: "book_images" }
        );

        return res.secure_url;
      })
    );
  }

  if (uploadedImages.length > 0 || existingImages.length > 0) {
    book.bookImages = [...existingImages, ...uploadedImages];
  }

  await book.save();

  return {
    message: "Book updated successfully",
    data: book,
  };
};

const requestBorrowBook = async (userId, bookId, dueDate) => {
  try {
    const existingRequest = await BorrowRequests.findOne({
      user: userId,
      book: bookId,
      status: { $in: ["Pending", "Borrowed"] },
    });

    if (existingRequest) {
      throw new Error(
        `You already have a pending or borrowed request for this book.`
      );
    }

    const borrowRequest = await BorrowRequests.create({
      user: userId,
      book: bookId,
      status: "Pending",
      borrowedDate: null,
      dueDate: dueDate,
      returnDate: null,
    });

    borrowRequest.save();

    return borrowRequest;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateRequestStatus = async (requestId, status) => {
  const request = await BorrowRequests.findById(requestId);
  if (!request) {
    throw new Error("Request not found!");
  }

  // const updateFields = { status };
  const currentDate = new Date();

  switch (status) {
    case "Borrowed":
      request.borrowedDate = currentDate;
      break;

    case "Returned":
      request.returnDate = currentDate;
      break;

    case "Rejected":
      request.borrowedDate = null;
      request.returnDate = null;
      break;

    case "Pending":
      request.borrowedDate = null;
      request.returnDate = null;
      break;

    default:
      throw new Error("Invalid status update");
  }

  const updatedRequest = await BorrowRequests.findByIdAndUpdate(
    requestId,
    { status },
    { new: true }
  );

  return updatedRequest;
};

module.exports = {
  createBook,
  getBooks,
  getBook,
  editBook,
  requestBorrowBook,
  updateRequestStatus,
};
