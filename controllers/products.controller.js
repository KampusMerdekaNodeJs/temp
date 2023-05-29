const AppError = require("../utils/app.error.middleware");
const { Product } = require("../models/index");
const catchAsync = require("../utils/catch.promise");
const currencyFormatter = require("../utils/currency.formatter");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const result = await Product.findAll();
  const dataProducts = currencyFormatter(result);

  res.send({
    status: "success",
    statusCode: "200 OK",
    data: {
      Products: dataProducts,
    },
  });
});
exports.createProduct = catchAsync(async (req, res, next) => {
  const result = await Product.create(req.body);

  res.send({
    status: "success",
    statusCode: "201 Created",
    data: {
      Product: result,
    },
  });
});

exports.updateProductt = catchAsync(async (req, res, next) => {
  const { prodId } = req.params;
  const result = await Product.update(req.body, {
    where: {
      id: prodId,
    },
    returning: true,
    individualHooks: true,
  });
  res.send({
    status: "success",
    status: "200 OK",
    data: {
      Product: result,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { prodId } = req.params;
  const result = await Product.destroy({
    where: {
      id: prodId,
    },
  });

  if (result === 0)
    return next(new AppError(`Invalid ID(${prodId}). Data not found`, 404));

  res.send({
    status: "success",
  });
});

exports.updateProductCategoryID = catchAsync(async (req, res, next) => {
  const { prodId } = req.params;

  const result = await Product.update(req.body, {
    where: {
      id: prodId,
    },
    returning: true,
    individualHooks: true,
  });

  res.send({
    status: "success",
    data: {
      Product: result,
    },
  });
});
