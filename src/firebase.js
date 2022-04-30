import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, RecaptchaVerifier, signInWithPhoneNumber, } from 'firebase/auth';
import publicRecords from './records.json';
import { toast } from './utils/helpers';
import { parsePhoneNumber } from 'libphonenumber-js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArNiQJyg6PgXnZsesyKs4tsckY2NufjFk",
    authDomain: "fluent-imprint-335817.firebaseapp.com",
    projectId: "fluent-imprint-335817",
    storageBucket: "fluent-imprint-335817.appspot.com",
    messagingSenderId: "894866721271",
    appId: "1:894866721271:web:2d14d2fb5528f2592806f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

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
        email,
        phone: number, blood_group,
        serial_id: serial_id,
        authProvider: "local",
    });
};

export const login = async ({ national_id, password }) => {
    const q = query(collection(db, "users"), where("national_id", "==", Number(national_id)));
    const docs = await getDocs(q);

    if (!docs.docs.length) return toast({ msg: 'Invalid credentials' });

    const user = docs.docs[0].data();

    try {
        // await signInWithEmailAndPassword(auth, user.email, password);

        await signInWithPhone(user.phone);
    } catch (err) {
        await auth.signOut();
    }
};

export { auth };
export default db;

// firebase deploy --only hosting:ntsadrivers