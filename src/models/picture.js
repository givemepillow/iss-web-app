export default class Picture {
  constructor(
    {
      id = 0,
      url = "",
      height = 0,
      width = 0,
      contentType = "png",
      size = 0,
      originalHeight = 0,
      originalWidth = 0,
      originalSize = 0
    } = {}
  ) {
    this.id = id;
    this.url = url;
    this.contentType = contentType;
    this.height = height;
    this.width = width;
    this.size = size;
    this.originalHeight = originalHeight;
    this.originalWidth = originalWidth;
    this.originalSize = originalSize;
  }
}