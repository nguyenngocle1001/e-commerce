const express = require('express');

const multer = require('../utils/multer');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/me')
  .all(userController.aliasMe)
  .get(userController.getUser)
  .patch(
    multer.single('photo'),
    userController.updateUser,
    userController.uploadPhoto
  );

router.use(authController.restrictTo('employee', 'manager', 'admin'));

router.patch(
  '/:id/restore',
  authController.restrictTo('manager', 'admin'),
  userController.restoreUser
);

router.delete(
  '/:id/delete',
  authController.restrictTo('manager', 'admin'),
  userController.deleteUser
);

router
  .route('/:id')
  .get(userController.getUser)
  .all(authController.restrictTo('manager', 'admin'))
  .patch(
    multer.single('photo'),
    authController.limitFields('password', 'email'),
    userController.updateUser,
    userController.uploadPhoto
  )
  .delete(userController.forceDelete);

router
  .route('/')
  .get(userController.getAll)
  .post(
    multer.single('photo'),
    authController.limitFields('provideId'),
    userController.validateSignUp,
    userController.createUser,
    userController.uploadPhoto
  );

module.exports = router;
