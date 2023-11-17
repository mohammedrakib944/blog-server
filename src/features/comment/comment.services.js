import pool from "../../config/database.js";
import createError from "http-errors";

class CommentServices {
  // create comment
  async createComment(data) {
    const { user_id, user_name, user_photo, post_id, comment } = data;
    const [result] = await pool.query(
      `INSERT INTO comments (user_id, user_name, user_photo,post_id,comment) VALUES (?,?,?,?,?)`,
      [user_id, user_name, user_photo, post_id, comment]
    );
    return result;
  }

  // get comments by post id
  async getCommentsByPostId(post_id) {
    const [result] = await pool.query(
      `SELECT * FROM comments WHERE post_id = ?`,
      [post_id]
    );
    return result;
  }

  // delete comment by id
  async deleteCommentById(comment_id) {
    const [result] = await pool.query(
      `DELETE FROM comments WHERE comment_id = ?`,
      [comment_id]
    );
    return result;
  }
}

export default new CommentServices();
