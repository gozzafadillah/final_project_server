const express = require("express");
const CommentController = require("../controllers/comment.controller");
const { authenticateToken } = require("../utlis/jwt.util");

function SetupCommentRoute() {
  const router = express.Router();
  const commentController = new CommentController();

  router.get(
    "/:videoId",
    commentController.getCommentByVideoId.bind(commentController)
  );
  router.post(
    "/:videoId",
    authenticateToken,
    commentController.createComment.bind(commentController)
  );
  return router;
}

module.exports = SetupCommentRoute;
