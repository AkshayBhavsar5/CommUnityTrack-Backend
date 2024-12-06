require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const userRouter = require("./Router/userRoutes.js");
const dataRouter = require("./Router/dataRoutes.js");
const todoRouter = require("./Router/todoRoutes.js");
const catchAsyncError = require("./middlewares/catchAsyncError.js");
const AppError = require("./middlewares/appError.js");
const globalErrorHandler = require("./Controller/errorController.js");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/datafeed", dataRouter);
app.use("/api/v1/todo", todoRouter);

app.use(
  "*",
  catchAsyncError((req, res, next) => {
    throw new AppError(`can't find ${req.originalUrl} on this server`, 404);
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`server is lisieing Port ${PORT}`);
});
