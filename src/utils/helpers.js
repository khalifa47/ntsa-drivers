import Toastify from 'toastify-js';
import md5 from 'md5';

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