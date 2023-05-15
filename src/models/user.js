export default class User {
  constructor(
    id = 0,
    name = "",
    username = "",
    registeredAt = "",
    avatarUrl = ""
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.registeredAt = registeredAt;
    this.avatarUrl = avatarUrl;
  }
}