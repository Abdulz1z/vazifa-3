const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

router.get("/books", (req, res) => {
  fs.readFile(
    path.join(__dirname, "..", "db", "books.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Error reading books", err);
        res.status(500).send("Server xatosi");
        return;
      }
      const books = JSON.parse(data);
      res.json(books);
    }
  );
});
router.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  fs.readFile(
    path.join(__dirname, "..", "db", "books.json"),
    "utf8",

    (err, data) => {
      if (err) {
        console.error("Faylni o'qib olishda xatolik:", err);
        res.status(500).send("Server xatosi");
        return;
      }
      const books = JSON.parse(data);

      const foundBook = books.find((book) => book.id == bookId)
      if (foundBook) {
        res.json(foundBook);
      } else {
        res.status(404).send("Book not found");
      }
    }
  );
});

module.exports = router;
