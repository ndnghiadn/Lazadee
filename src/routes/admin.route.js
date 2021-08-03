const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController')

router.get('/products/edit/:id', checkAuthenticated, adminController.EditProduct);
router.post('/products/edit/:id', checkAuthenticated, adminController.Edit);
router.get('/products/add', checkAuthenticated, adminController.AddProduct);
router.post('/products/add', checkAuthenticated, adminController.Add);
router.get('/products', checkAuthenticated, adminController.ShowProducts);
router.get('/', checkAuthenticated, adminController.index);

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

module.exports = router;