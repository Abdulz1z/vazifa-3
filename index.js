const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const bookRoutes = require("./routes/books");
const addbookRoutes = require("./routes/addBooks");
const changeBooksRoutes = require("./routes/changeBooks");
const deleteBooksRoutes = require("./routes/deleteBooks");

app.use(bookRoutes);
app.use(addbookRoutes);
app.use(changeBooksRoutes);
app.use(deleteBooksRoutes);
port = 8080;
app.listen(port, () => {
  console.log("listening on port " + port);
});
