"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const hash = require("../utils/hash.bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Category);
      this.hasMany(models.TransactionHistory);
    }
  }
  User.init(
    {
      full_name: {
        type: DataTypes.STRING,
        allowNull: {
          msg: "Email cannot be empty",
          args: false,
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Full name cannot be empty string",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Email cannot be empty",
        },
        validate: {
          isEmail: {
            args: true,
            msg: "Email is not valid, please try again",
          },
          notEmpty: {
            args: true,
            msg: "Email cannot be empty string",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Password cannot be empty",
        },
        validate: {
          len: {
            args: [6, 10],
            msg: "Password should have atleast 6-10 characters",
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Gender cannot be empty",
        },
        validate: {
          isIn: {
            args: [["male", "female"]],
            msg: "Gender should be male or female",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [["admin", "customer"]],
            msg: "Role should be admin or customer",
          },
        },
      },
      balance: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            args: true,
            msg: "Balance should be an integer",
          },
          max: {
            args: 100000000,
            msg: "Balance surpass the limit!!",
          },
          min: {
            args: 1,
            msg: "Balance should be higher than 0",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user, _) => {
    user.id = uuidv4();
    user.balance = 0;
    user.createdAt = new Date();
    user.updatedAt = new Date();
    user.password = hash(user.password);
    console.log(user.password);

    if (!user.role) user.role = "customer";
  });

  User.beforeUpdate(async (user, options) => {
    //dapetin data yang req.body nya???
    //previous data value

    if (options.fields.includes("balance")) {
      const previousBalance = user._previousDataValues.balance;
      user.balance = user.balance + previousBalance;
    }
  });
  return User;
};
