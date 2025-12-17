

export async function recommendBooks({ author, genre, limit = 10 }) {
 let query = "https://openlibrary.org/search.json?q=";

const parts = [];
if (author) parts.push(`author:${author}`);
if (genre) parts.push(`subject:${genre}`);

query += encodeURIComponent(parts.join(" "));

  try {
    const res = await fetch(query);
    const data = await res.json();

    if (!data.docs || data.docs.length === 0) {
      return [];
    }

    const results = data.docs.slice(0, limit);

    const recommendations = await Promise.all(
      results.map(async (book) => {
        const title = book.title;
        const authors = book.author_name ? book.author_name.join(", ") : "Unknown";
        const year = book.first_publish_year || "Unknown";
        const coverId = book.cover_i;

        const coverUrl = coverId
          ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
          : null;

    
        let description = "No description available.";
        if (book.key) {
          const workUrl = `https://openlibrary.org${book.key}.json`;
          const workRes = await fetch(workUrl);
          const workData = await workRes.json();

          if (typeof workData.description === "string") {
            description = workData.description;
          } else if (workData.description?.value) {
            description = workData.description.value;
          }
        }

        return {
          title,
          authors,
          year,
          description,
          coverUrl,
        };
      })
    );

    return recommendations;

  } catch (err) {
    console.error("Error recommending books:", err);
    return [];
  }
}