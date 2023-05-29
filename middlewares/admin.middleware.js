const AppError = require("../utils/app.error.middleware");

function adminMiddleware(req, res, next) {
  try {
    const { role } = req.user;

    //TODO: change the role to admin
    if (role === "customer")
      return next(new AppError("Only admin can access this route", 403));
    next();
  } catch {
    res.send({
      status: "failed",
      message: "Forbidden Request!",
    });
  }
}

module.exports = adminMiddleware;
