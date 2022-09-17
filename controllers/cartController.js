const Cart = require('../models/cartSchema');
const catchAsync = require('../utils/catchAsync');

exports.getCartMe = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({
    user: req.user._id,
    isCompleted: false,
  }).populate({
    path: 'products',
    populate: {
      path: 'product',
    },
  });

  req.cart = cart;
  next();
});

exports.getCart = catchAsync(async (req, res, next) => {
  let cart = await Cart.findOne({
    user: req.user._id,
    isCompleted: false,
  })
    .populate({
      path: 'products',
      populate: {
        path: 'product',
      },
    })
    .populate({
      path: 'products',
      populate: {
        path: 'size',
      },
    })
    .populate({
      path: 'products',
      populate: {
        path: 'color',
      },
    });

  if (!cart) {
    cart = await Cart.create({ user: req.user._id });
  }

  res.status(200).json({
    status: 'success',
    doc: cart,
  });
});

exports.addToCard = catchAsync(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user._id, isCompleted: false });

  if (!cart) {
    cart = await Cart.create({ user: req.user._id });
  }

  const index = cart.products.findIndex(
    (item) =>
      item.product._id.toString() === req.body.product &&
      item.color.toString() === req.body.color &&
      item.size.toString() === req.body.size
  );

  if (index !== -1) {
    cart.products[index].quantity += req.body.quantity;
  } else {
    cart.products.push(req.body);
  }

  await cart.save();

  res.status(200).json({
    status: 'success',
  });
});

exports.removeFromCard = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id, isCompleted: false });

  cart.products = cart.products.filter(
    (product) => product._id.toString() !== req.params.id
  );
  await cart.save();
  res.status(200).json({
    status: 'success',
  });
});

exports.clearAll = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id, isCompleted: false });

  cart.products = [];
  await cart.save();
  res.status(200).json({
    status: 'success',
  });
});
