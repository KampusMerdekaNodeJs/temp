const router = require("express").Router();
const thController = require("../controllers/transactions.controller");
const adminMiddleware = require("../middlewares/admin.middleware");

router.route("/").post(thController.createTransactions);

router.route("/user").get(thController.transactionUserHistories);

router
  .route("/admin")
  .get(adminMiddleware, thController.transactionAdminHistories);

router
  .route("/:transactionId")
  .get(adminMiddleware, thController.getSpecificTranscations);

module.exports = router;
