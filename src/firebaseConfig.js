import firebase from 'firebase/app';
import "firebase/firestore";

/**
 * Client Firebase key here,
 * Best practice would be to set up authentication security rules in the back-end
 * but this is a free project for personal use and doesn't have payment set up anyway so the only risk is someone hits
 * daily free read or write limit if they wanted to be mischievous. Could set up environment variables and gitignore it but for this
 * it shouldn't be a big deal. 
 */

const config = {
    apiKey: "AIzaSyCuEx05to4x-JrIZXu2YK4GMaNTiKAmORc",
    authDomain: "portfolio-9cf35.firebaseapp.com",
    projectId: "portfolio-9cf35",
    storageBucket: "portfolio-9cf35.appspot.com",
    messagingSenderId: "434627075680",
    appId: "1:434627075680:web:aedfa9ebc9674df8196d05",
    measurementId: "G-ZK7QGFGJXN"
};
firebase.initializeApp(config);

export default firebase;