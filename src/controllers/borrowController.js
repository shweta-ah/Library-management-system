const Borrow = require("../models/borrowModel");
const Book = require("../models/bookModel");

exports.borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    const alreadyBorrowed = await Borrow.checkAlreadyBorrowed(userId, bookId);
    if (alreadyBorrowed)
      return res.status(400).json({ message: "Already borrowed this book." });

    const books = await Book.getAllBooks();
    const book = books.find((b) => b.id == bookId);

    if (!book || book.availableCopies <= 0) {
      return res.status(400).json({ message: "No copies available." });
    }

    await Borrow.borrowBook(userId, bookId);
    return res.status(200).json({ message: "Book borrowed successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error borrowing book" });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    await Borrow.returnBook(userId, bookId);
    res.json({ message: "Book returned successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error returning book" });
  }
};

exports.getUserBorrows = async (req, res) => {
  try {
    const userId = req.user.id;
    const borrows = await Borrow.getUserBorrows(userId);
    res.json(borrows);
  } catch (err) {
    res.status(500).json({ message: "Error fetching borrowed books" });
  }
};
