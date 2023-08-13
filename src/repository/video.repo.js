const videoSchema = require("../models/video.model");

class VideoRepository {
  constructor() {
    this.videos = videoSchema;
  }

  async getAllVideos() {
    try {
      const videos = await this.videos.find();
      return videos;
    } catch (error) {
      throw error;
    }
  }
  async getVideoById(id) {
    try {
      const video = await this.videos.findById(id);
      return video;
    } catch (error) {
      console.error("Error saat mencari video berdasarkan ID:", error);
      throw error;
    }
  }
  async store(video) {
    try {
      const newVideo = await this.videos.create(video);
      return newVideo;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = VideoRepository;
