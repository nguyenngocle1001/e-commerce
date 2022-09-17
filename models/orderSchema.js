const mongoose = require('mongoose');

const Order = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'A order must be belong to a user'],
    },
    products: [
      {
        id: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
        size: String,
        color: String,
        total: Number,
      },
    ],
    email: String,
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    address: {
      type: String,
      required: [true, 'Please provide a address'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone'],
    },
    status: {
      type: String,
      default: 'ordered',
      enum: [
        'ordered',
        'packed',
        'in transit',
        'delivered',
        'rejected',
        'cancel',
      ],
    },
    total: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

module.exports = mongoose.model('order', Order);
