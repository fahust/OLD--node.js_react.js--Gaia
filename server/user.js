var jwt = require("jsonwebtoken");
class User {
  constructor(signed) {
    this.signed = signed;
  }

  createUser(req) {
    jwt.sign({ user: req.body.user.username, iat: Date.now() }, this.signed);
  }
}

module.exports = User;
