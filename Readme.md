# 📚 Bookstore API

An intermediate level **Node.js RESTful API** that manages a Bookstore system using **PostgreSQL** as the database. This project follows MVC structure and uses **Express.js**, **pg (node-postgres)**, and **Railway** for database hosting.

---

## ✅ Features

* 📘 Manage **Books** (Add, Update, Delete, List)
* ✍️ Manage **Authors** (Add, List, Get by ID)
* 🔎 Filter books by `genre`, `published_year`, or `author_id`
* 🔍 Partial search by book title
* 📄 Pagination for book listing
* 🔁 Author-Book relationship via `author_id` (foreign key)

---

## 🧱 Entities

### Book

* `id` *(auto-incremented)*
* `name` *(string, required)*
* `published_year` *(integer, optional)*
* `genre` *(string, optional)*
* `price` *(integer, optional)*
* `author_id` *(integer, foreign key, required)*

### Author

* `id` *(auto-incremented)*
* `name` *(string, required)*
* `bio` *(string, optional)*
* `country` *(string, optional)*

---

## 🚀 API Endpoints

### 🔹 Book Routes

#### ➕ Add a Book

`POST /books`

```json
{
  "title": "Clean Code",
  "published_year": 2008,
  "genre": "Programming",
  "price": 499,
  "author_id": 2
}
```

#### 🧾 Get All Books (with filtering and pagination)

`GET /books` **Query Parameters (optional):**

* `genre` (e.g., `?genre=Fiction`)
* `author_id` (e.g., `?author_id=2`)
* `published_year` (e.g., `?published_year=2008`)
* `search` (partial title match)
* `page` (page number)
* `limit` (items per page)

Example:

```
GET /books?genre=Fiction&search=al&page=1&limit=5
```

#### 🔍 Get a Book by ID

`GET /books/:id`

#### 📝 Update a Book

`PUT /books/:id`

```json
{
  "title": "Updated Title",
  "price": 599
}
```

#### ❌ Delete a Book

`DELETE /books/:id`

---

### 🔸 Author Routes

#### ➕ Add an Author

`POST /authors`

```json
{
  "name": "Paulo Coelho",
  "bio": "Brazilian lyricist and novelist",
  "country": "Brazil"
}
```

#### 📃 Get All Authors

`GET /authors`

#### 🔍 Get Author by ID

`GET /authors/:id`

---

## 🔧 Tech Stack

* Node.js
* Express.js
* PostgreSQL
* pg (node-postgres)
* Railway (DB hosting)

---

## 📁 Project Structure

```
📦 bookstore-api
├── 📁 controllers
│   ├── authorController.js
│   └── bookController.js
├── 📁 routes
│   ├── authors.js
│   └── books.js
├── 📄 db.js
├── 📄 index.js
├── 📄 .env
├── 📄 runQuery.js (utility to run raw SQL)
└── 📄 README.md
```

---

## 🔐 Environment Variables (.env)

```
DATABASE_URL=your_postgres_connection_string
PORT=5000
```

---

## 🙌 Author

Built by Ravi Mani.

---

Feel free to fork, clone, and enhance this project. Great for learning backend fundamentals!

---

## 🏁 Next Ideas (Optional Enhancements)

* Add authentication (JWT)
* Add user login/signup
* Protect routes
* Add ratings/reviews to books
