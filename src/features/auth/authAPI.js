// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:6060/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const email = loginInfo.email;
      const password = loginInfo.password;
      const response = await fetch("http://localhost:6060/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        console.log({ data });
        resolve({ data });
      } else {
        const err = await response.json();
        // console.log(err);
        reject(err);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function signOut() {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}
