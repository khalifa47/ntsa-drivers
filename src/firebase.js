import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, PhoneAuthProvider, RecaptchaVerifier, updatePhoneNumber, updateProfile } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { parsePhoneNumber } from 'libphonenumber-js';
import Swal from 'sweetalert2';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA8tqdM198HE-8TxJ4phhk_rnxTlHe5MRc",
    authDomain: "ntsa-drivers-e8a6a.firebaseapp.com",
    projectId: "ntsa-drivers-e8a6a",
    storageBucket: "ntsa-drivers-e8a6a.appspot.com",
    messagingSenderId: "736696482990",
    appId: "1:736696482990:web:7ef31be6ce73d0449f413f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export const uploadProfilePic = async (file, user) => {
    const fileRef = ref(storage, `${user.uid}.png`);

    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    await updateProfile(user, { photoURL });
};

export const updatePhone = async (user, phone) => {
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
};

export { auth };
export default db;

// firebase deploy --only hosting:ntsadrivers