export default class Profile {
  constructor(
    {
      id,
      name,
      username,
      bio,
    } = {}
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.bio = bio;
  }
}