import Errorhandler from "./../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";
import User from "./../model/User.js";
import { findOne, insertOne, findAndUpdate } from "./../database/query.js";

async function checkUserMiddleware(req, res, next) {
  try {
    const user = ({ firstName, lastName, emailAddress, image } = req.body.userProfile);
    const result = await findOne(User, { emailAddress: emailAddress });
    if (!result) {
      const newUser = await insertOne(User, user);
      req.body.user = newUser;
      next();
    } else {
      const existingUser = await findAndUpdate(User, { emailAddress: emailAddress }, { image: image });
      req.body.user = existingUser;
      next();
    }
  } catch (error) {
    Logger.log("error", error, import.meta.url);
    next(new Errorhandler("Internal server error", 500));
  }
}

export default checkUserMiddleware;
