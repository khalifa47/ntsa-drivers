const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getAuth } = require('firebase/auth');

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

module.exports.auth = getAuth(app);
module.exports.db = getFirestore(app);

// firebase deploy --only hosting:ntsadrivers