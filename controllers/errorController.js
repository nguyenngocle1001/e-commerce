const AppError = require('../utils/appError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const handleMongoErrorDuplicate = (err) => {
  const [name] = Object.keys(err.keyValue);
  const value = err.keyValue[name];
  const message = `{${name}: ${value}} was exists. Please use another value!`;

  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const message = Object.values(err.errors).map((error) => error.message);

  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired. Please log in again!', 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(err, res);
  }

  if (err.code === 11000) err = handleMongoErrorDuplicate(err);
  if (err.name === 'ValidationError') err = handleValidationError(err);
  if (err.name === 'JsonWebTokenError') err = handleJWTError(err);
  if (err.name === 'TokenExpiredError') err = handleJWTExpiredError(err);

  sendErrorProd(err, res);
};
