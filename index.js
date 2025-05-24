const dotenv = require("dotenv")
dotenv.config()

//IMPORT STATEMENTS
const express = require("express")
const booksRouter = require("./routes/books")
const authorsRouter = require("./routes/authors")

const app = express()

app.use(express.json());

//ROUTES
//1. Home Route
app.get("/" , (req , res) => {
    res.send("The Bookstore API is running")
});

//2. /books routes
app.use("/books" , booksRouter)

//3. /authors routes
app.use("/authors" , authorsRouter)

const PORT = process.env.PORT || 8000
app.listen(PORT , () => {
    console.log(`Server running on PORT ${PORT}`)
})