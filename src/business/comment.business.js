const commentRepository = require("../repository/comment.repo");

class CommentBusiness {
  constructor() {
    this.commentRepo = new commentRepository();
  }

  async createComment(comment) {
    try {
      await this.commentRepo.createComment(comment);
      return comment;
    } catch (error) {
      throw error;
    }
  }

  async getCommentByVideoId(videoId) {
    try {
      return await this.commentRepo.getCommentByVideoId(videoId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CommentBusiness;
