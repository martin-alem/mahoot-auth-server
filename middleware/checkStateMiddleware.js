function checkStateMiddleware(req, res, next) {
  const state = req.body.state;
  if (state !== process.env.STATE) {
    next(new Error("Invalid state"));
  } else {
    next();
  }
}

export default checkStateMiddleware;
