const multer = require("multer");
const path = require("path");

const storageProducts = multer.diskStorage({ 
   destination: function (req, file, cb) {
      cb(null, './public/img/products');
   },
   filename: function (req, file, cb) {
      cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
      cb(null, file.originalname);
   },
   fileFilter : (req, file, cb) => {
      if (file.mimetype === 'image/jpeg' ||
         file.mimetype === 'image/png' ||
         file.mimetype === 'image/gif' ||
         file.mimetype === 'image/jpg') {
         cb(null, true);
      } else {
         req.fileValidationError = 'El archivo deberá ser de formato JPG, JPEG, PNG o GIF';
         return cb(null, false, new Error('El archivo deberá ser de formato JPG, JPEG, PNG o GIF'));
      }
   },
})

const uploadProducts = multer({storage: storageProducts});

module.exports = uploadProducts;