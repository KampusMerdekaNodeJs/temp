const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");

const userController = require("../controllers/users.controller");

router
  .route("/:userId")
  .put(authMiddleware, userController.updateUser)
  .delete(authMiddleware, userController.deleteUser);

router.route("/topup").patch(authMiddleware, userController.updateBalance);
router.route("/register").post(userController.createUser);
router.route("/login").post(userController.loginUser);

module.exports = router;
