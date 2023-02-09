export class Post {
  constructor({ id, description, images, user }) {
    this.id = id;
    this.description = description;
    this.images = [];
    for (let image of images) {
      this.images.push(new Image(image));
    }
    this.user = new User(user);
  }
}


export class User {
  constructor({ id, name, bio, photo, username }) {
    this.id = id;
    this.bio = bio;
    this.name = name;
    this.photo = photo;
    this.username = username;
  }
}


export class Image {
  constructor({ id, original }) {
    this.id = id;
    this.original = original;
  }

}
