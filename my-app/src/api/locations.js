export async function getMyLocation() {
  const res = await fetch("/api/locations");
  return res.json();
}

export async function addLocation(data) {
  return fetch("/add-my-location", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteLocation(id) {
  return fetch(`/api/locations/${id}`, {
    method: "DELETE",
  });
}

export async function updateMyLocation(data) {
  return fetch(`/api/locations`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}