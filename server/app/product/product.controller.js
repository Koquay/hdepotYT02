const productService = require('./product.service');

exports.getProducts = (req, res) => {
    productService.getProducts(req, res);
}

exports.getProduct = (req, res) => {
    productService.getProduct(req, res);
}