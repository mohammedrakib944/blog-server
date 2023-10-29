import express from "express";
import validationOutput from "../../middlewares/validation.output.js";
import postValidator from "./post.validator.js";
import postController from "./post.controller.js";

const router = express.Router();

router.patch("/view/:post_id", postController.incrementView);
router.get("/page/:page_number", postController.getAllPosts);
router.get("/search", postController.searchPosts);
router
  .route("/:slug")
  .get(postController.getPostBySlug)
  .patch(
    postValidator.updatePostValidator,
    validationOutput,
    postController.updatePostById
  )
  .delete(postController.deletePostById);

router
  .route("/")
  .post(
    postValidator.createPostValidator,
    validationOutput,
    postController.createPost
  )
  .get(postController.getAllPosts);

export default router;
