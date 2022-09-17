const handlerFactory = require('./handlerFactory');

const Color = require('../models/colorSchema');

const catchAsync = require('../utils/catchAsync');

exports.getAllColor = handlerFactory.getAll(Color, true, 'value', 'description');
exports.createColor = handlerFactory.createOne(Color);
exports.updateColor = handlerFactory.updateOne(Color);
exports.deleteColor = handlerFactory.deleteOne(Color);
exports.forceDeleteColor = handlerFactory.forceDeleteOne(Color);

exports.getAllColorWithProduct = catchAsync(async (req, res, next) => {
  const docs = await Color.aggregate([
    {
      $lookup: {
        from: 'product_options',
        localField: '_id',
        foreignField: 'color',
        as: 'options',
      },
    },
    {
      $project: {
        id: '$_id',
        value: '$value',
        count: { $size: '$options' },
      },
    },
  ]);

  res.json({ docs, status: 'success' });
});
