require("dotenv").config();
require("./config/db");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const borrowBook = require("./routes/borrowRoutes");
app.use("/auth", authRoutes);
app.use("/book", bookRoutes);
app.use("/borrow", borrowBook);

const startServer = async () => {
  try {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`The application is running at http://localhost:${port}.`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
