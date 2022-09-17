const User = require('../models/userSchema');
const Order = require('../models/orderSchema');

const catchAsync = require('../utils/catchAsync');

exports.statisticalOrder = catchAsync(async (req, res, next) => {
  const data = await Order.aggregate([
    {
      $match: {
        status: 'packed',
      },
    },
    {
      $count: {
        $sum: 1,
      },
    },
  ]);
  res.status(200).json({ status: 'success', data });
});
