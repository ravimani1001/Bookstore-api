const express = require("express");
const router = express.Router();
const { createBook, getAllBooks, updateBook, deleteBook } = require("../controllers/booksController");

// POST /books - create a new book
router.post("/", createBook)

// GET /books - Gives a list of all books
router.get("/" , getAllBooks)

// PUT /books/:id - updates a book record using id
router.put("/:id", updateBook);

// DELETE /books/:id - deletes a book record using id
router.delete("/:id", deleteBook)

module.exports = router;
