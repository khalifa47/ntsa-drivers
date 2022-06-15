import db, { storage, auth } from '../firebase';
import { Password, toast } from '../utils/helpers';
import { doc, updateDoc } from 'firebase/firestore';
import { parsePhoneNumber } from 'libphonenumber-js';
import { PhoneAuthProvider, RecaptchaVerifier, updatePhoneNumber, updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const User = {
    update: async (user, data) => {
        try {
            if (data.phone !== user.phoneNumber)
                if (!await this.updatePhone(user, data.phone)) return toast({
                    msg: 'Unable to update profile.',
                    type: 'danger'
                });

            await updateDoc(doc(db, 'users', user.uid), data);

            if (data.image) await this.uploadProfilePic(data.image, user);

            const storageUser = JSON.parse(localStorage.getItem('user'))
            localStorage.setItem('user', JSON.stringify({
                ...storageUser,
                phone: data.phone,
                email: data.email,
                blood_group: data.blood_group
            }));

            toast({ msg: 'Profile updated successfully.' });
        } catch (err) {
            toast({ msg: err.message });
        }
    },
    updatePhone: async (user, phone) => {
        const { number } = parsePhoneNumber(phone, 'KE');

        let appVerifier = new RecaptchaVerifier('recaptcha-container', {
            size: 'invisible',
            defaultCountry: 'KE'
        }, auth);

        return await new PhoneAuthProvider(auth)
            .verifyPhoneNumber(number, appVerifier)
            .then(async function (verificationId) {
                return await Swal.fire({
                    input: 'number',
                    inputLabel: 'One Time Password',
                    inputPlaceholder: 'Kindly enter the OTP sent via SMS.',
                    showLoaderOnConfirm: true,
                    preConfirm: async code => {
                        if (isNaN(code) || code.length !== 6) {
                            return Swal.showValidationMessage('OTP must be a six digit number.');
                        }

                        try {
                            const phoneCredential = PhoneAuthProvider.credential(verificationId, code);

                            return await updatePhoneNumber(user, phoneCredential);
                        } catch (err) {
                            if (err.code === "auth/invalid-verification-code") {
                                return Swal.showValidationMessage('Invalid OTP');
                            }
                        }
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then(result => result.isConfirmed && result.value);
            });
    },

    uploadProfilePic: async (file, user) => {
        const fileRef = ref(storage, `${user.uid}.png`);

        await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);

        await updateProfile(user, { photoURL });
    },

    updatePassword: async data => {
        try {
            const storageUser = JSON.parse(localStorage.getItem('user'))

            const passwordsMatch = Password.verify(data.old_password, storageUser.password);

            if (!passwordsMatch) return toast({ msg: 'Invalid Password Entered.' });

            await updateDoc(doc(db, 'users', storageUser.uid), {
                password: Password.hash(data.password)
            });

            localStorage.setItem('user', JSON.stringify({
                ...storageUser,
                password: Password.hash(data.password)
            }));

            toast({ msg: 'Password changed successfully' });
        } catch (err) {
            toast({ msg: err.message });
        }
    }
}