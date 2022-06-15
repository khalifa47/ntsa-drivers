import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

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

export { auth, storage };
export default db;

// firebase deploy --only hosting:ntsadrivers