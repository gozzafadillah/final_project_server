const commentSchema = require("../models/comment.model");

class CommentRepository {
  constructor() {
    this.comment = commentSchema;
  }

  async createComment(comment) {
    const res = await this.comment.create(comment);

    return res;
  }

  async getCommentByVideoId(videoId) {
    return await this.comment.find({ videoId });
  }
}

module.exports = CommentRepository;
