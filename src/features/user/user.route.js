import express from "express";
import validationOutput from "../../middlewares/validation.output.js";
import userController from "./user.controller.js";
import userValidator from "./user.validator.js";

const router = express.Router();

router
  .route("/:user_id")
  .get(userController.getUserById)
  .patch(
    userValidator.userUpdateValidator,
    validationOutput,
    userController.updateUser
  )
  .delete(userController.deleteUser);

router
  .route("/")
  .post(
    userValidator.userLoginValidator,
    validationOutput,
    userController.loginUser
  )
  .get(userController.getAllUsers);

export default router;
