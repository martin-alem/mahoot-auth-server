import Errorhandler from "../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import jwt from "jsonwebtoken";

function linkedInLoginController(req, res, next) {
  try {
    const user = req.body.user;
    const accessToken = jwt.sign({ user_id: user["_id"] }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("_access_token", `${accessToken}`, { expires: new Date(Date.now() + 1 * 3600000), httpOnly: true });
    res.status(200).json({ status: "success", statusCode: 200, user_id: user["_id"] });
  } catch (error) {
    Logger.log("error", error, import.meta.url);
    next(new Errorhandler("Internal server error", 500));
  }
}

export default linkedInLoginController;
