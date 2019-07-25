const jwt = require('jsonwebtoken');

module.exports = {
  validRegisterBody: function(req, res, next) {
    let { username, password, department } = req.body;

    if (!username || !password || !department) {
      return res.status(400).json({
        message: "Missing required fields username, password or department"
      });
    }
    req.newUser = req.body;
    next();
  },
  validLoginBody: function(req, res, next) {
    let { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Missing required fields username or password" });
    }
    req.user = req.body;
    next();
  },
  userIsAuthed: function(req, res, next) {
    const authHeaderIsPresent = req.headers.authorization;
    if (authHeaderIsPresent) {
      jwt.verify(
        authHeaderIsPresent,
        process.env.JWT_SECRET,
        (err, decodedToken) => {
          if (err) {
            res.status(403).json({ message: "User not authorized" });
          } else {
            req.decodedToken = decodedToken;
            next();
          }
        }
      );
    } else {
      res.status(401).json({ message: "Authorization header not present" });
    }
  }
};