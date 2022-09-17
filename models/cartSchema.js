const mongoose = require('mongoose');

const Cart = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: [true, 'A cart must be belong to a user'],
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        color: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Color',
        },
        size: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Size',
        },
        quantity: {
          type: Number,
          default: 1,
          required: [true, 'Please provide a quantity'],
        },
      },
    ],
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

Cart.pre(/^find/, function (next) {
  this.populate({
    path: 'products',
    populate: {
      path: 'product',
    },
  });

  next();
});

module.exports = mongoose.model('Cart', Cart);
