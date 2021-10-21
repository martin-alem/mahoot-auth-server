import fetch from "./../utils/fetch.js";
import Errorhandler from "./../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";

async function fetchGithubAccessTokenMiddleware(req, res, next) {
  try {
    const url = `https://github.com/login/oauth/access_token?client_id=${process.env.GH_CLIENT_ID}&client_secret=${process.env.GH_CLIENT_SECRET}&code=${req.body.code}`;
    const method = "POST";
    const option = {
      headers: {
        accept: "application/json",
      },
      data: {
        // code: req.body.code,
        // client_id: process.env.GH_CLIENT_ID,
        // client_secret: process.env.GH_CLIENT_SECRET,
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

export default fetchGithubAccessTokenMiddleware;
