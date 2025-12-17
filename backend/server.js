
const mysql = require("mysql2/promise");
require('dotenv').config();
const express = require('express');
const app = express();
const router = express.Router();
PORT = 1418;
app.use(express.json());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));


const db = mysql.createPool({
  host: "",
  user: "",
  password: "",
  database: ""
})


app.get("/api/my-books", async (req, res) => {
  const userId = req.query.userId;

  const sql = `SELECT * FROM mybooks WHERE user_id = ?`;

  try {
    const [rows] = await db.query(sql, [userId]);

    const formattedRows = rows.map(row => ({
      ...row,
      published_year: row.published_year
        ? row.published_year.toString()
        : ""
    }));

    res.json({ data: formattedRows });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});


app.post("/add-my-book-form", async (req, res) => {
  console.log("Received request for add-my-book-form");

  const sql = `insert into mybooks (title, author, published_year, genre, user_id) values (?,?,?,?,?)`;

  try {

    const { title, author, published_year, genre, user_id } = req.body;
    const [result] = await db.query(sql, [title, author, published_year, genre, user_id]);

    console.log("Insert result:", result);

    
    res.json({
      success: true,
      message: "Book added successfully",
      data: {
        id: result.insertId,
        title,
        author,
        published_year,
        genre, 
        user_id
      }
    });


  } catch (err) {
    console.error("Error adding book", err);
    res.status(500).json({
      error: "Failed to add book",
      details: err.message
    });
  }
});



app.put("/api/my-books", async (req, res) => {
  console.log("Received request /api/my-books");

  const sql = `update mybooks
  set title = ?, author = ?, published_year = ?, genre = ?
  where id = ?`;

  try {

    const { id, title, author, published_year, genre } = req.body;
  
    
    if (!id) {
      return res.status(400).json({ error: "Missing id for update" });
    }

 
    const [result] = await db.query(sql, [title, author, published_year, genre, id]);

    
    res.json({
      success: true,
      message: "Book updated successfully",
      data: {
        id,
        title,
        author,
        published_year,
        genre
      }
    });
    
    console.log("Update result:", result);

  } catch (err) {
    console.error("Error updating book", err);
    res.status(500).json({
      error: "Failed to update book",
      details: err.message
    });
  }
});


app.delete("/api/my-books/:id", async (req, res) => {
  console.log("Received request /api/my-books/:id");

  const sql = `DELETE FROM mybooks WHERE id = ?`;

  try {

    const id = req.params.id;
   
    if (!id) {
      return res.status(400).json({ error: "Missing id for delete" });
    }

    const [result] = await db.query(sql, [id]);


    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({
      success: true,
      message: "Book deleted successfully",
      deletedId: id
    });

    console.log("Delete result:", result);
  } catch (err) {
    console.error("Error deleting book", err);
    res.status(500).json({
      error: "Failed to delete book",
      details: err.message,
    });
  }
});



app.get("/api/wish-books", async (req, res) => {
  const userId = req.query.userId;
  console.log("Received request for /api/wish-books");
  
  const sql = `SELECT * FROM wishlist WHERE user_id = ?`;

  try {
    const [rows] = await db.query(sql, [userId]);

    console.log("Raw rows from DB:", rows);

    res.json({ data: rows });
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    res.status(500).json({
      error: "Failed to fetch books",
      details: err.message
    });
  }
});


app.post("/add-wish-book-form", async (req, res) => {
  console.log("Received request for /add-wish-book-form");

  const sql = `insert into wishlist (title, author, user_id) values (?,?,?)`;

  try {

    const { title, author, user_id} = req.body;
    const [result] = await db.query(sql, [title, author, user_id]);

    console.log("Insert result:", result);

    
    res.json({
      success: true,
      message: "Book added successfully",
      data: {
        id: result.insertId,
        title,
        author,
        user_id
      }
    });


  } catch (err) {
    console.error("Error adding book", err);
    res.status(500).json({
      error: "Failed to add book",
      details: err.message
    });
  }
});



app.put("/api/wish-books", async (req, res) => {
  console.log("Received request /api/wish-books/:id");

  const sql = `update wishlist
  set title = ?, author = ?
  where id = ?`;

  try {

    const { id, title, author} = req.body;
   
    if (!id) {
      return res.status(400).json({ error: "Missing id for update" });
    }
 
    const [result] = await db.query(sql, [title, author, id]);

    
    res.json({
      success: true,
      message: "Book updated successfully",
      data: {
        id,
        title,
        author
      }
    });
    
    console.log("Update result:", result);

  } catch (err) {
    console.error("Error updating book", err);
    res.status(500).json({
      error: "Failed to update book",
      details: err.message
    });
  }
});


app.delete("/api/wish-books/:id", async (req, res) => {
  console.log("Received request /api/wish-books:id");

  const sql = `DELETE FROM wishlist WHERE id = ?`;

  try {

    const id = req.params.id;
   
    
    if (!id) {
      return res.status(400).json({ error: "Missing id for delete" });
    }

 
    const [result] = await db.query(sql, [id]);

  
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({
      success: true,
      message: "Book deleted successfully",
      deletedId: id
    });

    console.log("Delete result:", result);
  } catch (err) {
    console.error("Error deleting book", err);
    res.status(500).json({
      error: "Failed to delete book",
      details: err.message,
    });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log("Received login data:", req.body);   

  try {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({
  message: 'Login unsuccessful'
});
    }

    const user = rows[0];

     const passwordMatch = password === user.password;

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

 
res.json({ message: 'Login successful', userId: user.id });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


app.get("/api/locations", async (req, res) => {
  console.log("Received request for /api/locations");

 const sql = `
  SELECT 
    l.id AS location_id,
    l.store_name,
    l.store_address,
    l.website_url,
    w.id AS wishlist_id,
    w.title AS wishlist_title,   -- <-- ALIAS ADDED
    wl.price
  FROM locations l
  LEFT JOIN wishlist_locations wl ON l.id = wl.location_id
  LEFT JOIN wishlist w ON wl.wishlist_id = w.id
  ORDER BY l.id;
`;

  try {
    const [rows] = await db.query(sql);

    console.log("Raw rows from DB:", rows);

    res.json({ data: rows });
  } catch (err) {
    console.error("Error fetching locations:", err);
    res.status(500).json({
      error: "Failed to fetch locations",
      details: err.message
    });
  }
});


app.post("/add-my-location", async (req, res) => {
  console.log("Received request for /add-my-location");

  const sql = `insert into locations (store_name, store_address, website_url) values (?,?, ?)`;

  try {

    const { store_name, store_address, website_url} = req.body;
    const [result] = await db.query(sql, [store_name, store_address, website_url]);

    console.log("Insert result:", result);

    
    res.json({
      success: true,
      message: "Location added successfully",
      data: {
        id: result.insertId,
        store_name,
        store_address,
        website_url
      }
    });


  } catch (err) {
    console.error("Error adding location", err);
    res.status(500).json({
      error: "Failed to add location",
      details: err.message
    });
  }
});



app.put("/api/locations", async (req, res) => {
  console.log("Received request /api/locations");

  const sql = `update locations
  set store_name = ?, store_address = ?, website_url = ?
  where id = ?`;

  try {

      const {id, store_name, store_address, website_url} = req.body;
   
    if (!id) {
      return res.status(400).json({ error: "Missing id for update" });
    }
 
  
    const [result] = await db.query(sql, [store_name, store_address, website_url, id]);

    
    res.json({
      success: true,
      message: "Location updated successfully",
      data: {
        id,
        store_name,
        store_address,
        website_url
      }
    });
    
    console.log("Update result:", result);

  } catch (err) {
    console.error("Error updating location", err);
    res.status(500).json({
      error: "Failed to update location",
      details: err.message
    });
  }
});



app.delete("/api/locations/:id", async (req, res) => {
  console.log("Received request /api/locations:id");

  const sql = `DELETE FROM locations WHERE id = ?`;

  try {

    const id = req.params.id;
    
    if (!id) {
      return res.status(400).json({ error: "Missing id for delete" });
    }

    const [result] = await db.query(sql, [id]);

    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.json({
      success: true,
      message: "Location deleted successfully",
      deletedId: id
    });

    console.log("Delete result:", result);
  } catch (err) {
    console.error("Error deleting location", err);
    res.status(500).json({
      error: "Failed to delete location",
      details: err.message,
    });
  }
});




app.post('/api/signup', async (req, res) => {
  console.log("Received request for /api/signup");

  const sql = `insert into users (username, password, first_name, last_name) values (?,?,?,?)`;

  try {

    const {username, password, first_name, last_name} = req.body;
    const [result] = await db.query(sql, [username, password, first_name, last_name]);

   
    res.json({
      success: true,
      message: "Location added successfully",
      data: {
        id: result.insertId,
        username,
        password,
        first_name,
        last_name,
         userId: result.insertId   
      }
    });


  } catch (err) {
    console.error("Error adding user", err);
    res.status(500).json({
      error: "Failed to add user",
      details: err.message
    });
  }
});


app.use('/api', router);


app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
