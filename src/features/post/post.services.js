import pool from "../../config/database.js";
import createError from "http-errors";
import slugify from "slugify";

class PostServices {
  // create post
  async createPost({ user_id, cover_image, title, content, category }) {
    const slug = slugify(title, { lower: true });
    const result = await pool.query(
      `INSERT INTO posts (u_id,cover_image, title, slug, content, category) VALUES (?,?, ?, ?, ?, ?)`,
      [user_id, cover_image, title, slug, content, category]
    );
    return result[0];
  }

  // get all posts by page number
  async getAllPosts(page_number = 0) {
    const result = await pool.query(
      `SELECT posts.*, users.user_id, users.name, users.photo
      FROM posts INNER JOIN users
      ON posts.u_id = users.user_id ORDER BY date DESC LIMIT 20 OFFSET ?`,
      [page_number * 20]
    );
    return result[0];
  }

  // get posts by user id
  async getPostsByUserId(user_id) {
    const result = await pool.query(
      `SELECT posts.*, users.user_id, users.name, users.photo
       FROM posts INNER JOIN users
       ON posts.u_id = users.user_id
       WHERE u_id = ? ORDER BY date DESC`,
      [user_id]
    );
    return result[0];
  }

  // search posts by title
  async searchPosts(search_text) {
    if (!search_text) throw createError.BadRequest("No search text found!");
    const result = await pool.query(
      `SELECT * FROM posts WHERE title LIKE '%${search_text}%' OR category LIKE '%${search_text}%' ORDER BY date DESC LIMIT 50`
    );
    return result[0];
  }

  // get post by slug
  async getPostBySlug(slug) {
    const result = await pool.query(`SELECT * FROM posts WHERE slug = ?`, [
      slug,
    ]);
    return result[0];
  }

  // All posts view of a user
  async getPostsViewsByUserId(user_id) {
    const result = await pool.query(
      `SELECT sum(views) as total_view FROM posts WHERE u_id = ?`,
      [user_id]
    );
    return result[0];
  }

  // get featured posts
  async getFeaturedPosts() {
    const result = await pool.query(
      `SELECT posts.*, users.user_id, users.name, users.photo
      FROM posts INNER JOIN users
      ON posts.u_id = users.user_id ORDER BY posts.views DESC LIMIT 3`
    );
    return result[0];
  }

  // update post by id
  async updatePostById({ title, ...rest }, post_id) {
    if (!title) throw createError.BadRequest("title is required!");

    const slug = slugify(title, { lower: true });

    const updateFields = Object.keys(rest)
      .map((key) => `${key}=?`)
      .join(", ");

    const sqlQuery = `UPDATE posts SET ${updateFields}, slug=? WHERE post_id = ?`;

    const result = await pool.query(sqlQuery, [
      ...Object.values(rest),
      slug,
      post_id,
    ]);
    return result[0];
  }

  // top 10 author by views
  async getTopAuthors() {
    const result = await pool.query(
      ` SELECT users.*, SUM(posts.views) AS total_view_count
        FROM users
        JOIN posts ON users.user_id = posts.u_id
        GROUP BY users.user_id
        ORDER BY total_view_count DESC
        LIMIT 10;`
    );

    return result[0];
  }

  // top 10 posts by views
  async getTopTenPosts() {
    const result = await pool.query(
      `SELECT posts.*, users.user_id, users.name, users.photo
      FROM posts INNER JOIN users
      ON posts.u_id = users.user_id ORDER BY posts.views DESC LIMIT 3`
    );
    return result[0];
  }

  // increment view count of a post
  async incrementView(post_id) {
    const result = await pool.query(
      `UPDATE posts SET views = views + 1 WHERE post_id = ?`,
      [post_id]
    );
    return result[0];
  }

  // delete post by id
  async deletePostById(slug) {
    const result = await pool.query(`DELETE FROM posts WHERE post_id = ?`, [
      slug,
    ]);
    return result[0];
  }
}

export default new PostServices();
