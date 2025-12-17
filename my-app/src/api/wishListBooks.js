export async function getWishBooks() {


  const userId = localStorage.getItem("userId");
  console.log("Frontend userId:", userId);

  const res = await fetch(`/api/wish-books?userId=${userId}`);
  return res.json();
}

export async function addWishBook(data) {
  return fetch("/add-wish-book-form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteWishBook(id) {
  return fetch(`/api/wish-books/${id}`, {
    method: "DELETE",
  });
}

export async function updateWishBook(data) {
  return fetch(`/api/wish-books`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}