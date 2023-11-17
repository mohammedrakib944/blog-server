import { check } from "express-validator";

const createCommentValidator = [
  check("user_id").notEmpty().withMessage("user_id"),
  check("user_name").notEmpty().withMessage("user_name"),
  check("user_photo").notEmpty().withMessage("user_photo"),
  check("post_id").notEmpty().withMessage("post_id"),
  check("comment").notEmpty().withMessage("comment"),
];

export default {
  createCommentValidator,
};
