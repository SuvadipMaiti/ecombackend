const express = require('express');
const productController = require('../controllers/productController');
const checkAuthMiddleware = require('../middleware/check-auth');


const router = express.Router();

router.get('/', productController.index);
router.get('/:id', productController.show);
router.post('/', checkAuthMiddleware.checkAuth, productController.create);
router.patch('/:id', checkAuthMiddleware.checkAuth, productController.update);
router.delete('/:id', checkAuthMiddleware.checkAuth, productController.destroy);



module.exports = router;