const ProductRepository = require("../repository/product.repo");

class ProductBusiness {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async getProducts() {
    try {
      const products = await this.productRepository.getAllProducts();
      return products;
    } catch (error) {
      throw error;
    }
  }
  async getProduct(id) {
    try {
      const product = await this.productRepository.getProductById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async getProductsByVideoId(videoId) {
    try {
      const product = await this.productRepository.getProductsByVideoId(
        videoId
      );
      return product;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(product) {
    try {
      const newProduct = await this.productRepository.store(product);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductBusiness;
