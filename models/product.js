"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category);
      this.hasMany(models.TransactionHistory);
    }
  }
  Product.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: {
          msg: "Title cannot be null",
          args: false,
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: "Price cannot be null",
        },
        validate: {
          isInt: {
            args: true,
            msg: "Price should be an integer",
          },
          min: {
            args: 1,
            msg: "Price should be higher than 0",
          },
          max: {
            args: 50000000,
            msg: "Price should be lower than 50 million",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: "Stock cannot be null",
        },
        validate: {
          isInt: {
            msg: "Stock must be an integer",
            args: true,
          },
          min: {
            args: 5,
            msg: "Stock must be higher than 5 ",
          },
        },
      },
      CategoryId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  Product.beforeCreate((product, _) => {
    product.id = uuidv4();
  });

  return Product;
};
