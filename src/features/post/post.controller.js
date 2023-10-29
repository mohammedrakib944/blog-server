import { StatusCodes } from "http-status-codes";
import postServices from "./post.services.js";
import success from "../../helpers/success.js";
import catchAsync from "../../helpers/catchAsync.js";

class PostController {
  // create post
  createPost = catchAsync(async (req, res, next) => {
    await postServices.createPost(req.body);
    success(res, StatusCodes.CREATED, "Post added success!");
  });

  // get all posts
  getAllPosts = catchAsync(async (req, res, next) => {
    const posts = await postServices.getAllPosts(req.params.page_number);
    res.status(StatusCodes.OK).json(posts);
  });

  // search posts
  searchPosts = catchAsync(async (req, res, next) => {
    const posts = await postServices.searchPosts(req.body.search_text);
    res.status(StatusCodes.OK).json(posts);
  });

  // get post by slug
  getPostBySlug = catchAsync(async (req, res, next) => {
    const post = await postServices.getPostBySlug(req.params.slug);
    res.status(StatusCodes.OK).json(post);
  });

  // update post by id
  updatePostById = catchAsync(async (req, res, next) => {
    await postServices.updatePostById(req.body, req.params.slug);
    success(res, StatusCodes.OK, "Post updated success!");
  });

  // increment view count
  incrementView = catchAsync(async (req, res, next) => {
    await postServices.incrementView(req.params.post_id);
    success(res, StatusCodes.OK);
  });

  // delete post by id
  deletePostById = catchAsync(async (req, res, next) => {
    await postServices.deletePostById(req.params.slug);
    success(res, StatusCodes.OK, "Post deleted success!");
  });
}

export default new PostController();
