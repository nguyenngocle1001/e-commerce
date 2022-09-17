const mongoose = require('mongoose');

const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');

const AppError = require('../utils/appError');

const Category = require('./categorySchema');
const Brand = require('./brandSchema');

const Product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageCover: {
      type: String,
    },
    images: [String],
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
      required: [true, 'A product must have a price'],
      min: [0, 'Price must be above 1.0'],
    },
    sellPrice: {
      type: Number,
      default: 0,
      required: [true, 'A product must have a sell price'],
      min: [0, 'Sell price must be above 1.0'],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount must be above 1%'],
      max: [100, 'Discount must be above 100%'],
    },
    quantity: {
      type: Number,
      default: 0,
      min: [0, 'Quantity must be above 0'],
    },
    ratingsAverage: {
      type: Number,
      default: 0,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    favouriteAverage: {
      type: Number,
      default: 0,
    },
    favouriteQuantity: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'A product must belong to a category'],
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: [true, 'A product must belong to a brand'],
    },
    slug: {
      type: String,
      slug: 'name',
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Plugin
mongoose.plugin(slug);
Product.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

// check category
Product.pre('save', async function (next) {
  const category = await Category.findById(this.category);
  if (!category)
    return next(new AppError('No category found with that category'));

  const brand = await Brand.findById(this.brand);
  if (!brand) return next(new AppError('No brand found with that brand'));

  next();
});

Product.pre('save', async function (next) {
  this.sellPrice = this.price - (this.price * this.discount) / 100;

  next();
});

Product.pre(/^find/, function (next) {
  this.populate('category').populate('brand');

  next();
});

module.exports = mongoose.model('Product', Product);
