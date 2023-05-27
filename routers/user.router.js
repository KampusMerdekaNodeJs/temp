const router = require("express").Router();
const UserController = require("../controllers/user.controller");

//user
router.post("/users/register", UserController.register);
router.post("/users/login", UserController.login);
router.put("/users", UserController.update);
router.delete("/users/:id", UserController.delete);
router.patch("/users/topup", UserController.topUp);
module.exports = router;
