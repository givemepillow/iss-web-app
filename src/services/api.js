import ky from "ky";


const api = ky.create({
  prefixUrl: "http://localhost:8008",
  // headers: {
  //   "Content-Type": "application/json;charset=utf-8"
  // },
  mode: "cors",
  credentials: "include",
  throwHttpErrors: false,
  hooks: {
    afterResponse: [
      async (input, options, response) => {
        if (response.status === 403) {
          location.href = "/login";
        }
      }
    ]
  }
});


export function getPosts() {
  return api.get("posts");
}

export function getPost(post_id) {
  return api.get(`posts/${post_id}`);
}

export function publishPost(formData) {
  return api.post("posts", { body: formData });
}

export function signIn(email) {
  return api.post("authorization/email", { json: { "email": email } });
}

export async function confirmCode(email, code) {
  return api.post("authorization/code", { json: { "email": email, "code": code } });
}

export async function signUp(username, name) {
  return api.post("signup", { json: { "username": username, "name": name } });
}

export async function usernameAvailable(username) {
  return api.post("usernames/available", { searchParams: { "username": username } });
}