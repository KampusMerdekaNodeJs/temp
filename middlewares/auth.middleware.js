const jwt = require("jsonwebtoken");
const { User } = require("../models/index");
const AppError = require("../utils/app.error.middleware");
async function authMiddleware(req, res, next) {
  //write logic code here

  try {
    const token = req.headers["x-access-token"].split(" ");
    if (token[0] !== "Bearer") throw new Error("Invalid token");

    const result = jwt.verify(token[1], process.env.JWT_SECRET_KEY);

    // const resultData = await User.findAll({
    //   where: {
    //     id: "4d761d84-82fd-4bcf-b723-0b4aa8615969",
    //   },
    // });
    // console.log(resultData);
    // if (resultData.length === 0) {
    //   throw { name: "JWT Error", message: "Token invalid" };
    // }

    req.user = { id: result.id, email: result.email, role: result.role };
    next();
  } catch (err) {
    next(new AppError(err.message, 403));
  }

  //nextFunction()
}
module.exports = authMiddleware;
