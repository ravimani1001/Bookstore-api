const pool = require("./db");

async function run() {
  try {
    // Drop the table if it exists
    await pool.query(`DROP TABLE IF EXISTS books`);

    // Create the new books table
    await pool.query(`
      CREATE TABLE books (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        published_year INT,
        genre VARCHAR(100),
        price NUMERIC(10, 2),
        author_id INTEGER REFERENCES authors(id)
      );
    `);

    console.log("books table created successfully!");
  } catch (err) {
    console.error("Error running query:", err.message);
  } finally {
    await pool.end(); // close connection since it's a one-time script
  }
}

run();
