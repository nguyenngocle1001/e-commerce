const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Product = require('./productSchema');
const ProductOption = require('./productOptionSchema');

const Import = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'A import must belong a product'],
    },
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Color',
      required: [true, 'A import must belong a color'],
    },
    size: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Size',
      required: [true, 'A import must belong a size'],
    },
    quantity: {
      type: Number,
      required: [true, 'A import must have a quantity'],
      min: [0, 'The quantity must be greater than or equal to 0'],
    },
    importPrice: {
      type: Number,
      required: [true, 'A import bill must have a total price'],
      min: [0, 'A stock bill must be greater than or equal to 0'],
    },
    totalImportPrice: {
      type: Number,
    },
    tax: {
      type: Number,
      required: [true, 'A import bill must have a total price'],
      min: [0, 'A stock bill must be greater than or equal to 0'],
    },
    totalPrice: Number,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

Import.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
  validateBeforeDelete: true,
});

Import.pre('save', function (next) {
  this.totalImportPrice = this.quantity * this.importPrice;
  this.totalPrice = this.totalImportPrice - this.tax;

  next();
});

Import.pre('save', async function (next) {
  const product = await Product.findById(this.product);

  product.quantity += this.quantity;
  await product.save();

  next();
});

Import.pre('save', async function (next) {
  const { product, size, color, quantity } = this;
  const option = await ProductOption.findOne({
    product,
    size,
    color,
  });

  if (option) {
    option.quantity += this.quantity;

    await option.save();

    return next();
  }

  await ProductOption.create({ product, size, color, quantity });
  return next();
});

Import.pre(/^find/, function (next) {
  this.populate('product').populate('color').populate('size');

  next();
});

module.exports = mongoose.model('Import', Import);
