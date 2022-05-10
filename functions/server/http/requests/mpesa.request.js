const Joi = require('joi');

const MpesaRequest = {
    initiateStk: Joi.object({
        phone: Joi.number().integer().required(),
        amount: Joi.number().integer().required(),
        description: Joi.string().default('NTSA Payment')
    }),
};

module.exports = MpesaRequest;