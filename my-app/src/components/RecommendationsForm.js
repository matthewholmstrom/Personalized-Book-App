

import { addWishBook } from "../api/wishListBooks";
import React, {useState } from "react";
import { recommendBooks } from "../api/recommendationsApi"; // <-- you already have this


export default function RecommendationsForm() {
  const [recAuthor, setRecAuthor] = useState("");
  const [recGenre, setRecGenre] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(false);

  async function handleRecommend(e) {
    e.preventDefault();
    setLoadingRecs(true);
    // replace this with your API call
    const recs = await recommendBooks({ author: recAuthor, genre: recGenre });
    setRecommendations(recs);
    setLoadingRecs(false);
  }


async function handleFavorite(book, index) {
  try {
    // Save to wishlist (backend)
    await addWishBook({
      title: book.title,
      author: book.authors,
    });

    // Remove from recommendations list
    setRecommendations((prev) =>
      prev.filter((_, i) => i !== index)
    );
  } catch (err) {
    console.error("Failed to favorite book:", err);
  }
}


  return (
  

      <div className="my-books-container">
       

       
  <h2>Book Recommendations</h2>

  {/* Recommendation Search Form */}
  <form className="add-book-form" onSubmit={handleRecommend}>
    <input
      type="text"
      placeholder="Author (optional)"
      value={recAuthor}
      onChange={(e) => setRecAuthor(e.target.value)}
    />
    <input
      type="text"
      placeholder="Genre (optional)"
      value={recGenre}
      onChange={(e) => setRecGenre(e.target.value)}
    />
    <button type="submit">Search</button>
  </form>

  {loadingRecs && <p>Loading recommendations...</p>}

  {/* Results */}
  {recommendations.length > 0 && (
    <table className= "books-table">
      <thead>
  <tr>
    <th>Title</th>
    <th>Author(s)</th>
    <th>Year Published</th>
    <th>Description</th>
    <th>Action</th>
  </tr>
</thead>
      <tbody>
  {recommendations.map((book, index) => (
    <tr key={index}>
      <td>{book.title}</td>
      <td>{book.authors}</td>
      <td>{book.year}</td>
      <td>{book.description || "No description available."}</td>
      <td>
        <button  className = "rec-button" onClick={() => handleFavorite(book, index)}>
  ⭐ Favorite
</button>
      </td>
    </tr>
  ))}
</tbody>
    </table>
  )}

      </div>

  );
}





