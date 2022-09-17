const dotenv = require('dotenv');
const mongoose = require('mongoose');
// const cloudinary = require('cloudinary');

dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT || 8000;

// Connect to database
const db = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connection to db success!!!');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(`Connection to db failed at: ${err}`);
  })
  .finally(() => {
    // eslint-disable-next-line no-console
    console.log('======================================');
  });

// Setup cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_KEY,
//   api_secret: process.env.CLOUD_SECRET,
// });

// Start server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on http://localhost:${port}`);
});
