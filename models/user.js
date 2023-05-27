"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../hellpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "full_name can't be empty!",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "This email has been used",
        },
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Email can't be empty!",
          },
          isEmail: {
            args: true,
            msg: "Invalid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password can't be empty!",
          },
          len: {
            args: [6, 10],
            msg: "Password must be between 6 and 10 characters",
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Gender can't be empty!",
          },
          isIn: {
            args: [["male", "female"]],
            msg: 'Gender must be either "male" or "female"',
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "customer",
        validate: {
          isIn: {
            args: [["admin", "customer"]],
            msg: 'Role must be either "admin" or "customer"',
          },
        },
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: true,
          min: 0,
          max: 100000000,
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user, options) => {
          const hashedPassword = hashPassword(user.password);
          user.password = hashedPassword;
          if (!user.role) {
            user.role = "customer";
          }
          user.balance = 0;
        },
      },
    }
  );

  return User;
};
