const multer = require('multer');
const path = require('path');

module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve('images'));
    },
    filename: (req, file, callback) => {
      callback(null, `${Date.now().toString()}_${file.originalname}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    const extensionsImg = ['image/png', 'image/jpg', 'image/jpeg'].find(
      (formatAccept) => formatAccept === file.mimetype
    );
    if (extensionsImg) {
      return callback(null, true);
    }

    return callback(null, false);
  },
});
