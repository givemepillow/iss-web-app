import User from "@/models/user";
import Picture from "@/models/picture";
import Post from "@/models/post";

export const user = new User({
  id: 1,
  name: "Кирилл Лапушинский",
  username: "givemepillow",
  avatarUrl: "https://i.pinimg.com/564x/d1/b7/c6/d1b7c6a8df97a572899e3ec048b4d46e.jpg",
  registeredAt: Date.now()
});


const picture1 = new Picture({
  id: 0,
  contentType: "gif",
  url: "https://i.pinimg.com/originals/8e/50/d2/8e50d212781cdc16c7efbef5563810ee.gif"
});
const picture2 = new Picture({
  id: 1,
  contentType: "jpg",
  url: "https://i.pinimg.com/564x/c3/56/82/c356820c6d97e811bca705426d92eb14.jpg"
});

const picture3 = new Picture({
  id: 2,
  contentType: "jpg",
  url: "https://i.pinimg.com/564x/23/72/74/237274c71929ed5cd06b8988cfc4d6f0.jpg"
});

const picture4 = new Picture({
  id: 3,
  contentType: "jpg",
  url: "https://i.pinimg.com/564x/6e/0a/ac/6e0aac344b1198fb586480d31d73cba7.jpg"
});

const picture5 = new Picture({
  id: 4,
  contentType: "jpg",
  url: "https://i.pinimg.com/564x/f8/98/10/f89810fb0ab14817d0fb0ae76d4438e7.jpg"
});


export const post1 = new Post({
  id: 0,
  user: user,
  pictures: [picture1],
  createdAt: Date.now(),
  editedAt: null,
  title: "Заголовок по умолчанию.",
  description: "Самое обыкновенное описание самого обыкновенного поста в самом обыкновенном веб-приложении."
});

export const post2 = new Post({
  id: 1,
  user: user,
  pictures: [picture2],
  createdAt: Date.now(),
  editedAt: null,
  title: "Заголовок по умолчанию.",
  description: "Самое обыкновенное описание самого обыкновенного поста в самом обыкновенном веб-приложении."
});


export const post3 = new Post({
  id: 2,
  user: user,
  pictures: [picture3],
  createdAt: Date.now(),
  editedAt: null,
  title: "Заголовок по умолчанию.",
  description: "Самое обыкновенное описание самого обыкновенного поста в самом обыкновенном веб-приложении."
});


export const post4 = new Post({
  id: 3,
  user: user,
  pictures: [picture4],
  createdAt: Date.now(),
  editedAt: null,
  title: "Заголовок по умолчанию.",
  description: "Самое обыкновенное описание самого обыкновенного поста в самом обыкновенном веб-приложении."
});

export const post5 = new Post({
  id: 4,
  user: user,
  pictures: [picture5],
  createdAt: Date.now(),
  editedAt: null,
  title: "Заголовок по умолчанию.",
  description: "Самое обыкновенное описание самого обыкновенного поста в самом обыкновенном веб-приложении."
});


export const examples = {
  0: post1, 1: post2, 2: post3, 3: post4, 4: post5
};