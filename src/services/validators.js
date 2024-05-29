export function isUserNameValid(username) {
  const usernameRegex = /^[a-z0-9_.]+$/;
  return usernameRegex.test(username);
}