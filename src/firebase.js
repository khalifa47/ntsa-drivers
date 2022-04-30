import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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
const db = getFirestore();

/*export const register = async ({name, email, password}) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};*/

export { auth };
export default db;

// firebase deploy --only hosting:ntsadrivers