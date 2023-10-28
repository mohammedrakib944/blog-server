import { StatusCodes } from "http-status-codes";
import UserServices from "./user.services.js";
import success from "../../helpers/success.js";

const userService = new UserServices();

class UserController {
  // get all users
  getAllUsers = async (req, res, next) => {
    try {
      const Users = await userService.getAllUsers();
      res.status(StatusCodes.OK).json(Users);
    } catch (error) {
      next(error);
    }
  };

  // create user
  loginUser = async (req, res, next) => {
    try {
      const { name, email } = req.body;
      const UserInfo = await userService.loginHandler({ name, email });
      res.status(StatusCodes.OK).json(UserInfo);
    } catch (error) {
      next(error);
    }
  };

  // update user
  updateUser = async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const { name, is_banned, role = "user" } = req.body;
      await userService.updateUser({ user_id, name, is_banned, role });
      success(res, StatusCodes.OK, "User updated successfully");
    } catch (error) {
      next(error);
    }
  };

  // delete user
  deleteUser = async (req, res, next) => {
    try {
      const { user_id } = req.params;
      await userService.deleteUser(user_id);
      success(res, StatusCodes.OK, "User deleted successfully");
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
