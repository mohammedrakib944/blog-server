import { StatusCodes } from "http-status-codes";
import userService from "./user.services.js";
import catchAsync from "../../helpers/catchAsync.js";
import success from "../../helpers/success.js";

class UserController {
  // get all users
  getAllUsers = catchAsync(async (req, res, next) => {
    const Users = await userService.getAllUsers();
    res.status(StatusCodes.OK).json(Users);
  });

  // get user by id
  getUserById = catchAsync(async (req, res, next) => {
    const user = await userService.getUserById(req.params.user_id);
    res.status(StatusCodes.OK).json(user);
  });

  // create user / login user
  loginUser = catchAsync(async (req, res, next) => {
    const UserInfo = await userService.loginHandler(req.body);
    res.status(StatusCodes.OK).json(UserInfo);
  });

  // update user
  updateUser = catchAsync(async (req, res, next) => {
    const { user_id } = req.params;
    await userService.updateUser(req.body, user_id);
    success(res, StatusCodes.OK, "User updated successfully");
  });

  // delete user
  deleteUser = catchAsync(async (req, res, next) => {
    const { user_id } = req.params;
    await userService.deleteUser(user_id);
    success(res, StatusCodes.OK, "User deleted successfully");
  });
}

export default new UserController();
