const express = require('express');
const orderController = require('../controllers/orderController');
const checkAuthMiddleware = require('../middleware/check-auth');


const router = express.Router();

router.get('/', orderController.index);
router.get('/:id', orderController.show);
router.post('/', checkAuthMiddleware.checkAuth, orderController.create);
router.patch('/:id', checkAuthMiddleware.checkAuth, orderController.update);
router.delete('/:id', checkAuthMiddleware.checkAuth, orderController.destroy);



module.exports = router;