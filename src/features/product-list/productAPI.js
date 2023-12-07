// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:6060/products");
    const data = response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:6060/products/" + id);
    const data = response.json();
    resolve({ data });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:6060/products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:6060/products/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:6060/categories");
    const data = response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:6060/brands");
    const data = response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination, admin) {
  // filter = {"category":["smartphones","laptops"]}
  // sort  = {_sort:"price",_order:"asc"}
  // pagination  = {_page:"1",_limit:"10"}
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  // console.log(pagination);
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  if (admin) {
    queryString += `admin=true`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:6060/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}
