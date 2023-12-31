import express from "express";
import validationOutput from "../../middlewares/validation.output.js";
import postValidator from "./post.validator.js";
import postController from "./post.controller.js";

const router = express.Router();

router.patch("/view/:post_id", postController.incrementView);
router.patch("/status/:post_id", postController.updatePostIsHide);
router.get("/views/:user_id", postController.getPostsViewsByUserId);
router.get("/page/:page_number", postController.getAllPosts);
router.get("/user/:user_id", postController.getPostsByUserId);
router.get("/dashboard", postController.dashboardDetails);
router.get("/search", postController.searchPosts);
router.get("/featured", postController.getFeaturedPosts);
router.get("/top_authors", postController.getTopAuthorsByViews);
router.get("/top_ten", postController.getTopTenPostsByViews);
router
  .route("/:slug")
  .get(postController.getPostBySlug)
  .patch(postController.updatePostById)
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
