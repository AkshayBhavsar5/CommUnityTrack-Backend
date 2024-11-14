const user = require("../db/models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catchAsyncError = require("../middlewares/catchAsyncError.js");
const AppError = require("../middlewares/appError.js");

const genrateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// user Regiseter
const regiseter = catchAsyncError(async (req, res, next) => {
  const body = req.body;

  // if (![0].includes(body.usertype)) {
  //   return res.status(400).json({
  //     status: "fail",
  //     message: "Invalid User Type",
  //   });
  // }

  const newuser = await user.create({
    usertype: body.usertype,
    firstName: body.firstName,
    lastName: body.lastName,
    phone: body.phone,
    email: body.email,
    password: body.password,
    confirmPassword: body.confirmPassword,
  });

  if (!newuser) {
    return next(new AppError("Failed to create the user", 400));
  }
  const result = newuser.toJSON();

  delete result.password;
  delete result.deletedAt;

  result.token = genrateToken({
    id: result.id,
  });

  return res.status(201).json({
    status: "success",
    message: "User Regiseter Succesfully",
    data: result,
  });
});

// user Login
const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide valid email and password", 400));
  }

  const result = await user.findOne({ where: { email } });
  if (!result || !(await bcrypt.compare(password, result.password))) {
    return next(new AppError("Incorret email and password", 401));
  }

  const token = genrateToken({
    id: result.id,
  });

  return res.status(200).json({
    status: "success",
    message: "User Login Succesfully",
    token,
  });
});

// User Logout
const logOut = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "User Logout Successfuly",
    });
});

//Get User
const getUser = catchAsyncError(async (req, res, next) => {
  const user = await user.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

const updatePassword = catchAsyncError(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new AppError("Please Fill all the Fill", 400));
  }
  const user = await user.findById(req.user.id).select("password");
  const isPasswordMatched = await user.comparePassword(currentPassword);
  if (!isPasswordMatched) {
    return next(new AppError("Incorrent Current Password ", 400));
  }
  if (newPassword !== confirmNewPassword) {
    return next(
      new AppError(
        "New Password and Confirm Mew Password didn't matched  ",
        400
      )
    );
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password Updated!!",
  });
});

module.exports = { regiseter, login, logOut, getUser, updatePassword };
