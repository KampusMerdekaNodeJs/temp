const router = require("express").Router();
const adminMiddleware = require("../middlewares/admin.middleware");
const productController = require("../controllers/products.controller");

//admin middleware still has an error

router
  .route("/")
  .get(productController.getAllProducts)
  .post(adminMiddleware, productController.createProduct);

router
  .route("/:prodId")
  .put(adminMiddleware, productController.updateProductt)
  .delete(adminMiddleware, productController.deleteProduct)
  .patch(adminMiddleware, productController.updateProductCategoryID);

module.exports = router;
