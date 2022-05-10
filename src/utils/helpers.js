import Toastify from 'toastify-js';
import md5 from 'md5';
import axios from 'axios';
import { parsePhoneNumber } from 'libphonenumber-js';
import Swal from 'sweetalert2';

export const toast = data => {
    let duration = (data.duration ?? 7) * 1000,
        type     = data.type ?? 'success',
        close    = data.close ?? true;

    Toastify({
        text: data.msg,
        duration: duration,
        close: close,
        gravity: data.gravity ?? 'bottom',
        position: data.position ?? 'right',
        className: type,
    }).showToast();
};

export const Password = {
    /**
     *
     *
     * @param { string } rawPassword - the password to be hashed
     * @param { object } [options={}] - object containing salt and rounds
     * @returns { string }
     */
    hash(rawPassword, options = {}) {
        /**
         * salt is optional, if not provided it will be set to current timestamp
         */
        const salt = options.salt ? options.salt : new Date().getTime();

        /**
         * rounds is optional, if not provided it will be set to 10
         */
        const rounds = options.rounds ? options.rounds : 10;

        let hashed = md5(rawPassword + salt);
        for (let i = 0; i <= rounds; i++) hashed = md5(hashed);

        return `${salt}$.${rounds}$.${hashed}`;
    },
    /**
     *
     *
     * @param { string } rawPassword - the raw password
     * @param { string } hashedPassword - the hashed password
     * @returns
     */
    verify(rawPassword, hashedPassword) {
        try {
            const [salt, rounds] = hashedPassword.split('$.');
            const hashedRawPassword = this.hash(rawPassword, { salt, rounds });

            return hashedPassword === hashedRawPassword;
        } catch (error) {
            throw Error(error.message);
        }
    }
};

export class MpesaService {
    baseUrl = 'http://localhost:5001/ntsa-drivers-e8a6a/us-central1/api/mpesa';
    checkoutRequestId = null;
    uid = null;
    phone = null;
    amount = 1;

    constructor(values, uid) {
        this.uid = uid;
        this.phone = parsePhoneNumber(String(values.phone), 'KE').number;
    }


    init = async () => {
        try {
            const { data: { CheckoutRequestID } } = await axios.post(`${this.baseUrl}/initiate-stk`, {
                phone: this.phone,
                amount: this.amount,
                uid: this.uid
            });

            this.checkoutRequestId = CheckoutRequestID;

            if (this.checkoutRequestId) this.alert();
        } catch (err) {
            console.error(err);

            const msg = (err.response?.data?.errors && err.response?.data?.errors[0].message) ||
                (err.response && err.response.data && err.response.data.message) ||
                err.message || err.toString();

            toast({ msg });
        }
    };

    fetchStkStatus = async () => {
        return await fetch('/admin/payments/callbacks/stk_status/')
            .then(response => response.json())
            .then(data => data);
    };

    alert = (data = {}) => {
        let sweetText = data.sweetText ?? "Your request has been received and is being processed. PLEASE ENTER MPESA PIN when prompted, then click OK.";

        Swal.fire({
            icon: "info",
            title: "Info",
            text: sweetText,
            showLoaderOnConfirm: true,
            showCancelButton: true,
            backdrop: `rgba(0, 0, 123, 0.4)`,
            preConfirm: () => {
                return fetch(`${this.baseUrl}/query-status`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({ checkout_request_id: this.checkoutRequestId })
                })
                    .then(response => response.json())
                    .then(data => data).catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                            footer: '<a href>Report this issue?</a>'
                        });
                    });
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'info',
                    title: 'Payment Cancelled',
                    text: 'RewAd',
                    timer: 3000,
                    showConfirmButton: false
                });
            } else if (result.isConfirmed) {
                this.confirmResponse(result.value);
            } else {
                this.fetchStkStatus().then(result => this.confirmResponse(result));
            }
        });
    };

    confirmResponse(resp) {
        console.log(resp);

        const { ResultCode, errorCode } = resp;

        let icon, title, showConfirmButton = false;

        if (errorCode && errorCode === '500.001.1001') {
            return this.alert({ sweetText: 'Payment still in process. Please retry after 3 seconds.' });
        } else if (ResultCode === 1032) {
            icon = 'info';
            title = 'Payment Cancelled!';
        } else if (ResultCode === 0) {
            icon = 'success';
            title = 'Payment Successful!';
        } else {
            icon = 'warning';
            title = 'Something went wrong!';
            showConfirmButton = true;
        }

        Swal.fire({
            icon,
            title,
            text: 'NTSA',
            timer: 3000,
            showConfirmButton
        });
    }
}
