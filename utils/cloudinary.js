const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'lexedev',
  api_key: '618639648899851',
  api_secret: 'l4ublfrci9Nb3JhyXrTyV_KFsg0',
  secure: true,
});

module.exports = cloudinary;
