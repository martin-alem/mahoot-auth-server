import fetch from "./../utils/fetch.js";
import Errorhandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js"

async function fetchAccessTokenMiddleware(req, res, next) {
  try {
    const url = "https://www.linkedin.com/oauth/v2/accessToken";
    const method = "POST";
    const option = {
      "content-type": "application/x-www-form-urlencoded",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: {
        grant_type: process.env.GRANT_TYPE,
        code: req.body.code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      },
    };
    const response = await fetch(url, method, option);

    if (response.status !== 200) {
      next(new Errorhandler("Could not fetch access token", 403));
    } else {
      req.body.data = response.data;
      next();
    }
  } catch (error) {
    Logger.log("error", error, import.meta.url);
    next(new Errorhandler("Internal server error", 500));
  }
}

export default fetchAccessTokenMiddleware;
