function linkedInLoginController(req, res, next) {
  res.json({ ...req.body.userProfile, ...req.body.userEmail });
}

export default linkedInLoginController;
