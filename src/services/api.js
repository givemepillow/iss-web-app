import ky from "ky";
const apiUrl = import.meta.env.VITE_API_ENDPOINT;


const api = ky.create({
  prefixUrl: apiUrl,
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


export function getMe() {
  return api.get("users/me");
}

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

export function signInViaTelegram(data) {
  return api.post("authorization/telegram", { json: data });
}

export async function confirmCode(email, code) {
  return api.post("authorization/code", { json: { "email": email, "code": code } });
}

export async function signUp(username, name) {
  return api.post("authorization/signup", { json: { "username": username, "name": name } });
}

export async function usernameAvailable(username) {
  return api.get("users/username", { searchParams: { "username": username } });
}

export function resolvePictureSrc(user_id, picture_id) {
  return `${apiUrl}/pictures/optimized/${user_id}/${picture_id}`;
}