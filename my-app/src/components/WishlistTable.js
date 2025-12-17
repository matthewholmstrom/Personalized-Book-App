import React, { useEffect, useState } from "react";
import { getWishBooks, addWishBook, deleteWishBook, updateWishBook } from "../api/wishListBooks";

export default function MyWishBooksTable() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
  try {
    const res = await getWishBooks();
    console.log("Books from backend:", res);
    setBooks(res.data);
  } catch (err) {
    console.error("Failed to load books:", err);
  }
}

  async function handleAddWishBook(e) {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    const bookData = {...newBook, user_id: userId};

    await addWishBook(bookData);
    setNewBook({ title: "", author: "" });
    loadBooks();
  }

  async function handleWishDelete(id) {
    await deleteWishBook(id);
    loadBooks();
  }

  async function handleUpdate(e) {
    e.preventDefault();
    await updateWishBook(editingBook);
    setEditingBook(null);
    loadBooks();
  }

  return (
    <div className="my-books-container">
      <h2>My Wishlist</h2>

      <form className="add-book-form" onSubmit={handleAddWishBook}>
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
       
        <button type="submit">Add Book</button>
      </form>

      <table className="books-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
  {books.map((book) => {
    if (editingBook && editingBook.id === book.id) {
  
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
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditingBook(null)}>Cancel</button>
          </td>
        </tr>
      );
    } else {
    
      return (
        <tr key={book.id}>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>
            <button onClick={() => setEditingBook(book)}>Edit</button>
            <button onClick={() => handleWishDelete(book.id)}>Delete</button>
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