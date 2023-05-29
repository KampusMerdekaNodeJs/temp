const express = require("express");
const router = express.Router();
const app = express();
const cateController = require("../controllers/categories.controller");
const adminMiddleware = require("../middlewares/admin.middleware");

router.use(adminMiddleware);

router
  .route("/")
  .post(cateController.insertCategories)
  .get(cateController.getCategories);

router
  .route("/:categoryId")
  .patch(cateController.patchCategory)
  .delete(cateController.deleteCategory);

module.exports = router;
