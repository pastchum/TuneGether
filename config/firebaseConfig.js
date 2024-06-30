// firebaseConfig.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBhdgOvTUYqGzUrs5tK2LArgn85Hi8QNuA",
    authDomain: "tunegether.firebaseapp.com",
    projectId: "tunegether",
    storageBucket: "tunegether.appspot.com",
    messagingSenderId: "159280700402",
    appId: "1:159280700402:web:0940f40db2e99aba50a96b",
    measurementId: "G-XGDH334LCJ"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
