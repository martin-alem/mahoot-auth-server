import Errorhandler from "../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";
import jwt from "jsonwebtoken";

function linkedInLoginController(req, res, next) {
  try {
    const user = req.body.user;
    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("_access_token", `Bearer ${accessToken}`, { domain: "mahoot.io", expires: new Date(Date.now() + 1 * 3600000), httpOnly: true, sameSite: false });
    res.status(200).json({ status: "success", statusCode: 200, data: user });
  } catch (error) {
    Logger.log("error", error, import.meta.url);
    next(new Errorhandler("Internal server error", 500));
  }
}

export default linkedInLoginController;
