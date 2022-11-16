const express = require('express');
const { getProduct, createProduct, updateProduct, bulkUpdateProduct } = require('../controllers/product.controller');
const router = express.Router();

router.route('/')
    .get(getProduct)
    .post(createProduct)


// bulk update
router.route("/bulk-update").
    patch(bulkUpdateProduct);


// get single product
router.route('/:id')
    .patch(updateProduct);

module.exports = router;