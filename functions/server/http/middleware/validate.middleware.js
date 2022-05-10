const ValidationError = require('../../exceptions/validation.err');

const validate = schema => {
    return async (req, res, next) => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        };

        try {
            req.body = await schema.validateAsync(req.body, validationOptions);

            next();
        } catch (err) {
            console.error(err);

            const errors = [];

            err.details.forEach(err => errors.push(err));

            throw new ValidationError(errors);
        }
    };
};

module.exports = validate;