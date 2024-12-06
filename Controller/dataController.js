const catchAsyncError = require("../middlewares/catchAsyncError.js");
const AppError = require("../middlewares/appError.js");
const datafeed = require("../db/models/datafeed.js");
const sequelize = require("../config/database.js");

const addData = catchAsyncError(async (req, res, next) => {
  const body = req.body;

  const newDataAdd = await datafeed.create({
    usertype: body.usertype,
    saveDate: body.saveDate,
    karykarName: body.karykarName,
    yuvakName: body.yuvakName,
    place: body.place,
    timeSpent: body.timeSpent,
    comments: body.comments,
  });
  if (!newDataAdd) {
    return next(new AppError("Failed to add new data", 400));
  }
  const result = newDataAdd.toJSON();
  delete result.deletedAt;

  return res.status(201).json({
    status: "success",
    message: "User dataed Succesfully",
    data: result,
  });
});

const editData = catchAsyncError(async (req, res, next) => {
  const { id } = req.params; // Get the ID of the record to update
  const body = req.body; // Get the new data from the request body

  try {
    // Check if the record exists
    const existingData = await datafeed.findById(id);

    if (!existingData) {
      return next(new AppError(`Data with ID ${id} not found`, 404));
    }

    // Update the record
    const updatedData = await existingData.update({
      usertype: body.usertype || existingData.usertype,
      saveDate: body.saveDate || existingData.saveDate,
      karykarName: body.karykarName || existingData.karykarName,
      yuvakName: body.yuvakName || existingData.yuvakName,
      place: body.place || existingData.place,
      timeSpent: body.timeSpent || existingData.timeSpent,
      comments: body.comments || existingData.comments,
    });

    // Prepare the response data
    const result = updatedData.toJSON();
    delete result.deletedAt;

    return res.status(200).json({
      status: "success",
      message: "Data updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error updating data:", error.message); // Debugging error
    return next(new AppError("An error occurred while updating the data", 500));
  }
});

const getAllData = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const getData = await datafeed.findAll(req.datafeed.id);
  res.status(200).json({
    success: true,
    user,
  });
});

module.exports = { addData, editData, getAllData };
