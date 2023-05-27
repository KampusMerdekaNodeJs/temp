"use strict";
const { Model } = require("sequelize");
const { options } = require("../routers");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product);
    }
  }
  Category.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "type can't be empty!",
          },
        },
      },
      sold_product_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: {
            args: true,
            msg: "sold_product_amount can't be empty!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Category",
      hooks: {
        beforeCreate: (category, options) => {
          category.sold_product_amount = 0;
        },
      },
    }
  );
  return Category;
};
