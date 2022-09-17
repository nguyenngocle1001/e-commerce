const Product = require('../models/productSchema');
const ApiFeature = require('../utils/apiFeature');
const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');
const cloudinary = require('../utils/cloudinary');
const generateSearchObject = require('../utils/generateSearchObject');

const handlerFactory = require('./handlerFactory');

exports.aliasHotProduct = (req, res, next) => {
  req.query.sort = '-ratingsAverage';

  next();
};

exports.aliasPopularityProduct = (req, res, next) => {
  req.query.sort = '-favouriteQuantity';

  next();
};

exports.getAll = catchAsync(async (req, res) => {
  const filterOptions = {};

  if (req.query.min && req.query.min) {
    filterOptions.sellPrice = {
      $lte: req.query.max,
      $gte: req.query.min,
    };
  }

  if (req.query.rating) {
    filterOptions.ratingsAverage = {
      $gte: req.query.rating,
    };
  }

  const features = new ApiFeature(
    Product.find(generateSearchObject(req.query.q, ['name'])).find(
      filterOptions
    ),
    req.query
  )
    .filters()
    .sort()
    .limitFields();

  const trashRows = await Product.countDocumentsDeleted();

  const totalRows = await features.query.clone().countDocuments();

  const docs = await features.paginate().query;

  await res.status(200).json({
    status: 'success',
    docs,
    pagination: {
      page: req.query.page * 1 || 1,
      limit: req.query.limit * 1 || 10,
      totalRows,
    },
    trashRows,
  });
});
exports.getOne = handlerFactory.getOne(Product);

exports.createOne = handlerFactory.createOne(Product);
exports.updateOne = handlerFactory.updateOne(Product);
exports.deleteOne = handlerFactory.deleteOne(Product);
exports.forceDelete = handlerFactory.forceDeleteOne(Product);

exports.uploadImages = catchAsync(async (req, res, next) => {
  let isUpload = false;
  if (req.files.imageCover) {
    const imageCover = await cloudinary.uploader.upload(
      req.files.imageCover[0].path,
      {
        folder: 'products',
        public_id: `products-${req.doc.id}/product-cover-${Date.now()}`,
        transformation: [{ width: 2000, height: 1333, crop: 'lfill' }],
      }
    );

    isUpload = true;

    req.doc.imageCover = imageCover.url;
  }

  if (req.files.images) {
    await Promise.all(
      req.files.images.map(async (image, index) => {
        const imageItem = await cloudinary.uploader.upload(image.path, {
          folder: 'products',
          public_id: `products-${req.doc.id}/product-${index + 1}-${Date.now()}`,
          transformation: [{ width: 2000, height: 1333, crop: 'lfill' }],
        });

        req.doc.images.push(imageItem.url);
      })
    );

    isUpload = true;
  }

  if (isUpload) await req.doc.save();

  res.json({
    status: 'success',
    doc: req.doc,
  });
});

exports.getDetail = catchAsync(async (req, res, next) => {
  const { slug } = req.params;

  const doc = await Product.findOne({ slug });

  if (!doc) return next(new AppError('Slug is not found', 404));

  res.status(200).json({ status: 'success', doc });
});
