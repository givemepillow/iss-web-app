export function resolvePictureUrl(user_id, picture_id) {
  return `http://localhost:8008/pictures/optimized/${user_id}/${picture_id}`;
}