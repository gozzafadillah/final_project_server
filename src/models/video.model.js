const { default: mongoose } = require("mongoose");

const videoSchema = new mongoose.Schema({
  urlImageThumbnail: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
