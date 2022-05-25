const CustomError = require("../../exceptions/custom.err");
const { AxiosError } = require('axios');

module.exports.ErrorMiddleware = (error, req, res) => {
    let message = error.message || 'Something went wrong';

    if (error instanceof CustomError) {
        return res.status(error.statusCode).send({ errors: error.serializeErrors() });
    }
    if (error instanceof AxiosError) {
        return res.status(error.response.status).send(error.response.data);
    }

    console.error(error);

    res.status(400).send({ errors: [{ message }] });
};
