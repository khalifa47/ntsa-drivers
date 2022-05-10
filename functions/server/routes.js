const { Router } = require('express')
const MpesaController = require('./http/controllers/mpesa.controller');
const MpesaRequest  = require('./http/requests/mpesa.request');
const validate = require('./http/middleware/validate.middleware');

const router = Router()

router.post('/mpesa/initiate-stk', validate(MpesaRequest.initiateStk), MpesaController.initiateStk)
router.post('/mpesa/stk-callback', MpesaController.stkCallback)

module.exports = router