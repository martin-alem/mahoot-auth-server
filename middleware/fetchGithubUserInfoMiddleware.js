import Errorhandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import fetch from "../utils/fetch.js";

async function fetchUserInfoMiddleware(req, res, next) {
  try {
    const profileUrl = "https://api.github.com/user";
    const method = "GET";
    const option = {
      data: {},
      headers: {
        Authorization: `Token ${req.body.data.access_token}`,
      },
    };
    const userProfile = await fetch(profileUrl, method, option);
    if (userProfile.statusText === "OK" && userProfile.status === 200) {
      const { name, avatar_url: image, email } = userProfile.data;
      if (email === null) {
        res.status(200).json({ status: "partial", statusCode: 200, message: "You Github account email address is private. consider using LinkedIn" });
      } else {
        const [firstName, lastName] = name.split(" ");
        req.body.userProfile = { firstName, lastName, image };
        req.body.userEmail = { emailAddress: email };
        next();
      }
    } else {
      next(new Errorhandler("Unable to fetch user profile", 403));
    }
  } catch (error) {
    Logger.log("error", error, import.meta.url);
    next(new Errorhandler("Internal server error", 500));
  }
}

export default fetchUserInfoMiddleware;
