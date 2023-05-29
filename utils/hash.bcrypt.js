const bcrypt = require("bcrypt");

function hashingData(data) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(data, salt);

  return hash;
}

module.exports = hashingData;
