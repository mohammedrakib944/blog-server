import { check } from "express-validator";

const createPostValidator = [
  check("user_id").notEmpty().withMessage("user_id"),
  check("cover_image").notEmpty().withMessage("cover_image"),
  check("title").notEmpty().withMessage("title"),
  check("content").notEmpty().withMessage("content"),
  check("category").notEmpty().withMessage("category"),
];

export default {
  createPostValidator,
};
