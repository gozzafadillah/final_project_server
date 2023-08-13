const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
  videoId: {
    type: String,
  },
  linkProduct: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
