const catchAsyncError = (errorFunction) => {
    const errorHandler = (req, res, next) => {
      errorFunction(req, res, next).catch(next);
    };
    return errorHandler;
  };
  
  module.exports = catchAsyncError;
  