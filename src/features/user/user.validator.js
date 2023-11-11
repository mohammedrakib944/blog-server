import { check } from "express-validator";

const userLoginValidator = [
  check("name").notEmpty().withMessage("name"),
  check("email").isEmail().withMessage("email is not valid!"),
];

const userUpdateValidator = [check("name").notEmpty().withMessage("name")];

export default {
  userLoginValidator,
  userUpdateValidator,
};
