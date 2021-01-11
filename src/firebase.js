import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBs2-bbGPfQjj4vsMPqBEaC1ooB4KB0yBg",
    authDomain: "nwitter-9d504.firebaseapp.com",
    projectId: "nwitter-9d504",
    storageBucket: "nwitter-9d504.appspot.com",
    messagingSenderId: "897374426800",
    appId: "1:897374426800:web:e04e5e446af838c9a78d75"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);