const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: function({ id, username, department }) {
    const payload = {
      sub: id,
      username,
      department
    };

    const options = {
      expiresIn: "1d"
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }
};
