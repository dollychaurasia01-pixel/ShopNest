const express = require("express");


const {protect} = require('../middleware/authMiddleware.js');
const {admin} = require('../middleware/adminMiddleware.js');

const multer = require('multer');
const upload = multer({dest:'uploads/'});



const {getProducts,createProduct,getProductById, updateProduct,deleteProduct} = require("../controller/productController")

const router= express.Router();

router.route('/')
       .get(getProducts)
       .post(protect,admin,upload.single('image'),createProduct);

router.route('/:id')
      .get(getProductById)
      .put(protect, admin ,upload.single('image'), updateProduct)
      .delete(protect, admin,deleteProduct);       


module.exports = router;       
   