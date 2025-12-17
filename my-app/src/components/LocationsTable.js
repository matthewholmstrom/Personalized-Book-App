import React, { useEffect, useState } from "react";
import { getMyLocation, addLocation, deleteLocation, updateMyLocation } from "../api/locations";

export default function MyLocationsTable() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ store_name: "", store_address: "", website_url: ""});
  const [editingBook, setEditingBook] = useState(null);

  // Load books on mount
  useEffect(() => {
    loadBooks();
  }, []);



  async function loadBooks() {
    try {
      const res = await getMyLocation();
      const rows = res.data;

      // GROUP rows by location_id
      const grouped = rows.reduce((acc, row) => {
        if (!acc[row.location_id]) {
          acc[row.location_id] = {
            id: row.location_id,
            store_name: row.store_name,
            store_address: row.store_address,
            website_url: row.website_url,
            wishlist_books: []
          };
        }

       if (row.wishlist_title && row.price !== null) {
  acc[row.location_id].wishlist_books.push({
    id: row.wishlist_id,
    title: row.wishlist_title,
    price: row.price
  });
}

        return acc;
      }, {});

      setBooks(Object.values(grouped));
    } catch (err) {
      console.error("Failed to load locations:", err);
    }
  }

  
  async function handleAddLocation(e) {
    e.preventDefault();
    await addLocation(newBook);
    setNewBook({store_name: "", store_address: "", website_url: ""});
    loadBooks();
  }

  async function handleDeleteLocation(id) {
    await deleteLocation(id);
    loadBooks();
  }

  async function handleUpdateLocation(e) {
    e.preventDefault();
    await updateMyLocation(editingBook);
    setEditingBook(null);
    loadBooks();
  }

  return (
    <div className="my-books-container">
      <h2>My Books</h2>

      {/* Add Book Form */}
      <form className="add-book-form" onSubmit={handleAddLocation}>
        <input
          type="text"
          placeholder="Store Name"
          value={newBook.store_name}
          onChange={(e) =>
            setNewBook({ ...newBook, store_name: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Store Address"
          value={newBook.store_address}
          onChange={(e) =>
            setNewBook({ ...newBook, store_address: e.target.value })
          }
          required
        />
         <input
          type="text"
          placeholder="Website URL"
          value={newBook.website_url}
          onChange={(e) =>
            setNewBook({ ...newBook, website_url: e.target.value })
          }
          required
        />
        <button type="submit">Add Book</button>
      </form>


      {/* Books Table */}
          <table className="books-table">
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Store Address</th>
            <th>Website URL</th>

            {/* NEW COLUMN */}
            <th>Wishlist Books</th>

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
                      value={editingBook.store_name}
                      onChange={(e) =>
                        setEditingBook({ ...editingBook, store_name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={editingBook.store_address}
                      onChange={(e) =>
                        setEditingBook({ ...editingBook, store_address: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={editingBook.website_url}
                      onChange={(e) =>
                        setEditingBook({ ...editingBook, website_url: e.target.value })
                      }
                    />
                  </td>

                  {/* Wishlist column stays the same during edit */}
                  <td>
                    {book.wishlist_books.length === 0
                      ? "No books"
                      : book.wishlist_books.map(b => (
                          <div key={b.id}>{b.title} - ${b.price}</div>
                        ))
                    }
                  </td>

                  <td>
                    <button onClick={handleUpdateLocation}>Save</button>
                    <button onClick={() => setEditingBook(null)}>Cancel</button>
                  </td>
                </tr>
              );
            } else {

              // Normal row
              return (
                <tr key={book.id}>
                  <td>{book.store_name}</td>
                  <td>{book.store_address}</td>
                  <td>{book.website_url}</td>

                  {/* NEW DISPLAY */}
                  <td>
                    {book.wishlist_books.length === 0
                      ? "No books"
                      : book.wishlist_books.map((b, index) => (
    <div key={book.id + "-" + index}>
        {b.title} — ${b.price}
    </div>
))
                    }
                  </td>

                  <td>
                    <button onClick={() => setEditingBook(book)}>Edit</button>
                    <button onClick={() => handleDeleteLocation(book.id)}>Delete</button>
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