const express = require('express');

const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.use(authController.protect);

router.get('/statistical', orderController.statistical);
router.get('/recent', orderController.recentOrders);
router.get('/statisticalWeek', orderController.statisticalCurrentWeek);
router.get('/statisticalYear', orderController.statisticalCurrentYear);

router
  .route('/me')
  .get(orderController.aliasMeOrder, orderController.getAll)
  .post(
    cartController.getCartMe,
    orderController.aliasAddMeOrder,
    orderController.createOrder
  );

router
  .route('/:id')
  .get(orderController.getOne)
  .patch(orderController.updateStatus);

router.route('/').get(orderController.getAll);

module.exports = router;
