const multer = require('multer');
const AppError = require('./appError');

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/png|jpg|jpeg/)) {
      return cb(new AppError('File does not support!'), false);
    }

    cb(null, true);
  },
});
