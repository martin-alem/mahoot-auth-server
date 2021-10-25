import Errorhandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";

function checkStateMiddleware(req, res, next)
{
  console.log("INSIDE CHECK STATUS MIDDLEWARE")
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
