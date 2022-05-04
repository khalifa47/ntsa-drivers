import { createUserWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { Password, toast } from '../../utils/helpers';
import { parsePhoneNumber } from 'libphonenumber-js';
import publicRecords from '../../records.json';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import db, { auth } from '../../firebase';

const signInWithPhone = async phone => {
    let appVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        defaultCountry: 'KE'
    }, auth);

    try {
        const confirmationRes = await signInWithPhoneNumber(auth, phone, appVerifier);

        let code = prompt('Enter the otp', '');

        if (code === null) return false;

        return await confirmationRes.confirm(code);
    } catch (err) {
        console.log(err);
        toast({ msg: 'Unable to complete registration!' });
    }
};

export const register = async ({ email, phone, blood_group, password, serial_number: serial_id }) => {
    const { number } = parsePhoneNumber(phone, 'KE');
    const isVerifiedPhone = await signInWithPhone(number);

    if (!isVerifiedPhone) throw new Error('Unable to verify OTP!');

    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    let publicData = publicRecords.find(record => record.serial_id === serial_id);

    await addDoc(collection(db, "users"), {
        uid: user.uid,
        ...publicData,
        email, password: Password.hash(password),
        phone: number, blood_group,
        serial_id,
        authProvider: "local",
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
        const userCredentials = await signInWithPhone(user.phone);

        return userCredentials.user;
    } catch (err) {
        await auth.signOut();
    }
};

export const logout = async () => await auth.signOut();