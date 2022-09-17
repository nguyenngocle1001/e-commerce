const handlerFactory = require('./handlerFactory');

const Size = require('../models/sizeSchema');

exports.getAllSize = handlerFactory.getAll(Size, true, 'value', 'description');
exports.createSize = handlerFactory.createOne(Size);
exports.updateSize = handlerFactory.updateOne(Size);
exports.deleteSize = handlerFactory.deleteOne(Size);
exports.forceDeleteSize = handlerFactory.forceDeleteOne(Size);
