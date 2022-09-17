const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const userRouter = require('./userRoute');
const categoryRouter = require('./categoryRoute');
const brandRouter = require('./brandRoute');
const colorRouter = require('./colorRoute');
const sizeRouter = require('./sizeRoute');
const productRouter = require('./productRoute');
const productOptionRouter = require('./productOptionRoute');
const bannerRouter = require('./bannerRoute');
const importRouter = require('./importRoute');
const cartRouter = require('./cartRoute');
const orderRouter = require('./orderRoute');
const statisticalRouter = require('./statisticalRoute');

const router = express.Router();

router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/brands', brandRouter);
router.use('/colors', colorRouter);
router.use('/sizes', sizeRouter);
router.use('/products', productRouter);
router.use('/product-options', productOptionRouter);
router.use('/banners', bannerRouter);
router.use('/imports', importRouter);
router.use('/carts', cartRouter);
router.use('/orders', orderRouter);
router.use('/statistical', statisticalRouter);

router.post(
  '/signup',
  authController.limitFields('role', 'provideId'),
  userController.validateSignUp,
  userController.createUser
);
router.post('/login', authController.login);
router.post('/login-with-fb', authController.loginFB);
router.post('/login-with-gg', authController.loginGG);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
