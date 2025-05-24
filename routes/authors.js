const express = require("express")
const { addAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor } = require("../controllers/authorsController")
const router = express.Router()


// POST /authors - to add a new author record
router.post("/" , addAuthor)

// GET /authors - to get the list of all authors
router.get("/" , getAuthors)

// Get /authors/:id - to get an author by id
router.get("/:id" , getAuthorById)

// PUT /authors/:id - to update an author's record by id
router.put("/:id" , updateAuthor)

// DELETE /authors/:id - to delete a record using id
router.delete("/:id" , deleteAuthor)


module.exports = router