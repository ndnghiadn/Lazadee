
const categoriesRouter = require('./categories.route');
const productsRouter = require('./products.route');
const siteRouter = require('./site.route');
const blogRouter = require('./blog.route');
const adminRouter = require('./admin.route')

const methodOverride = require('method-override')

function route(app) {

    app.use('/admin', adminRouter);

    app.use('/categories', categoriesRouter);

    app.use('/products', productsRouter);

    app.use('/blogs', blogRouter);

    app.use('/', siteRouter);

    app.use(methodOverride('_method'))
    app.delete('/logout', (req, res) => {
        req.logOut()
        res.redirect('/login')
    })

}

module.exports = route;