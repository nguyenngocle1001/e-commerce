const express = require('express');

const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');

const multer = require('../utils/multer');

const router = express.Router();

router.delete(
  '/:id/delete',
  authController.protect,
  authController.restrictTo('manager', 'admin'),
  categoryController.deleteCategory
);

router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(
    authController.protect,
    authController.restrictTo('employee', 'manager', 'admin'),
    multer.single('image'),
    categoryController.updateCategory,
    categoryController.uploadImage
  )
  .delete(
    authController.protect,
    authController.restrictTo('manager', 'admin'),
    categoryController.forceDeleteCategory
  );

router
  .route('/')
  .get(categoryController.getCategories)
  .post(
    authController.protect,
    authController.restrictTo('employee', 'manager', 'admin'),
    multer.single('image'),
    categoryController.createCategory,
    categoryController.uploadImage
  );

module.exports = router;
