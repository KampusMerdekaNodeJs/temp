"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.hasMany(models.Product);
    }
  }
  Category.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: {
          msg: "Type cannot be empty",
          args: false,
        },
        validate: {
          notEmpty: {
            msg: "Type cannot be empty string",
            args: true,
          },
        },
      },
      sold_product_amount: {
        type: DataTypes.INTEGER,
        allowNull: {
          msg: "Sold product amount cannot be empty",
          args: false,
        },
        validate: {
          isInt: {
            msg: "Amount must be an integer",
            args: true,
          },
        },
      },
      UserId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );

  Category.beforeCreate((category, _) => {
    category.id = uuidv4();
    category.sold_product_amount = 0;
  });

  return Category;
};
