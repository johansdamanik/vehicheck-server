const { decodeToken } = require("../helpers/jwt");
const Staff = require("../models/Staff");
const User = require("../models/User");

async function appAuthentication(access_token) {
  try {
    let payload = decodeToken(access_token);
    // console.log(payload.id);
    let user = await User.findById(payload.id);
    let staff = await Staff.findById(payload.id);
    return user || staff;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  appAuthentication,
};
