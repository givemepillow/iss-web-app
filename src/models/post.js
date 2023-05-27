import User from "@/models/user";
import Picture from "@/models/picture";

export default class Post {
  constructor(
    {
      id = 0,
      title = "",
      description = "",
      aspectRatio = 1,
      pictures = [],
      createdAt = "",
      user = new User(),
    } = {}
  ) {
    this.id = id;
    this.description = description;
    this.title = title;
    this.aspectRatio = aspectRatio;
    this.pictures = pictures.map(p => Object.assign(new Picture(), p));
    this.createdAt = createdAt;
    this.user = Object.assign(new User(), user);
  }
}
