const { Mpesa } = require('mpesa-api');

const credentials = {
    clientKey: '2TprLATG71anbcwKQyOMezxeDqQgS3uk', // YOUR_CONSUMER_KEY_HERE'
    clientSecret: '5nBXi0qJGqZvlEhs', //'YOUR_CONSUMER_SECRET_HERE'
    initiatorPassword: 'YOUR_INITIATOR_PASSWORD_HERE',
    securityCredential: 'YOUR_SECURITY_CREDENTIAL',
    certificatePath: null
};

const mpesa = new Mpesa(credentials, 'sandbox');

const MpesaController = {
    initiateStk: async ({ body }, res, next) => {
        mpesa.lipaNaMpesaOnline({
            BusinessShortCode: 174379,
            Amount: 1 /* 1000 is an example amount */,
            PartyA: body.phone,
            PartyB: 174379,
            PhoneNumber: body.phone,
            CallBackURL: "https://92ee-102-140-253-199.ngrok.io/ntsa-drivers-e8a6a/us-central1/api/mpesa/stk-callback",
            AccountReference: "Account Reference",
            passKey: "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
            TransactionType: "CustomerPayBillOnline",
            TransactionDesc: body.description /* OPTIONAL */,
        }).then(resp => {
            console.log('Callback 1:', resp);

            res.send(resp);
        }).catch(err => {
            console.log('MpesaError: ', err);

            res.status(400).send(err.message);
        });
    },
    stkCallback: ({ body }) => {
        console.log('Callback 2:', body);
    }
};

module.exports = MpesaController;