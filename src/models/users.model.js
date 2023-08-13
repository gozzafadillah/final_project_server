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
});

const User = mongoose.model("User", userSchema);
module.exports = User;
