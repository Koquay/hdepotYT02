const router = require('express').Router();
const productController = require('./product.controller');

// router.get('/tabs', productController.getTopPicks)
router.get('/productId', productController.getProduct)
router.get('/', productController.getProducts)
// router.get('/search/1', productsController.getSearchProducts)

module.exports = router;