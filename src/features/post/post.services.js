import pool from "../../config/database.js";
import createError from "http-errors";
import slugify from "slugify";

class PostServices {
  // create post
  async createPost({ user_id, cover_image, title, content, category, tags }) {
    const slug = slugify(title, { lower: true }) + "-" + user_id;
    const result = await pool.query(
      `INSERT INTO posts (u_id,cover_image, title, slug, content, category, tags) VALUES (?,?, ?, ?, ?, ?,?)`,
      [user_id, cover_image, title, slug, content, category, tags]
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
      `SELECT posts.*, users.user_id, users.name, users.photo
      FROM posts INNER JOIN users
      ON posts.u_id = users.user_id
      WHERE title LIKE '%${search_text}%' OR tags LIKE '%${search_text}%' ORDER BY date DESC LIMIT 30`
    );
    return result[0];
  }

  // get post by slug
  async getPostBySlug(slug) {
    const [article] = await pool.query(`SELECT * FROM posts WHERE slug = ?`, [
      slug,
    ]);

    const [result] = await pool.query(
      `SELECT 
    user_id, name, photo, occupation
    FROM users WHERE user_id = ?`,
      [article[0].u_id]
    );

    return { ...article[0], author: result[0] };
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

    const slug = slugify(title, { lower: true }) + "-" + post_id;

    const updateFields = Object.keys(rest)
      .map((key) => `${key}=?`)
      .join(", ");

    const sqlQuery = `UPDATE posts SET title=?, ${updateFields}, slug=? WHERE post_id = ?`;

    const result = await pool.query(sqlQuery, [
      title,
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

  // dashboard details
  async dashboardDetails() {
    const usersSql = `SELECT COUNT(user_id) AS total_users,
                      SUM(CASE WHEN is_banned = 1 THEN 1 ELSE 0 END) AS banned_users
                      FROM users;`;

    const postsSql = `SELECT COUNT(post_id) AS total_posts, SUM(views) AS total_views FROM posts`;

    const [result] = await pool.query(usersSql);
    const [result2] = await pool.query(postsSql);

    return { ...result2[0], ...result[0] };
  }

  // delete post by id
  async deletePostById(slug) {
    // delete all comments with this post id
    await pool.query(`DELETE FROM comments WHERE post_id = ?`, [slug]);
    const result = await pool.query(`DELETE FROM posts WHERE post_id = ?`, [
      slug,
    ]);
    return result[0];
  }
}

export default new PostServices();
