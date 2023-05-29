const catchAsync = require("../utils/catch.promise");
const { TransactionHistory, Product, User } = require("../models/index");

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

exports.createTransactions = catchAsync(async (req, res, next) => {
  req.body.UserId = req.user.id;

  const result = await TransactionHistory.create(req.body, {});

  const { id } = result.dataValues;

  const resultSelect = await TransactionHistory.findOne({
    where: {
      id,
    },
    include: Product,
  });
  const { title: product_name } = resultSelect.dataValues.Product.dataValues;
  const { total_price, quantity } = resultSelect.dataValues;
  const formatPrice = formatter.format(total_price);
  res.send({
    status: "success",
    statusCode: "201 Created",
    message: "You have successfully purchase the product",
    transactionBill: {
      total_price: formatPrice,
      quantity,
      product_name,
    },
  });
});

exports.transactionUserHistories = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const result = await TransactionHistory.findAll({
    where: {
      UserId: id,
    },
    include: {
      model: Product,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    },
  });

  res.send({
    status: "success",
    statusCode: "200 OK",
    data: {
      TranscationHistories: result,
    },
  });
});

exports.transactionAdminHistories = catchAsync(async (req, res, next) => {
  const result = await TransactionHistory.findAll({
    include: [
      {
        model: User,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: Product,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
  });

  res.send({
    status: "success",
    statusCode: "200 OK",
    role: "admin",
    data: {
      TranscationHistories: result,
    },
  });
});

exports.getSpecificTranscations = catchAsync(async (req, res, next) => {
  const { transactionId } = req.params;

  const result = await TransactionHistory.findOne({
    where: {
      id: transactionId,
    },
    include: {
      model: Product,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    },
  });

  res.send({
    status: "success",
    statusCode: "200 OK",
    data: {
      TranscationHistories: result,
    },
  });
});
