
const AppDAO = require('../models/dao')
const ProductsRepository = require('../models/products_repository')
const CategoriesRepository = require('../models/categories_repository')

class ProductsController {

    // [GET] /products
    index = (req, res, next) => {
        const dao = new AppDAO('./src/app/models/db.sqlite3')
        const proRepo = new ProductsRepository(dao)
        const catRepo = new CategoriesRepository(dao)

        proRepo.getAll()
            .then((list) => {
                const productsList = list.map((product) => {
                    catRepo.getById(product.categoryId)
                        .then((cat) => {
                            product.catName = cat.name
                        })
                        .catch(next)
                    return product;
                })
                res.render('products', { list: productsList });
            })
            .catch(next)
        
    }
}

module.exports = new ProductsController;