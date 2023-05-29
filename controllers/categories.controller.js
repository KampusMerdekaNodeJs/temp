const AppError = require("../utils/app.error.middleware");
const catchAsync = require("../utils/catch.promise");
const { Category, Product } = require("../models/index");

//TODO: make only admin can access this controller(adding admin middleware)

exports.insertCategories = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  req.body.UserId = id;

  const result = await Category.create(req.body, {
    where: {
      id,
    },
  });

  res.status(201).send({
    status: "success",
    statusCode: "201 Created",
    data: {
      Category: result,
    },
  });
});

exports.patchCategory = catchAsync(async (req, res, next) => {
  const { type } = req.body;
  const { id } = req.user;
  const { categoryId } = req.params;

  const result = await Category.update(
    { type },
    {
      where: {
        UserId: id,
        id: categoryId,
      },
      returning: true,
      individualHooks: true,
    }
  );

  res.send({
    status: "success",
    statusCode: "200 OK",
    data: {
      Category: result,
    },
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const { categoryId } = req.params;

  const result = await Category.destroy({
    where: {
      UserId: id,
      id: categoryId,
    },
  });
  if (!result)
    return next(new AppError(`Invalid ID(${categoryId}). Data not found`, 404));

  res.send({
    status: "success",
    statusCode: "200 OK",
    message: "Category has been deleted successfully",
  });
});

exports.getCategories = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const result = await Category.findAll({
    include: Product,
  });

  res.send({
    status: "success",
    statusCode: "200 OK",
    data: result,
  });
});
