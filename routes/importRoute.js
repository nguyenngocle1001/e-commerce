const express = require('express');

const authController = require('../controllers/authController');
const importController = require('../controllers/importController');

const router = express.Router();

router.use(authController.protect, authController.restrictToNotBelong('user'));

router.route('/:id/delete').delete(importController.deleteOne);

router
  .route('/:id')
  .delete(
    authController.restrictToNotBelong('employee'),
    importController.forceDeleteOne
  );

router.route('/').get(importController.getAll).post(importController.createOne);

module.exports = router;
