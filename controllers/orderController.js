const catchAsync = require('../utils/catchAsync');
const handlerFactory = require('../controllers/handlerFactory');

const Order = require('../models/orderSchema');
const Cart = require('../models/cartSchema');
const Product = require('../models/productSchema');
const ProductOption = require('../models/productOptionSchema');
const moment = require('moment');
const ApiFeature = require('../utils/apiFeature');
const Email = require('../utils/email');

exports.aliasMeOrder = (req, res, next) => {
  req.query.user = req.user.id;

  next();
};

exports.aliasAddMeOrder = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.cart = req.cart._id;

  req.body.total = 0;

  req.cart.products.forEach((item) => {
    req.body.total += item.quantity * item.product.sellPrice;
  });

  next();
};

exports.getAll = handlerFactory.getAll(
  Order,
  false,
  'name',
  'phone',
  'address'
);

exports.createOrder = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id, isCompleted: false },
    { isCompleted: true }
  )
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

  const data = {
    ...req.body,
    products: cart.products.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      name: item.product.name,
      price: item.product.sellPrice,
      image: item.product.imageCover,
      size: item.size.value,
      color: item.color.value,
      total: item.quantity * item.product.sellPrice,
    })),
    total: cart.products.reduce(
      (acc, item) => acc + item.quantity * item.product.sellPrice,
      0
    ),
  };

  await Promise.all([
    ...cart.products.map(async (item) => {
      const product = await Product.findById(item.product);
      product.quantity -= item.quantity;
      await product.save();
    }),
    ...cart.products.map(async (item) => {
      const option = await ProductOption.findOne({
        product: item.product,
        size: item.size,
        color: item.color,
      });
      option.quantity -= item.quantity;
      await option.save();
    }),
  ]);

  const order = await Order.create(data);
  if (req.user.email) await new Email(req.user).sendOrder();

  console.log({user: req.user});

  res.status(200).json({
    status: 'success',
    doc: order,
  });
});

exports.updateStatus = handlerFactory.updateOne(Order);
exports.getOne = handlerFactory.getOne(Order);

exports.recentOrders = catchAsync(async (req, res, next) => {
  const features = new ApiFeature(
    Order.find({
      createdAt: {
        $gte: moment().subtract(1, 'M').format(),
      },
    }),
    req.query
  );

  const totalRows = await features.query.clone().countDocuments();
  const docs = await features.paginate().query;

  res.status(200).json({
    status: 'success',
    docs,
    pagination: {
      totalRows,
      page: req.query.page * 1,
      limit: req.query.limit * 1,
    },
  });
});

exports.statistical = catchAsync(async (req, res) => {
  const docs = await Order.find();
  const result = {
    total: docs.length,
    packed: 0,
    inTransit: 0,
    delivered: 0,
  };

  docs.forEach((doc) => {
    if (doc.status === 'in transit') result.inTransit += 1;
    else result[doc.status] += 1;
  });

  res.json({
    status: 'success',
    ...result,
  });
});

exports.statisticalCurrentWeek = catchAsync(async (req, res) => {
  const docs = await Order.find({
    createdAt: {
      $gte: moment().subtract(7, 'day').format(),
    },
  });

  const result = {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0,
  };

  docs.forEach((doc) => {
    result[moment(doc.createdAt).format('ddd')] += doc.total;
  });

  res.status(200).json({
    status: 'success',
    data: Object.values(result),
    labels: Object.keys(result),
  });
});

exports.statisticalCurrentYear = catchAsync(async (req, res) => {
  const docs = await Order.find({
    createdAt: {
      $gte: new Date(`01/01/${req.query.year * 1}`),
      $lt: new Date(`01/01/${req.query.year * 1 + 1}`),
    },
  });

  const result = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  docs.forEach((doc) => {
    result[moment(doc.createdAt).format('MMMM')] += doc.total;
  });

  res.status(200).json({
    status: 'success',
    data: Object.values(result),
    labels: Object.keys(result),
  });
});
