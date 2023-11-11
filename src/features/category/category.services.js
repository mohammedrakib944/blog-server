import pool from "../../config/database.js";
import createError from "http-errors";

class CategoryServices {
  // create category
  async createCategory(name) {
    if (!name) throw createError.BadRequest("No category name found!");

    // check if category name already exists
    const [category] = await pool.query(
      `SELECT * FROM category WHERE category_name = ?`,
      [name]
    );
    if (category.length > 0) {
      throw createError.Conflict(`Category '${name}' already exists!`);
    }
    const [result] = await pool.query(
      `INSERT INTO category (category_name) VALUES (?)`,
      [name]
    );
    return result;
  }

  // get all categories
  async getCategories() {
    const [categories] = await pool.query(`SELECT * FROM category`);
    return categories;
  }

  // get category by id
  async getCategoryById(id) {
    const [category] = await pool.query(
      `SELECT * FROM category WHERE category_id = ?`,
      [id]
    );
    return category;
  }

  // update category
  /**
   * @param {id, name} param0
   * @returns
   */
  async updateCategory({ id, name }) {
    if (!name) throw createError.BadRequest("No category name found!");
    const [result] = await pool.query(
      `UPDATE category SET category_name = ? WHERE category_id = ?`,
      [name, id]
    );
    return result;
  }

  // update status category
  /**
   * @param {id, hide} param0
   * @returns
   */
  async updateStatus({ id, hide }) {
    if (!id) throw createError.BadRequest("id and hide=true/false required!");
    const [result] = await pool.query(
      `UPDATE category SET is_hide=? WHERE category_id = ?`,
      [hide, id]
    );
    return result;
  }

  // delete category
  async deleteCategory(id) {
    const [result] = await pool.query(
      `DELETE FROM category WHERE category_id = ?`,
      [id]
    );
    return result;
  }
}

export default new CategoryServices();
