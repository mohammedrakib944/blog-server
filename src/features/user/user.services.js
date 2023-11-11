import pool from "../../config/database.js";
import createError from "http-errors";
import Jwt from "jsonwebtoken";

const user_type = ["user", "admin"];

class UserServices {
  // create/login user
  async loginHandler({ name, email, photo = "" }) {
    const User = await pool.query(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);

    const jwtSecret = process.env.JWT_SECRET || "Rakib@123!";
    const token = Jwt.sign({ email, name }, jwtSecret, { expiresIn: "10d" });

    if (User[0].length > 0) {
      // If user already exist
      const result = {
        user: User[0][0],
        token,
      };
      return result;
    } else {
      // If no user found create one
      let result = await pool.query(
        `INSERT INTO users (name, email, photo, role) VALUES (?, ?, ?, ?)`,
        [name, email, photo, "user"]
      );

      let [user] = await pool.query(
        `SELECT * FROM users WHERE user_id = ?`,
        result[0].insertId
      );

      result = {
        user: user[0],
        token,
      };
      return result;
    }
  }

  // get all users
  async getAllUsers() {
    const result = await pool.query(`SELECT * FROM users`);
    return result[0];
  }

  // get user by id
  async getUserById(user_id) {
    const result = await pool.query(`SELECT * FROM users WHERE user_id = ?`, [
      user_id,
    ]);
    return result[0][0];
  }

  // update user
  async updateUser(
    { name, is_banned = false, occupation = "", role = "user" },
    user_id
  ) {
    if (!user_type.includes(role)) {
      throw createError.BadRequest("role must be user or admin");
    }
    const result = await pool.query(
      `UPDATE users SET name=?,occupation=?, is_banned=?, role=? WHERE user_id=?`,
      [name, occupation, is_banned, role, user_id]
    );
    return result[0];
  }

  // delete user
  async deleteUser(user_id) {
    if (!user_id) {
      throw createError.BadRequest("user_id is required!");
    }

    const result = await pool.query(`DELETE FROM users WHERE user_id=?`, [
      user_id,
    ]);
    return result[0];
  }
}

export default new UserServices();
