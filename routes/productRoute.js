const express = require('express');

const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

const multer = require('../utils/multer');

const router = express.Router();

router.get('/detail/:slug', productController.getDetail);

router.get(
  '/hot',
  productController.aliasHotProduct,
  authController.checkLogin,
  productController.getAll
);

router.get(
  '/popular',
  productController.aliasPopularityProduct,
  authController.checkLogin,
  productController.getAll
);

router.delete(
  '/:id/delete',
  authController.protect,
  authController.restrictTo('manager', 'admin'),
  productController.deleteOne
);

router
  .route('/:id')
  .get(productController.getOne)
  .patch(
    authController.protect,
    authController.restrictTo('employee', 'manager', 'admin'),
    multer.fields([
      {
        name: 'imageCover',
        maxCount: 1,
      },
      {
        name: 'images',
      },
    ]),
    productController.updateOne,
    productController.uploadImages
  )
  .delete(productController.forceDelete);

router
  .route('/')
  .get(authController.checkLogin, productController.getAll)
  .post(
    authController.protect,
    multer.fields([
      {
        name: 'imageCover',
        maxCount: 1,
      },
      {
        name: 'images',
      },
    ]),
    productController.createOne,
    productController.uploadImages
  );

module.exports = router;
