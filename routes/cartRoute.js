const express = require('express');

const authController = require('../controllers/authController');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.use(authController.protect);

router.route('/me/clearAll').delete(cartController.clearAll);
router.route('/me/:id/product').delete(cartController.removeFromCard);
router.route('/me').get(cartController.getCart).post(cartController.addToCard);

module.exports = router;
