// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:6060/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:6060/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:6060/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:6060/cart?user=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function resetCart(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId);
    const items = response.data;
    console.log("items: ", items);
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({ status: "success" });
  });
}
