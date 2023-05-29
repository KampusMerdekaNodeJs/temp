const bcrypt = require("bcrypt");

function validateData(data, hash) {
  return bcrypt.compareSync(data, hash);
}

module.exports = validateData;
