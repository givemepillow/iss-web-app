import {user as defaultUser} from "@/models/examples";

export default class Post {
  constructor(
    {
      id = 0,
      title = "",
      description = "",
      pictures = [],
      createdAt = "",
      editedAt = "",
      user = defaultUser,
    } = {}
  ) {
    this.id = id;
    this.description = description;
    this.title = title;
    this.pictures = pictures;
    this.createdAt = createdAt;
    this.editedAt = editedAt;
    this.user = user;
  }
}