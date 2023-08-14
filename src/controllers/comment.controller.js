const CommentBusiness = require("../business/comment.business");
const UserBusiness = require("../business/user.business");
const VideoBusiness = require("../business/video.business");
const ConfigPusher = require("../config/pusher.config");
const { verifyToken } = require("../utlis/jwt.util");

class CommentController {
  constructor() {
    this.commentBusiness = new CommentBusiness();
    this.userBusiness = new UserBusiness();
    this.video = new VideoBusiness();
  }

  async createComment(req, res) {
    try {
      // data body and header
      const { videoId } = req.params;
      const { body: comment } = req;
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const pusher = ConfigPusher();
      // check token
      const jwt = verifyToken(token);
      // check user
      const user = await this.userBusiness.getUserById(jwt.userId);
      if (!user) {
        throw new Error("user not found");
      }
      // check video
      const video = this.video.getVideoById(videoId);
      if (!video) {
        throw new Error("video not found");
      }
      // merge comment
      comment.email = user.email;
      comment.username = user.username;
      comment.videoId = videoId;
      // create comment
      const createdComment = await this.commentBusiness.createComment(comment);
      pusher.trigger("comments", "new-comment", {
        comment: createdComment,
      });
      const response = {
        message: "success created comment",
      };
      res.status(201).json(response);
    } catch (error) {
      res
        .status(400)
        .json({ message: "failed created comment", error: error.message });
    }
  }

  async getCommentByVideoId(req, res) {
    try {
      const { videoId } = req.params;
      const comment = await this.commentBusiness.getCommentByVideoId(videoId);
      const response = {
        message: "success get comment by video id",
        data: comment.map((c) => {
          return {
            comment: c.comment,
            username: c.username,
            email: c.email,
            timestamp: c.timestamp,
          };
        }),
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CommentController;
