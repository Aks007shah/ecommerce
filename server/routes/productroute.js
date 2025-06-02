const express = require("express");
const router = express.Router();
const productController = require("../controllers/productcontroller");
const upload = require('../middlewares/upload')

router.route("/getproducts").get(productController.getAllProducts);

router.route("/getsingleproduct/:id").get(productController.getSingleProduct);

router.post('/addproducts', upload.single("image"), productController.addProduct);

router.route("/editproduct/:id").put(upload.single("image"), productController.editProduct);

router.route("/deleteproduct").post(productController.deleteProduct);

module.exports = router;
