import express from "express";
import UserController from "./user.controller.js";
import userValidator from "./user.validator.js";
import validationOutput from "../../middlewares/validation.output.js";

const router = express.Router();
const userController = new UserController();

router
  .route("/")
  .post(
    userValidator.userLoginValidator,
    validationOutput,
    userController.loginUser
  )
  .get(userController.getAllUsers);

router
  .route("/:user_id")
  .patch(
    userValidator.userUpdateValidator,
    validationOutput,
    userController.updateUser
  )
  .delete(userController.deleteUser);

export default router;
