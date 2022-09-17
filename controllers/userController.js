const User = require('../models/userSchema');

const handlerFactory = require('./handlerFactory');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const cloudinary = require('../utils/cloudinary');

exports.aliasMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAll = handlerFactory.getAll(User, true, 'email', 'name', 'phone');
exports.getUser = handlerFactory.getOne(User);
exports.createUser = handlerFactory.createOne(User);

exports.updateUser = handlerFactory.updateOne(User);
exports.deleteUser = handlerFactory.deleteOne(User);
exports.restoreUser = handlerFactory.restoreOne(User);
exports.forceDelete = handlerFactory.forceDeleteOne(User);

exports.validateSignUp = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password)
    return next(new AppError('Please provide your email or password!', 400));

  const user = await User.findOne({
    email: req.body.email,
    provideId: 'signin',
  });

  if (user) return next(new AppError('This user is exists!', 400));

  next();
});

exports.uploadPhoto = catchAsync(async (req, res, next) => {
  const data = await cloudinary.uploader.upload(req.file.path, {
    folder: 'users',
    public_id: `user-${req.doc.id}/photo-${Date.now()}`,
    transformation: [{ width: 500, height: 500, crop: 'lfill' }],
  });

  req.doc.photo = data.url;
  await req.doc.save();

  res.status(200).json({
    status: 'success',
    doc: req.doc,
  });
});
