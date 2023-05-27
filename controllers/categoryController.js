const { Category } = require("../models");

class CategoryController {
  static async createCategory(req, res) {
    try {
      let sold_product_amount;
      const { type } = req.body;

      const category = await Category.create({ type, sold_product_amount });
      if (category) {
        return res.status(201).json({ category });
      }
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  static async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll();
      if (categories) {
        return res.status(200).json({ categories });
      }
    } catch (error) {
      return res.status(401).json(error);
    }
  }

  static async updateCategory(req, res) {
    try {
      const { type } = req.body;
      const categoryId = req.params.id;
      const category = await Category.update(
        { type },
        { where: { id: categoryId }, returning: true }
      );

      if (category) {
        return res.status(200).json({ category: category[1][0] });
      }
    } catch (error) {
      return res.status(401).json(error);
    }
  }

  static async deleteCategory(req, res) {
    try {
      const categoryId = req.params.id;
      const deletedCategory = await Category.destroy({
        where: { id: categoryId },
      });

      if (deletedCategory) {
        return res.status(200).json({
          message: "Category has been successfully deleted",
        });
      } else {
        return res.status(400).json({
          name: "Error",
          msg: "CategoryId Not Found",
        });
      }
    } catch (error) {
      return res.status(401).json(error);
    }
  }
}

module.exports = CategoryController;
