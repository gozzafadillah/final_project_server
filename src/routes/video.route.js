const express = require("express");
const VideoController = require("../controllers/video.controller");

function SetupVideoRoutes() {
  const router = express.Router();
  const videoController = new VideoController();
  router.get("/", videoController.getAllVideos.bind(videoController));
  router.get("/:id", videoController.getVideoById.bind(videoController));
  router.post("/", videoController.createVideo.bind(videoController));
  return router;
}
module.exports = SetupVideoRoutes;
