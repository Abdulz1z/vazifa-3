const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const router = express.Router();

router.delete("/books/:id", async (req, res) => {
  const bookId = req.params.id;
  const books = JSON.parse(
    await fs.readFile(path.join(__dirname, "..", "db", "books.json"), "utf8")
  );
  const index = books.findIndex((b) => b.id == bookId);
  if (index !== -1) {
    const deleteBooks = books.splice(index, 1)[0];
    await fs.writeFile(
      path.join(__dirname, "..", "db", "books.json"),
      JSON.stringify(books),
      "utf8"
    );
    res.json(deleteBooks);
  }
});

module.exports = router;
