const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/ProductsController')

router.get('/', productsController.index);

module.exports = router;