import express from "express";
import categoryController from "./category.controller.js";

const router = express.Router();

router.patch("/status", categoryController.updateStatus);

router
  .route("/:id")
  .get(categoryController.getCategoryById)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

router
  .route("/")
  .get(categoryController.getCategories)
  .post(categoryController.createCategory);

export default router;
