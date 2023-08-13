const ProductBusiness = require("../business/product.business");
const VideoBusiness = require("../business/video.business");

class VideoController {
  constructor() {
    this.videoService = new VideoBusiness();
    this.productService = new ProductBusiness();
  }

  async getAllVideos(_, res) {
    try {
      const videos = await this.videoService.getAllVideos();
      const response = {
        count: videos.length,
        videos: videos.map((video) => {
          return {
            videoID: video._id,
            title: video.title,
            urlImageThumbnail: video.urlImageThumbnail,
            videoUrl: video.videoUrl,
          };
        }),
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getVideoById(req, res) {
    try {
      const video = await this.videoService.getVideoById(req.params.id);
      const product = await this.productService.getProductsByVideoId(video._id);
      const response = {
        message: "Get video successfully",
        video: { title: video.title, videoUrl: video.videoUrl },
        product: product,
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async createVideo(req, res) {
    try {
      const video = await this.videoService.createVideo(req.body);
      req.body.product.videoId = video._id;
      await this.productService.createProduct(req.body.product);
      const response = {
        message: "Create video successfully",
        video: video,
      };
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = VideoController;
