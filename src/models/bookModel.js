const pool = require("../config/db");

// Get all books
exports.getAllBooks = async () => {
  const [rows] = await pool.query("SELECT * FROM books");
  return rows;
};

// Add new book
exports.addBook = async (book) => {
  const { title, author, genre, totalCopies } = book;
  const [result] = await pool.query(
    "INSERT INTO books (title, author, genre, totalCopies) VALUES (?, ?, ?, ?)",
    [title, author, genre, totalCopies]
  );
  return result.insertId;
};

// Update book
exports.updateBook = async (id, book) => {
  const { title, author, genre, totalCopies } = book;
  await pool.query(
    "UPDATE books SET title=?, author=?, genre=?, totalCopies=? WHERE id=?",
    [title, author, genre, totalCopies, id]
  );
};

// Delete book
exports.deleteBook = async (id) => {
  await pool.query("DELETE FROM books WHERE id=?", [id]);
};
