const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');

const router = require('./routes');
const globalError = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

// Accept cors
app.use(cors());

// Compression
app.use(compression());

// Development logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// For parsing application/json
app.use(express.json({ limit: '10kb' }));

// Route
app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.send('Welcome to Lexe-shop');
});

app.all('*', (req, res, next) => {
  next(new AppError('Page not found', 404));
});

// Handle error
app.use(globalError);

module.exports = app;
