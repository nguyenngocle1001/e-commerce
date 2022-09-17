const express = require('express');

// const authController = require('../controllers/authController');
const productOptionController = require('../controllers/productOptionController');

const router = express.Router();

router.route('/:id/product').get(productOptionController.getAllOptionOfProduct);

// router
//   .route('/:id')
//   .get(productOptionController.getOne)
//   .patch(
//     authController.protect,
//     authController.restrictTo('admin', 'employee', 'manager'),
//     productOptionController.updateOption
//   )
//   .delete(
//     authController.protect,
//     authController.restrictTo('admin', 'employee', 'manager'),
//     productOptionController.deleteOption
//   );

// router
//   .route('/')
//   .get(productOptionController.getAllOption)
//   .post(
//     authController.protect,
//     authController.restrictTo('admin', 'employee', 'manager'),
//     productOptionController.createOption
//   );

module.exports = router;
