const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const { randomUUID } = require("crypto");
const router = express.Router();

router.post("/books", async (req, res) => {
  const newBook = req.body;
  const rawData = await fs.readFile(
    path.join(__dirname, "..", "db", "books.json"),
    "utf8"
  );
  const books = JSON.parse(rawData);
  const existingBook = books.find((book) => book.title === newBook.title);

  if (existingBook) {
    console.error("Kitob allaqachon mavjud", existingBook);
    res.status(400).send("Bu kitob allaqachon mavjud");
  } else {
    newBook.id = randomUUID();
    books.unshift(newBook);
    await fs.writeFile(
      path.join(__dirname, "..", "db", "books.json"),
      JSON.stringify(books),
      "utf8"
    );
  }
  res.json(newBook);
});
module.exports = router;
