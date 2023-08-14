const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    unique: true, // email must be unique
  },
  username: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    unique: true, // username must be unique
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  img: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
