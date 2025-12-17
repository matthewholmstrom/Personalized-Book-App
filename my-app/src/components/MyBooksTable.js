import React, { useEffect, useState } from "react";
import { getMyBooks, addBook, deleteBook, updateMyBook } from "../api/myBooks";

export default function MyBooksTable() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "", published_year: "", genre: "", user_id: "" });
  const [editingBook, setEditingBook] = useState(null);

  // Load books on mount
  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
  try {
    const res = await getMyBooks();
    console.log("Books from backend:", res);
    setBooks(res.data);
  } catch (err) {
    console.error("Failed to load books:", err);
  }
}

  async function handleAddBook(e) {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    const bookData = {...newBook, user_id: userId};

    await addBook(bookData);
    setNewBook({ title: "", author: "", published_year: "", genre: "", user_id:""  });
    loadBooks();
  }

  async function handleDelete(id) {
    await deleteBook(id);
    loadBooks();
  }

  async function handleUpdate(e) {
    e.preventDefault();
    await updateMyBook(editingBook);
    setEditingBook(null);
    loadBooks();
  }

  return (
    <div className="my-books-container">
      <h2>My Books</h2>

      {/* Add Book Form */}
      <form className="add-book-form" onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) =>
            setNewBook({ ...newBook, title: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) =>
            setNewBook({ ...newBook, author: e.target.value })
          }
          required
        />
         <input
          type="number"
          placeholder="Year Published"
          value={newBook.published_year}
          onChange={(e) =>
            setNewBook({ ...newBook, published_year: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Genre"
          value={newBook.genre}
          onChange={(e) =>
            setNewBook({ ...newBook, genre: e.target.value })
          }
          required
        />
        <button type="submit">Add Book</button>
      </form>


      {/* Books Table */}
      <table className="books-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year Published</th>
            <th>Genre</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
  {books.map((book) => {
    if (editingBook && editingBook.id === book.id) {
      // Edit row
      return (
        <tr key={book.id}>
          <td>
            <input
              value={editingBook.title}
              onChange={(e) =>
                setEditingBook({ ...editingBook, title: e.target.value })
              }
            />
          </td>
          <td>
            <input
              value={editingBook.author}
              onChange={(e) =>
                setEditingBook({ ...editingBook, author: e.target.value })
              }
            />
          </td>
          <td>
            <input
              value={editingBook.published_year}
              onChange={(e) =>
                setEditingBook({ ...editingBook, published_year: e.target.value })
              }
            />
          </td>
          <td>
            <input
              value={editingBook.genre}
              onChange={(e) =>
                setEditingBook({ ...editingBook, genre: e.target.value })
              }
            />
          </td>
          <td>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditingBook(null)}>Cancel</button>
          </td>
        </tr>
      );
    } else {
      // Normal row
      return (
        <tr key={book.id}>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.published_year}</td>
          <td>{book.genre}</td>
          <td>
            <button onClick={() => setEditingBook(book)}>Edit</button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </td>
        </tr>
      );
    }
  })}
</tbody>
      </table>
    </div>
  );
}