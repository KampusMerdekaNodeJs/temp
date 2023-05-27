const router = require("express").Router();
const {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  GetOneProductById,
} = require("../controllers/productController");


router.post("/", createProduct);
router.get("/", getAllProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", GetOneProductById);

module.exports = router;
