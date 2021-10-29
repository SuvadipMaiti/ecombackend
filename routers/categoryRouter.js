const express = require('express');
const categoryController = require('../controllers/categoryController');
const checkAuthMiddleware = require('../middleware/check-auth');


const router = express.Router();

router.get('/', categoryController.index);
router.get('/:id', categoryController.show);
router.post('/', checkAuthMiddleware.checkAuth, categoryController.create);
router.patch('/:id', checkAuthMiddleware.checkAuth, categoryController.update);
router.delete('/:id', checkAuthMiddleware.checkAuth, categoryController.destroy);



module.exports = router;