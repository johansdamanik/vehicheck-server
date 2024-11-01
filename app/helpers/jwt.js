const jwt = require("jsonwebtoken");

const SECRET_KEY = "secret";

module.exports = {
  decodeToken: (token) => jwt.verify(token, SECRET_KEY),
};
