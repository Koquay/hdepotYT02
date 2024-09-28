const indexRoutes = require('../index/index.routes');
const productRoutes = require('../product/product.routes');

module.exports = (app) => {
    app.use('/api/product', productRoutes)
    app.use('/*', indexRoutes);
}
