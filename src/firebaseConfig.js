import firebase from "firebase/app";
import "firebase/firestore";

// Not secret

const config = {
  apiKey: "AIzaSyCuEx05to4x-JrIZXu2YK4GMaNTiKAmORc",
  authDomain: "portfolio-9cf35.firebaseapp.com",
  projectId: "portfolio-9cf35",
  storageBucket: "portfolio-9cf35.appspot.com",
  messagingSenderId: "434627075680",
  appId: "1:434627075680:web:aedfa9ebc9674df8196d05",
  measurementId: "G-ZK7QGFGJXN",
};
firebase.initializeApp(config);

export default firebase;
