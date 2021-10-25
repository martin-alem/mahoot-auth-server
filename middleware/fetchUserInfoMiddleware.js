import Errorhandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import fetch from "../utils/fetch.js";
import { extractProfileData, extractEmailData } from "../utils/extractData.js";

async function fetchUserInfoMiddleware(req, res, next) {
  try {
    const profileUrl = "https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))";
    const emailUrl = "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))";
    const method = "GET";
    const option = {
      data: {},
      headers: {
        Authorization: `Bearer ${req.body.data.access_token}`,
      },
    };
    const [userProfile, userEmail] = await Promise.all([fetch(profileUrl, method, option), fetch(emailUrl, method, option)]);

    if (userProfile.statusText === "OK") {
      req.body.userProfile = extractProfileData(userProfile.data);
    } else {
      next(new Errorhandler("Unable to fetch user profile", 403));
    }

    if (userEmail.statusText === "OK") {
      req.body.userEmail = extractEmailData(userEmail.data);
    } else {
      next(new Errorhandler("Unable to fetch user email", 403));
    }
    next();
  } catch (error) {
    Logger.log("error", error, import.meta.url);
    next(new Errorhandler("Internal server error", 500));
  }
}

export default fetchUserInfoMiddleware;
