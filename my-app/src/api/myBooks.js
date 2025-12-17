export async function getMyBooks() {
  const userId = localStorage.getItem("userId");
  console.log("Frontend userId:", userId);

  const res = await fetch(`/api/my-books?userId=${userId}`);
  return res.json();
}

export async function addBook(data) {

    const userId = localStorage.getItem("userId");
  console.log("Frontend userId:", userId);

  return fetch("/add-my-book-form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({...data, userId}),
  });
}

export async function deleteBook(id) {
  return fetch(`/api/my-books/${id}`, {
    method: "DELETE",
  });
}

export async function updateMyBook(data) {
  return fetch(`/api/my-books`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}