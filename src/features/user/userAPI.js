// A mock function to mimic making an async request for data
export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:6060/orders/user/" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:6060/users/" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:6060/users/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data });
  });
}
