const handlerFactory = require('./handlerFactory');
const Brand = require('../models/brandSchema');
const catchAsync = require('../utils/catchAsync');

exports.getAll = handlerFactory.getAll(Brand, true, 'name');
exports.createOne = handlerFactory.createOne(Brand);
exports.updateOne = handlerFactory.updateOne(Brand);
exports.deleteOne = handlerFactory.deleteOne(Brand);
exports.forceDeleteOne = handlerFactory.forceDeleteOne(Brand);

exports.getAllBrandWithProduct = catchAsync(async (req, res, next) => {
  const docs = await Brand.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'brand',
        as: 'products',
      },
    },
    {
      $project: {
        id: '$_id',
        name: '$name',
        count: { $size: '$products' },
      },
    },
  ]);

  res.json({ docs, status: 'success' });
});
