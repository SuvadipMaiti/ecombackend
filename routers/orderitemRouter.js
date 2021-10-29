const express = require('express');
const orderitemController = require('../controllers/orderitemController');
const checkAuthMiddleware = require('../middleware/check-auth');


const router = express.Router();

router.get('/', orderitemController.index);
router.get('/:id', orderitemController.show);
router.post('/', checkAuthMiddleware.checkAuth, orderitemController.create);
router.patch('/:id', checkAuthMiddleware.checkAuth, orderitemController.update);
router.delete('/:id', checkAuthMiddleware.checkAuth, orderitemController.destroy);



module.exports = router;