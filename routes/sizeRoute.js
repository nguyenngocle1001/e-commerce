const express = require('express');

const sizeController = require('../controllers/sizeController');
const authController = require('../controllers/authController');

const router = express.Router();

router.delete(
  '/:id/delete',
  authController.protect,
  authController.restrictToNotBelong('user', 'employee'),
  sizeController.deleteSize
);

router
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictToNotBelong('user'),
    sizeController.updateSize
  )
  .delete(
    authController.protect,
    authController.restrictToNotBelong('user', 'employee'),
    sizeController.forceDeleteSize
  );

router
  .route('/')
  .get(sizeController.getAllSize)
  .post(
    authController.protect,
    authController.restrictToNotBelong('user'),
    sizeController.createSize
  );

module.exports = router;
