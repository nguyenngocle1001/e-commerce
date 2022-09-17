const express = require('express');

const bannerController = require('../controllers/bannerController');
const authController = require('../controllers/authController');

const multer = require('../utils/multer');

const router = express.Router();

router.get('/now', bannerController.getNow);

router
  .route('/:id/delete')
  .delete(
    authController.protect,
    authController.restrictToNotBelong('user'),
    bannerController.deleteOne
  );

router
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictToNotBelong('user'),
    multer.single('image'),
    bannerController.updateOne,
    bannerController.uploadImage
  )
  .delete(bannerController.forceDeleteOne);

router
  .route('/')
  .get(bannerController.getAll)
  .post(
    authController.protect,
    authController.restrictToNotBelong('user'),
    multer.single('image'),
    bannerController.createOne,
    bannerController.uploadImage
  );

module.exports = router;
