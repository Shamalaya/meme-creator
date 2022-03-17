const BASEURL = "/api";

async function getAllMemes() {
  // call GET /api/memes

  const response = await fetch(BASEURL + "/memes", { cache: "no-store" });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const memesJson = await response.json();
  return memesJson.map((meme) => Object.assign({}, meme));
}

async function getAllTemplates() {
  // call GET /api/memes
  const response = await fetch(BASEURL + "/templates");
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const templatesJson = await response.json();
  return templatesJson.map((template) => Object.assign({}, template));
}

function addMeme(meme) {
  return fetch(BASEURL + "/memes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meme),
  });
}

function deleteMeme(memeId) {
  return new Promise((resolve, reject) => {
    fetch(BASEURL + "/memes/" + memeId, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((json) => resolve(json))
            .catch((err) => reject({ error: "Cannot parse server response" }));
        } else {
          response
            .json()
            .then((obj) => reject(obj)) // error msg in the response body
            .catch((err) => reject({ error: "Cannot parse server response" })); // something else
        }
      })
      .catch((err) => {
        reject({ error: "Cannot communicate with the server" });
      });
  });
}
async function logIn(credentials) {
  const response = await fetch(BASEURL + "/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    throw new Error("Something went wrong");
  }
}

async function logOut() {
  await fetch("/api/sessions/current", { method: "DELETE" });
}

async function getUserInfo() {
  const response = await fetch(BASEURL + "/sessions/current");
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo; // an object with the error coming from the server, mostly unauthenticated user
  }
}
const API = {
  logIn,
  logOut,
  getUserInfo,
  getAllMemes,
  getAllTemplates,
  addMeme,
  deleteMeme,
};
export default API;
