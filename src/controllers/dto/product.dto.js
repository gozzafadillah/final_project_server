class ProductDTO {
  constructor(data) {
    this.videoID = data.videoId;
    this.linkProduct = data.linkProduct;
    this.title = data.title;
    this.price = data.price;
  }
}

module.exports = ProductDTO;
