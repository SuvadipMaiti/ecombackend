const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.index);
router.get('/:id', productController.show);
router.post('/', productController.create);
router.patch('/:id', productController.update);
router.delete('/:id', productController.destroy);



module.exports = router;