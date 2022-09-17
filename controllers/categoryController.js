const handlerFactory = require('./handlerFactory');

const Category = require('../models/categorySchema');

const cloudinary = require('../utils/cloudinary');
const catchAsync = require('../utils/catchAsync');

exports.getCategories = handlerFactory.getAll(Category, true, 'name', 'description');
exports.getCategory = handlerFactory.getOne(Category);
exports.createCategory = handlerFactory.createOne(Category);
exports.updateCategory = handlerFactory.updateOne(Category);
exports.deleteCategory = handlerFactory.deleteOne(Category);
exports.forceDeleteCategory = handlerFactory.forceDeleteOne(Category);

exports.uploadImage = catchAsync(async (req, res, next) => {
  const data = await cloudinary.uploader.upload(req.file.path, {
    folder: 'categories',
    public_id: `category-${req.doc.name}`,
    transformation: [{ width: 320, height: 320, crop: 'lfill' }],
  });

  req.doc.image = data.url;
  await req.doc.save();

  res.status(200).json({
    status: 'success',
    doc: req.doc,
  });
});
