const CustomError  = require('./custom.err');

class ValidationError extends CustomError {
    statusCode = 400;

    constructor(errors) {
        super('Invalid request!');
        this.errors = errors

        //  Only because we are extending a built-in class
        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    serializeErrors = () => {
        return this.errors.map(error => ({message: error.message, field: String(error.path)}));
    };
}

module.exports = ValidationError