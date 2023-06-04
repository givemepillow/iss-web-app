import ky from "ky";

export const apiUrl = import.meta.env.VITE_API_ENDPOINT;


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

export function getPosts(limit, last_created_at) {
  return api.get("posts", { searchParams: { limit: limit, last_created_at: last_created_at } });
}

export function getBookmarks(username) {
  return api.get(`users/${username}/bookmarks`);
}

export function getPostsByUserId(user_id, limit, last_created_at) {
  return api.get("posts", {
    searchParams: { user_id: user_id, limit: limit, last_created_at: last_created_at }
  });
}

export function getPost(post_id) {
  return api.get(`posts/${post_id}`);
}

export function publishPost(formData) {
  return api.post("posts", { body: formData });
}

export function saveBookmark(post_id) {
  return api.post(`posts/${post_id}/bookmark`);
}

export function removeBookmark(post_id) {
  return api.delete(`posts/${post_id}/bookmark`);
}

export function deletePost(post_id) {
  return api.delete(`posts/${post_id}`);
}

export function getUser(username) {
  return api.get(`users/${username}`);
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

export async function logOut() {
  return api.post(`authorization/logout`);
}

export async function signUp(username, name) {
  return api.post("authorization/signup", { json: { "username": username, "name": name } });
}

export function saveUserChanges(formData) {
  return api.patch("users", { body: formData });
}

export function getAvatar(user_id, avatar_id) {
  return api.get(`avatars/optimized/${user_id}/${avatar_id ?? "0"}`);
}

export async function usernameAvailable(username) {
  return api.get("users/username", { searchParams: { "username": username } });
}

export async function deleteUser(user_id) {
  return api.delete(`users/${user_id}`);
}

export function resolvePictureSrc(user_id, picture_id) {
  return `${apiUrl}/pictures/optimized/${user_id}/${picture_id}`;
}

export function resolveOriginalPictureSrc(user_id, picture_id) {
  return `${apiUrl}/pictures/original/${user_id}/${picture_id}`;
}

export function resolveAvatarSrc(user_id, avatar_id) {
  return `${apiUrl}/avatars/optimized/${user_id}/${avatar_id ?? "0"}`;
}

export function resolveOriginalAvatarSrc(user_id, avatar_id) {
  return `${apiUrl}/avatars/original/${user_id}/${avatar_id ?? "0"}`;
}