import Errorhandler from "./../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";

function checkUserMiddleware(req, res, next) {
  try {
    next();
  } catch (error) {
    Logger.log("error", error, import.meta.url);
    next(new Errorhandler("Internal server error", 500));
  }
}

export default checkUserMiddleware;
