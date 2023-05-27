const router = require("express").Router();
const user = require("./user.router");
const categoryRoutes = require("./categoryRouters");
const productRoutes = require("./productRouters");

router.use("/", user);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);

module.exports = router;
