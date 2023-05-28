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
      downloads = 0,
      views = 0,
      bookmarks = 0,
      createdAt = "",
      user = {}
    } = {}
  ) {
    this.id = id;
    this.description = description;
    this.title = title;
    this.aspectRatio = aspectRatio;
    this.pictures = pictures.map(p => Object.assign(new Picture(), p));
    this.createdAt = createdAt;
    this.views = views;
    this.bookmarks = bookmarks;
    this.downloads = downloads;
    this.user = Object.assign(new User(), user);
  }
}
