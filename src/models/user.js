export default class User {
  constructor(
    {
      id,
      name,
      username,
      bio,
      avatarId
    } = {}
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.bio = bio;
    this.avatarId = avatarId;
  }
}