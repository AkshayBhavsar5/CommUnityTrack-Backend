const catchAsyncError = require("../middlewares/catchAsyncError.js");
const AppError = require("../middlewares/appError.js");

const addTasks = catchAsyncError(async (req, res, next) => {
  const body = req.body;

  const addNewTasks = await datafeed.create({
    usertype: body.usertype,
    saveDate: body.saveDate,
    karykarName: body.karykarName,
    yuvakName: body.yuvakName,
    place: body.place,
    timeSpent: body.timeSpent,
    comments: body.comments,
  });
  if (!addNewTasks) {
    return next(new AppError("Failed to add new data", 400));
  }
  const result = addNewTasks.toJSON();
  delete result.deletedAt;

  return res.status(201).json({
    status: "success",
    message: "User dataed Succesfully",
    data: result,
  });
});
