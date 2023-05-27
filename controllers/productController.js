const { Product } = require("../models");

class ProductController {
  static async createProduct(req, res) {
    try {
      const { title, price, stock, CategoryId } = req.body;

      const product = await Product.create({ title, price, stock, CategoryId });
      if (product) {
        return res.status(201).json({ product });
      }
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  static GetOneProductById(req, res) {
    const id = req.params.id;

    Product.findByPk(id)
      .then((product) => {
        if (!product) {
          res.status(404).json({ message: "product not found" });
        } else {
          res.status(200).json(product);
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      });
  }

  static async getAllProduct(req, res) {
    try {
      const products = await Product.findAll();
      if (products) {
        return res.status(200).json({ products });
      }
    } catch (error) {
      return res.status(401).json(error);
    }
  }

  static async updateProduct(req, res) {
    try {
      const { CategoryId } = req.body;
      const productId = req.params.id;
      const product = await Product.update(
        { CategoryId },
        { where: { id: productId }, returning: true }
      );

      if (product) {
        return res.status(200).json({ category: product[1][0] });
      }
    } catch (error) {
      return res.status(401).json(error);
    }
  }

  static async deleteProduct(req, res) {
    try {
      const ProductId = req.params.id;
      const deletedProduct = await Product.destroy({
        where: { id: ProductId },
      });

      if (deletedProduct) {
        return res.status(200).json({
          message: "Product has been successfully deleted",
        });
      } else {
        return res.status(400).json({
          name: "Error",
          msg: "ProductId Not Found",
        });
      }
    } catch (error) {
      return res.status(401).json(error);
    }
  }
}

module.exports = ProductController;
