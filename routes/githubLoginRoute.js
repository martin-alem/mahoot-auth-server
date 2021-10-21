import express from "express";
import fetchGithubAccessTokenMiddleware from "./../middleware/fetchGithubAccessTokenMiddleware.js";
import fetchGithubUserInfoMiddleware from "./../middleware/fetchGithubUserInfoMiddleware.js";
import checkUserMiddleware from "./../middleware/checkUserMiddleware.js"
import githubLoginController from "../controller/githubLoginController.js";

const router = express.Router();

router.post("/auth", [fetchGithubAccessTokenMiddleware, fetchGithubUserInfoMiddleware, checkUserMiddleware, githubLoginController]);

router.use((error, req, res, next) => {
  console.log(error);
  res.status(error.statusCode).json({ status: "fail", statusCode: error.statusCode, message: error.message });
});

export default router;
