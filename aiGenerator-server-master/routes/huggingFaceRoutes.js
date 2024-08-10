const express = require('express');
const router = express.Router();
const { captionController, summaryController, paragraphController } = require('../controllers/huggingFaceController')

// Define routes
router.post('/caption', captionController);
router.post('/summarize', summaryController);
router.post('/paragraph', paragraphController);

module.exports = router;
