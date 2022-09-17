const mongoose = require('mongoose');

const Product = require('./productSchema');
const Color = require('./colorSchema');
const Size = require('./sizeSchema');
const AppError = require('../utils/appError');

const productOption = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Option must belong to a Product'],
    },
    size: {
      type: mongoose.Schema.ObjectId,
      ref: 'Size',
      required: [true, 'Option must have a size'],
    },
    color: {
      type: mongoose.Schema.ObjectId,
      ref: 'Color',
      required: [true, 'Option must have color'],
    },
    quantity: {
      type: Number,
      default: 0,
      min: [0, 'quantity must be above 0'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productOption.pre('save', async function (next) {
  const product = await Product.findById(this.product);
  if (!product) return next(new AppError('This product have not in database'));

  const size = await Size.findById(this.size);
  if (!size) return next(new AppError('This size have not in database'));

  const color = await Color.findById(this.color);
  if (!color) return next(new AppError('This color have not in database'));

  next();
});

module.exports = mongoose.model('Product_Option', productOption);
