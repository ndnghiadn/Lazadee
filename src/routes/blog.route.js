const express = require('express');
const router = express.Router();

const blogsController = require('../app/controllers/BlogController')

router.post('/:slug', blogsController.postComment);
router.get('/:slug', blogsController.show);
router.get('/', blogsController.index);

module.exports = router;