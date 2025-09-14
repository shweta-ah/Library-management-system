const Book = require("../models/bookModel");
const Borrow = require("../models/borrowModel");

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.getAllBooks();

    const updatedBooks = books.map((b) => ({
      ...b,
      availableCopies: b.totalCopies - b.borrowed,
    }));

    res.json(updatedBooks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

// Add new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, totalCopies } = req.body;
    if (!title || !author || !genre || !totalCopies) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const id = await Book.addBook({ title, author, genre, totalCopies });
    res.status(201).json({ id, message: "Book added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding book" });
  }
};

// Update book
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, totalCopies } = req.body;
    await Book.updateBook(id, { title, author, genre, totalCopies });
    res.json({ message: "Book updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating book" });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await Book.deleteBook(id);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting book" });
  }
};
