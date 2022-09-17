const express = require('express');

const authController = require('../controllers/authController');
const brandController = require('../controllers/brandController');

const router = express.Router();

router.get('/with-product', brandController.getAllBrandWithProduct);

router
  .route('/:id/delete')
  .delete(
    authController.protect,
    authController.restrictToNotBelong('user', 'employee'),
    brandController.deleteOne
  );

router
  .route('/:id')
  .all(authController.protect)
  .patch(authController.restrictToNotBelong('user'), brandController.updateOne)
  .delete(
    authController.restrictToNotBelong('user', 'employee'),
    brandController.forceDeleteOne
  );

router
  .route('/')
  .get(brandController.getAll)
  .post(
    authController.protect,
    authController.restrictToNotBelong('user'),
    brandController.createOne
  );

module.exports = router;
