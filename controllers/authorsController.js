const pool = require("../db")

// Create a new author record
const addAuthor = async (req , res) => {
    const { name , bio , country } = req.body

    if(!name){
        return res.status(400).json({error : "Name of the author is required"})
    }

    try {
        const result = await pool.query(
            `INSERT INTO authors (name, bio, country)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [name, bio || null, country || null]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).json({error : "Server Error"})
    }
}

// Get the list of all authors
const getAuthors = async (req , res) => {
    try {
        const result = await pool.query(`SELECT * FROM authors ORDER BY id`)
        res.status(200).json(result.rows)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({error : "Server Error"})
    }
}

// Get author record by id
const getAuthorById = async (req , res) => {
    const { id } = req.params
    try {
        const result = await pool.query(`SELECT * FROM authors WHERE id = $1` , [id])

        if(result.rows.length === 0){
            return res.status(404).json({error : "Author not found / id does not exist"})
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).json({error : "Server Error"})
    }
}

// Update author record by id
const updateAuthor = async (req , res) => {
    const { id } = req.params
    const { name, bio, country } = req.body

    if(!name){
        return res.status(400).json({error : "Name of the author is required"})
    }

    try {
        const result = await pool.query(
            `UPDATE authors
            SET name = $1 , bio = $2 , country = $3
            WHERE id = $4
            RETURNING *`,
            [name, bio || null, country || null , id]
        )
        if(result.rows.length === 0){
            return res.status(404).json({error : "Author not found / id does not exist"})
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).json({error : "Server Error"})
    }
}

// Delete author
const deleteAuthor = async (req , res) => {
    const { id } = req.params

    try {
        const result = await pool.query(
            `DELETE FROM authors
            WHERE id = $1
            RETURNING *`,
            [id]
        )
        if(result.rows.length === 0){
            return res.status(404).json({error : "Author not found / id does not exist"})
        }
        res.status(200).json({message : "Author removed successfully" , author : result.rows[0]})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({error : "Server Error"})
    }
}

module.exports = {
    addAuthor,
    getAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor,
}