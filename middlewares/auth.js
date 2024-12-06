const { jwt } = require("jsonwebtoken");
const user = require("../db/models/user");
const catchAsyncError = require("./catchAsyncError");

const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User is not Auhtenticated!!"), 400);
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await user.findById(decoded.id);
  next();
});

module.exports = { isAuthenticated };
