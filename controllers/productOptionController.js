const handlerFactory = require('./handlerFactory');
const ProductOption = require('../models/productOptionSchema');

const catchAsync = require('../utils/catchAsync');

exports.getAllOptionOfProduct = catchAsync(async (req, res, next) => {
  const options = await ProductOption.find({ product: req.params.id })
    .populate('color', { value: 1, id: 1, description: 1 })
    .populate('size', { value: 1, id: 1, description: 1 });

  res.json({
    status: 'success',
    docs: options.filter((option) => option.quantity > 0),
  });
});

exports.getAllOption = catchAsync(async (req, res, next) => {
  const docs = await ProductOption.find({ product: req.params.id })
    .populate('color', { value: 1, id: 1, description: 1 })
    .populate('size', { value: 1, id: 1, description: 1 })
    .populate('product');

  res.json({ status: 'succcess', docs });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const doc = await ProductOption.findById(req.params.id)
    .populate('color', { value: 1, id: 1, description: 1 })
    .populate('size', { value: 1, id: 1, description: 1 })
    .populate('product');

  res.json({ status: 'succcess', doc });
});

exports.createOption = handlerFactory.createOne(ProductOption);
exports.updateOption = handlerFactory.updateOne(ProductOption);
exports.deleteOption = handlerFactory.forceDeleteOne(ProductOption);
