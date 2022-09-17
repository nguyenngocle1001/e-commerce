const express = require('express');

const colorController = require('../controllers/colorController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/with-products', colorController.getAllColorWithProduct);

router.delete(
  '/:id/delete',
  authController.protect,
  authController.restrictToNotBelong('user', 'employee'),
  colorController.deleteColor
);

router
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictToNotBelong('user'),
    colorController.updateColor
  )
  .delete(
    authController.protect,
    authController.restrictToNotBelong('user', 'employee'),
    colorController.forceDeleteColor
  );

router
  .route('/')
  .get(colorController.getAllColor)
  .post(
    authController.protect,
    authController.restrictToNotBelong('user'),
    colorController.createColor
  );

module.exports = router;
