export default class Picture {
  constructor(
    {
      id = "",
      height = 0,
      width = 0,
      format = "png",
      size = 0
    } = {}
  ) {
    this.id = id;
    this.format = format;
    this.height = height;
    this.width = width;
    this.size = size;
  }
}