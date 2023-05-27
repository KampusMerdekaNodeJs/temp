const jwt = require("jsonwebtoken");
const SECRET_KEY = "rahasia";

function generateToken(payload) {
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
}
function verifyToken(token) {
  const decode = jwt.verify(token, SECRET_KEY);
  return decode;
}
module.exports = { generateToken, verifyToken };