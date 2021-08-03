
const AppDAO = require('../models/dao')
const ProductsRepository = require('../models/products_repository')
const CategoriesRepository = require('../models/categories_repository')

class AdminController {

    // [GET] /admin/products/add
    AddProduct = (req, res, next) => {
        const dao = new AppDAO('./src/app/models/db.sqlite3')
        const catRepo = new CategoriesRepository(dao)

        catRepo.getAll()
            .then((list) => {
                res.render('admin/products/add', { list, layout: false })
            })
            .catch(next)

    }

    // [POST] /admin/products/add
    Add = (req, res, next) => {
        const dao = new AppDAO('./src/app/models/db.sqlite3')
        const proRepo = new ProductsRepository(dao)

        const { name, category, price, prePrice, imageUrl, isSale } = req.body

        proRepo.create(name, category, price, prePrice, imageUrl, isSale, req.user.id)

        res.redirect('/admin/products')
    }

    // [GET] /admin/products/edit/:id
    EditProduct = (req, res, next) => {
        const dao = new AppDAO('./src/app/models/db.sqlite3')
        const proRepo = new ProductsRepository(dao)
        const catRepo = new CategoriesRepository(dao)

        catRepo.getAll()
            .then((list) => {
                res.locals.list = list
            })
            .catch(next)

        proRepo.getById(req.params.id)
            .then((product) => {
                res.render('admin/products/edit', { product, layout: false })
            })
            .catch(next)
    }

    // [POST] /admin/products/edit/:id
    Edit = (req, res, next) => {
        const dao = new AppDAO('./src/app/models/db.sqlite3')
        const proRepo = new ProductsRepository(dao)

        proRepo.update(req.body)
            .catch(next)

        res.redirect('/admin/products')
    }

    // [GET] /admin/products
    ShowProducts = (req, res, next) => {
        const dao = new AppDAO('./src/app/models/db.sqlite3')
        const proRepo = new ProductsRepository(dao)
        const catRepo = new CategoriesRepository(dao)

        proRepo.getProducts(req.user.id)
            .then((list) => {
                const productsList = list.map((product) => {
                    catRepo.getById(product.categoryId)
                        .then((cat) => {
                            product.catName = cat.name
                        })
                        .catch(next)
                    return product;
                })
                res.render('admin/products/index', {list: productsList, empty: productsList.length === 0, layout: false});
            })
            .catch(next)

        

    }

    // [GET] /admin
    index = (req, res, next) => {

        res.render('admin/index', {layout: false, username: req.user.name})
        
    }

}

module.exports = new AdminController;