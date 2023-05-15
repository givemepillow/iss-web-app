import Picture from "@/models/picture";
import User from "@/models/user";

export default class Post {
  constructor(
    {
      id = 0,
      title = "",
      description = "",
      pictures = [
        new Picture({
          url: "https://i.pinimg.com/564x/39/cf/0b/39cf0ba1d8a44de924cedded6ec698fa.jpg"
        }),
        new Picture({
          url: "https://i.pinimg.com/564x/c3/78/a1/c378a1ac8e2f3b393ff4d449988ea129.jpg"
        })
      ],
      createdAt = "",
      editedAt = "",
      user = new User(),
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