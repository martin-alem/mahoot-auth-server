import fetch from "./../utils/fetch.js";

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
      next(new Error("Couldn't fetch access token"));
    } else {
      req.body.data = response.data;
      next();
    }
  } catch (error) {
    console.log(error);
    next(new Error("Internal server error"));
  }
}

export default fetchAccessTokenMiddleware;
