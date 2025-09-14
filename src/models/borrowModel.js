const db = require("../config/db");

exports.borrowBook = async (userId, bookId) => {
  await db.query(
    "INSERT INTO borrows (userId, bookId, borrowDate) VALUES (?, ?, NOW())",
    [userId, bookId]
  );

  await db.query("UPDATE books SET borrowed = borrowed + 1 WHERE id = ?", [
    bookId,
  ]);
};

exports.returnBook = async (userId, bookId) => {
  await db.query(
    "UPDATE borrows SET returnDate = NOW() WHERE userId=? AND bookId=? AND returnDate IS NULL",
    [userId, bookId]
  );

  await db.query(
    "UPDATE books SET borrowed = borrowed - 1 WHERE id = ? AND borrowed > 0",
    [bookId]
  );
};

exports.getUserBorrows = async (userId) => {
  const [rows] = await db.query(
    `SELECT b.id, b.title, br.borrowDate 
     FROM borrows br 
     JOIN books b ON br.bookId = b.id 
     WHERE br.userId=? AND br.returnDate IS NULL`,
    [userId]
  );
  return rows;
};

exports.checkAlreadyBorrowed = async (userId, bookId) => {
  const [rows] = await db.query(
    "SELECT * FROM borrows WHERE userId=? AND bookId=? AND returnDate IS NULL",
    [userId, bookId]
  );
  return rows.length > 0;
};
