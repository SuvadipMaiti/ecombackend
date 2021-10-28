const express = require('express');
const imageUploadController = require('../controllers/imageUploadController');
const imageUploader = require('../helpers/image-uploader');

const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

router.post('/uploads', checkAuthMiddleware.checkAuth, imageUploader.upload.single('image'), imageUploadController.upload);




module.exports = router;