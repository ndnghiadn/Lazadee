const express = require('express');
const router = express.Router();

const catController = require('../app/controllers/CatController')

router.get('/', catController.getAll);

module.exports = router;