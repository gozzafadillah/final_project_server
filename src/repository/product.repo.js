const productSchema = require("../models/product.model");

class ProductRepository {
  constructor() {
    this.products = productSchema;
  }

  async getAllProducts() {
    try {
      const products = await this.products.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const product = await this.products.findById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async getProductsByVideoId(videoId) {
    try {
      const product = await this.products.find({ videoId });
      return product;
    } catch (error) {
      throw error;
    }
  }

  async store(product) {
    try {
      const newProduct = await this.products.create(product);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductRepository;
