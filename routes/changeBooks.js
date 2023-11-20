const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const router = express.Router();

router.put("/books/:id", async (req, res) => {
  const { title, author } = req.body;
  const books = JSON.parse(
    await fs.readFile(path.join(__dirname, "..", "db", "books.json"), "utf-8")
  );
  const bookId = req.params.id;
  const bookIndex = books.findIndex((b) => b.id == bookId);

  if (bookIndex !== -1) {
    books[bookIndex] = { id: bookId, title, author };
    await fs.writeFile(
      path.join(__dirname, "..", "db", "books.json"),
      JSON.stringify(books, null, 2)
    );
    res.json(books[bookIndex]);
  } else {
    res.status(503).json({ message: "Kitob topilmadi" });
  }
});

module.exports = router;
