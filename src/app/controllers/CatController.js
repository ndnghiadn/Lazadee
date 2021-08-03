
const Promise = require('bluebird')
const AppDAO = require('../models/dao')
const CategoriesRepository = require('../models/categories_repository')
const ProductsRepository = require('../models/products_repository')

class CatController {

    // [GET] /categories
    getAll = (req, res, next) => {
        const dao = new AppDAO('./src/app/models/db.sqlite3')
        const catRepo = new CategoriesRepository(dao)
        const proRepo = new ProductsRepository(dao)

        catRepo.getAll()
            // .then((data) => {
            //     catId = data.id
            //     const products = [
            //         { name: 'Giày tây', description: 'Bóng loáng', catId },
            //         { name: 'Nhẫn rồng', description: 'Đeo ngón giữa', catId },
            //         { name: 'Sơ mi sọc', description: 'Caro xanh trắng', catId },
            //     ]
            //     return Promise.all(products.map((product) => {
            //         const { name, description, catId } = product
            //         return proRepo.create(name, description, catId)
            //     }))
            // })
            // .then(() => catRepo.getAll())
            .then((list) => {
                res.render('categories', { list })
            })
            .catch((err) => {
                console.log(err)
            })

        

    }
}

module.exports = new CatController;