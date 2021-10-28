const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.index);
router.post('/', productController.create);
router.get('/:id', productController.show);



module.exports = router;