const ProductBusiness = require("../business/product.business");
const ProductsDto = require("./dto/product.dto");

class ProductController {
  constructor() {
    this.productService = new ProductBusiness();
  }
  async getProducts(_, res) {
    const products = await this.productService.getProducts();
    const response = {
      data: products.map((product) => new ProductsDto(product)),
      message: "Get all products successfully",
    };
    res.json(response);
  }
  async getProduct(req, res) {
    const { id } = req.params;
    const product = await this.productService.getProduct(id);
    res.json(product);
  }

  async createProduct(req, res) {
    const { body: product } = req;
    const createdProduct = await this.productService.createProduct(product);
    res.status(201).json(createdProduct);
  }

  async addByVideoId(req, res) {
    try {
      const { videoId } = req.params;
      const { body } = req;
      body.videoId = videoId;
      const addProduct = await this.productService.createProduct(body);
      const response = {
        message: "Add product successfully",
        data: addProduct,
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
