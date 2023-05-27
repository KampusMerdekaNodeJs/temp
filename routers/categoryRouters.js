const router = require("express").Router();
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.post("/", createCategory);
router.get("/", getAllCategories);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.put("/:id");

module.exports = router;
