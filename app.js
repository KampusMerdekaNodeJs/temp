const express = require("express");
const app = express();

//Routes Middleware
const errorMiddleware = require("./middlewares/err.middleware");
const authMiddleware = require("./middlewares/auth.middleware");

const categoriesRoute = require("./routes/categories.routes");
const userRoute = require("./routes/users.route");
const productRoute = require("./routes/products.routes");
const transactionsRoute = require("./routes/transactions.route");

//Authentification & Authorization Middleware

require("dotenv").config();

//middleware
app.use(express.json());

app.use("/users", userRoute);
app.use("/categories", authMiddleware, categoriesRoute);
app.use("/products", authMiddleware, productRoute);
app.use("/transactions", authMiddleware, transactionsRoute);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is listening to port " + PORT);
});
