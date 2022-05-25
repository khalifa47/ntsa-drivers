const Joi = require('joi');

const MpesaRequest = {
    initiateStk: Joi.object({
        uid: Joi.string().required(),
        phone: Joi.number().integer().required(),
        amount: Joi.number().integer().required(),
        description: Joi.string().default('NTSA Payment')
    }),
    queryStatus: Joi.object({
        checkout_request_id: Joi.string().required(),
    }),
};

module.exports = MpesaRequest;