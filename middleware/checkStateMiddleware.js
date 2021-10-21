import Errorhandler from "./../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";

function checkStateMiddleware(req, res, next) {
  try {
    const state = req.body.state;
    if (state !== process.env.STATE) {
      next(new Errorhandler("Invalid state", 401));
    } else {
      next();
    }
  } catch (error) {
    Logger.log("error", error, import.meta.url);
    next(new Errorhandler("Internal server error", 500));
  }
}

export default checkStateMiddleware;
