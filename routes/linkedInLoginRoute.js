import express from "express";
import linkedInLoginController from "./../controller/linkedInLoginController.js";
import checkStateMiddleware from "./../middleware/checkStateMiddleware.js";
import fetchAccessTokenMiddleware from "./../middleware/fetchAccessTokenMiddleware.js";
import fetchUserInfoMiddleware from "../middleware/fetchUserInfoMiddleware.js";
import checkUserMiddleware from "./../middleware/checkUserMiddleware.js";

const router = express.Router();

router.post("/linkedin/auth", [checkStateMiddleware, fetchAccessTokenMiddleware, fetchUserInfoMiddleware, checkUserMiddleware, linkedInLoginController]);

router.all("*", (error, req, res, next) => {
  res.json({ status: 404, error: error.message });
});

export default router;
