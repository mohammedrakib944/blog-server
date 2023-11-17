import catchAsync from "../../helpers/catchAsync.js";
import success from "../../helpers/success.js";
import { StatusCodes } from "http-status-codes";
import commentServices from "./comment.services.js";

class CommentController {
  // create comment
  createComment = catchAsync(async (req, res, next) => {
    const result = await commentServices.createComment(req.body);
    success(res, StatusCodes.CREATED, "Comment created successfully");
  });

  // get comments by post id
  getCommentsByPostId = catchAsync(async (req, res, next) => {
    const result = await commentServices.getCommentsByPostId(
      req.params.post_id
    );
    res.status(StatusCodes.OK).json(result);
  });

  // delete comment by id
  deleteCommentById = catchAsync(async (req, res, next) => {
    await commentServices.deleteCommentById(req.params.post_id);
    success(res, StatusCodes.OK, "Comment deleted successfully");
  });
}

export default new CommentController();
