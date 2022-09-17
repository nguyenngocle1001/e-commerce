const handlerFactory = require('./handlerFactory');
const Import = require('../models/importSchema');

exports.getAll = handlerFactory.getAll(Import, true);
exports.createOne = handlerFactory.createOne(Import);
exports.updateOne = handlerFactory.updateOne(Import);
exports.deleteOne = handlerFactory.deleteOne(Import);
exports.forceDeleteOne = handlerFactory.forceDeleteOne(Import);
