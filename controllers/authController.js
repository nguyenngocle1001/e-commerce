const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');

const User = require('../models/userSchema');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/email');

const client = new OAuth2Client(process.env.GG_API_KEY);

// Create JWT
const signJWToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// limit field before save in db
exports.limitFields =
  (...fields) =>
  (req, res, next) => {
    if (!fields.length) return next();

    fields.forEach((field) => delete req.body[field]);

    next();
  };

exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({ status: 'success', user: newUser });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password)
    return next(new AppError('Please provide and password! 😢😢😢', 400));

  // Find user with email
  const user = await User.findOne({
    email: req.body.email,
    provideId: 'signin',
  }).select('+password');

  // Check user and correct password
  if (!user || !(await user.comparePassword(req.body.password, user.password)))
    return next(new AppError('Incorrect email or password! 😢😢😢', 401));

  // Create token
  const token = signJWToken(user.id);
  user.password = undefined;

  res.status(200).json({ status: 'success', user, token });
});

exports.loginFB = catchAsync(async (req, res, next) => {
  const { userID, accessToken } = req.body;

  if (!userID || !accessToken) {
    return next(new AppError('Please provide userID and accessToken', 400));
  }

  const user = await User.findOne({ userID, provideId: 'facebook' });

  if (user) {
    const token = signJWToken(user.id);
    return res.status(200).json({ status: 'success', user, token });
  }

  const url = `https://graph.facebook.com/v12.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;
  const response = await fetch(url, { method: 'GET' });
  const { id, name, email, picture } = await response.json();

  const newUser = await User.create({
    email,
    userID: id,
    name,
    photo: picture.data.url,
    provideId: 'facebook',
  });

  const token = signJWToken(newUser.id);
  return res.status(200).json({ status: 'success', user: newUser, token });
});

exports.loginGG = catchAsync(async (req, res, next) => {
  if (!req.body.idToken)
    return next(new AppError('Please provide idToken!', 400));

  const response = await client.verifyIdToken({ idToken: req.body.idToken });
  const { name, picture, email } = response.getPayload();

  const user = await User.findOne({ email, provideId: 'google' });
  if (user) {
    const token = signJWToken(user.id);
    return res.status(200).json({ status: 'success', token, user });
  }

  const newUser = await User.create({
    email,
    name,
    photo: picture,
    provideId: 'google',
  });

  const token = signJWToken(newUser.id);
  return res.status(200).json({ status: 'success', token, user: newUser });
});

exports.checkLogin = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) return next();

  // Verify token

  try {
    token = token.replace('Bearer ', '');
    const { id, iat } = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!user || user.checkPasswordChanged(iat)) return next();

    req.user = user;
    next();
  } catch (error) {
    next();
  }
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return next(new AppError('There is no user with email address', 404));

  const token = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });
  await new Email(user).sendPasswordReset(token);

  res.status(200).json({ status: 'success', message: 'Token sent to email!' });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.body.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) return next(new AppError('Token is valid or has expired!', 400));

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Reset password successfully',
  });
});

// Protect
exports.protect = catchAsync(async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer '))
    return next(
      new AppError('Your are not log in! Please log in to get success!', 401)
    );

  token = token.replace('Bearer ', '');

  // Verify token
  const { id, iat } = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(id);

  if (!user)
    return next(
      new AppError(
        'The user belonging to this token does no longer exists.',
        401
      )
    );

  if (user.checkPasswordChanged(iat))
    return next(
      new AppError('User recently changed password. Please log in again!', 401)
    );

  req.user = user;
  next();
});

// restrict to
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError('You do not have permission to perform this action'),
        403
      );

    next();
  };

exports.restrictToNotBelong =
  (...roles) =>
  (req, res, next) => {
    if (roles.includes(req.user.role))
      return next(
        new AppError('You do not have permission to perform this action'),
        403
      );

    next();
  };
