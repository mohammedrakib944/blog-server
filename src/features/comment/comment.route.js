import express from "express";
import commentValidation from "./comment.validator.js";
import validationOutput from "../../middlewares/validation.output.js";
import commentController from "./comment.controller.js";

const router = express.Router();

router
  .route("/:post_id")
  .get(commentController.getCommentsByPostId)
  .delete(commentController.deleteCommentById);

router
  .route("/")
  .post(
    commentValidation.createCommentValidator,
    validationOutput,
    commentController.createComment
  );

export default router;
