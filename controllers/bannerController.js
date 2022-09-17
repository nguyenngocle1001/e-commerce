const handlerFactory = require('./handlerFactory');
const Banner = require('../models/bannerSchema');
const catchAsync = require('../utils/catchAsync');
const cloudinary = require('../utils/cloudinary');

exports.getAll = handlerFactory.getAll(Banner, 'keyword');
exports.createOne = handlerFactory.createOne(Banner);
exports.updateOne = handlerFactory.updateOne(Banner);
exports.deleteOne = handlerFactory.deleteOne(Banner);
exports.forceDeleteOne = handlerFactory.forceDeleteOne(Banner);

exports.uploadImage = catchAsync(async (req, res, next) => {
  const data = await cloudinary.uploader.upload(req.file.path, {
    folder: 'banners',
    public_id: `banner-${req.doc.id}`,
    transformation: [{ width: 900, height: 270, crop: 'lfill' }],
  });

  req.doc.image = data.url;
  await req.doc.save();

  res.status(200).json({
    status: 'success',
    doc: req.doc,
  });
});

exports.getNow = catchAsync(async (req, res, next) => {
  const docs = await Banner.find({
    startDate: {
      $lte: Date.now(),
    },
    endDate: {
      $gte: Date.now(),
    },
  });

  res.status(200).json({ status: 'success', docs });
});
