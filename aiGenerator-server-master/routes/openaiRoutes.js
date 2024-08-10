const express = require('express')
const { summaryController, paragraphController, chatbotController, jsConverterController, scifiImageController } = require('../controllers/openaiController')

const router = express.Router()

//router
router.post('/summary', summaryController)
router.post('/paragraph', paragraphController)
router.post('/chatbot', chatbotController)
router.post('/js-converter', jsConverterController)
router.post('/scifi-image', scifiImageController)

module.exports = router