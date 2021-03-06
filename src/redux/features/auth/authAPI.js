import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { Password, toast } from 'utils/helpers';
import { parsePhoneNumber } from 'libphonenumber-js';
import publicRecords from '../../../records.json';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import db, { auth } from '../../../firebase';
import Swal from 'sweetalert2';

export const signInWithPhone = async phone => {
    let appVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        defaultCountry: 'KE'
    }, auth);

    try {
        const confirmationRes = await signInWithPhoneNumber(auth, phone, appVerifier);

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
                    return await confirmationRes.confirm(code);
                } catch (err) {
                    if (err.code === "auth/invalid-verification-code") {
                        return Swal.showValidationMessage('Invalid OTP');
                    }
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then(result => result.isConfirmed && result.value);
    } catch (err) {
        console.log(err);
        toast({ msg: 'Unable to complete authentication!' });
    }
};

export const register = async ({ email, phone, blood_group, password, serial_number: serial_id }) => {
    //  254741712853
    const q = query(collection(db, "users"), where("serial_id", "==", Number(serial_id)));
    const docs = await getDocs(q);

    if (docs.docs.length) return toast({ msg: 'Your account already exists. Kindly Sign In.' });

    const { number } = parsePhoneNumber(phone, 'KE');
    const { user } = await signInWithPhone(number);

    if (!user) throw new Error('Unable to verify OTP!');

    let publicData = publicRecords.find(record => record.serial_id === serial_id);

    await setDoc(doc(db, "users", user.uid), {
        ...publicData,
        email, password: Password.hash(password),
        phone: number, blood_group,
        serial_id,
        authProvider: "local",
    });

    await Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: 'Registration Successful!',
        text: 'NTSA',
        timer: 3000,
        showConfirmButton: false
    });

    return user;
};

export const login = async ({ national_id, password }) => {
    const q = query(collection(db, "users"), where("national_id", "==", Number(national_id)));
    const docs = await getDocs(q);

    if (!docs.docs.length) return toast({ msg: 'Invalid credentials' });

    const user = docs.docs[0].data();

    const passwordsMatch = Password.verify(password, user.password);

    if (!passwordsMatch) return toast({ msg: 'Invalid credentials' });

    try {
        const userCreds = await signInWithPhone(user.phone);

        localStorage.setItem('user', JSON.stringify({ ...user, uid: userCreds.user.uid }));

        await Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: 'Sign In Successful!',
            text: 'NTSA',
            timer: 3000,
            showConfirmButton: false
        });

        return user;
    } catch (err) {
        await auth.signOut();
    }
};

export const logout = async () => {
    localStorage.removeItem('user');
    await auth.signOut();
};