const express = require('express');

const statisticalController = require('../controllers/statisticalController');

const router = express.Router();

router.get('/orders', statisticalController.statisticalOrder)


module.exports = router;