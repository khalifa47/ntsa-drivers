const functions = require('firebase-functions')
const server = require('./server/app');

exports.api = functions.https.onRequest(server)