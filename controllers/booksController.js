const pool = require("../db");

// Create a new book
const createBook = async (req, res) => {
  const { name, author_id, published_year, genre, price } = req.body;

  if (!name || !author_id) {
    return res
      .status(400)
      .json({ error: "Name of book and author_id are required." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO books (name, published_year, genre, price, author_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, published_year || null, genre || null, price || null, author_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

//Get list of all books with filtering based on genre, author_id and published year and title substring
//Pagination also implemented using LIMIT and OFFSET
const getAllBooks = async (req, res) => {
  const { genre, author_id, year, search, page = 1, limit = 5 } = req.query;

  try {
    let baseQuery = `
      SELECT books.id, books.name, books.published_year, books.genre, books.price, authors.name AS author_name
      FROM books
      JOIN authors ON books.author_id = authors.id
    `;
    let conditions = [];
    let values = [];
    let index = 1;

    if (genre) {
      conditions.push(`books.genre = $${index++}`);
      values.push(genre);
    }
    if (author_id) {
      conditions.push(`books.author_id = $${index++}`);
      values.push(author_id);
    }
    if (year) {
      conditions.push(`books.published_year = $${index++}`);
      values.push(year);
    }
    // if (name) {
    //   conditions.push(`LOWER(books.name) LIKE LOWER($${index++})`);
    //   values.push(`%${name}%`);
    // }
    // Partial search on book title
    if (search) {
        conditions.push(`LOWER(books.title) LIKE $${index}`);
        values.push(`%${search.toLowerCase()}%`);
        index++;
    }

    if (conditions.length > 0) {
      baseQuery += " WHERE " + conditions.join(" AND ");
    }

    baseQuery += `ORDER BY books.id LIMIT $${index++} OFFSET $${index++}` 
    values.push(Number(limit) , (Number(page)-1)*Number(limit))

    const result = await pool.query(baseQuery, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error filtering books:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

//Update a book record using id
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { name, author_id, published_year, genre, price } = req.body;

  if (!name || !author_id) {
    return res
      .status(400)
      .json({ error: "Name of book and author_id are required." });
  }

  try {
    const result = await pool.query(
      `UPDATE books
       SET name = $1, published_year = $2,  genre = $3, price = $4, author_id = $5
       WHERE id = $6
       RETURNING *`,
      [name, published_year, genre, price, author_id, id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Book not found / ID does not exist" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

//Delete a book record using id
const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM books
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Book not found / ID does not exist" });
    }

    res
      .status(200)
      .json({ message: "Book deleted successfully", book: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
};
