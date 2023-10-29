import express from "express";
import userRouter from "./features/user/user.route.js";
import postRouter from "./features/post/post.route.js";

const router = express.Router();

// All routes
const defaultRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/post",
    route: postRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
