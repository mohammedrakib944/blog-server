import express from "express";
import routes from "./router.js";
import cors from "cors";
// import morgan from "morgan"; // for development

const app = express();

// parse json request body
app.use(express.json());

// user morgran
// app.use(morgan("dev"));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(
  cors({
    origin: ["http://localhost:3000", "https://rakib-blog.vercel.app"],
    credentials: true,
  })
);

// api routes
app.use("/api/", routes);

// NOT FOUND URL
app.use("/*", (req, res, next) => {
  next("URL not found!");
});

// Server ERROR HANDER
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || err || "Server Error!";
  return res.status(statusCode).json({
    sucess: false,
    message: errorMessage,
  });
});

export default app;
