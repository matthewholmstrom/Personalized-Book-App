export async function addUser(data) {
  return fetch("/add-user-form-ajax", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}