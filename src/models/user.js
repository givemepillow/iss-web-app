export default class User {
  constructor(
    {
      id = 0,
      name = "Kirill Lapushinskiy",
      username = "kirilllapushinskiy",
      email = "kirilllapushinskiy@yahoo.com",
      registeredAt = "",
    } = {}
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.registeredAt = registeredAt;
    this.email = email;
  }
}