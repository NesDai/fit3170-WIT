/**
 * This file is written to account for cases where
 * firebase shows the error described here.
 * https://stackoverflow.com/questions/63492211/no-firebase-app-default-has-been-created-call-firebase-initializeapp-in
 *
 * @author Yong Peng (ychi0014@student.monash.edu)
 */

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBxuH8ZUtPxDhlXX7Lwku4-adc72FlhRqU",
    authDomain: "fit3170-49455.firebaseapp.com",
    databaseURL: "https://fit3170-49455-default-rtdb.firebaseio.com",
    projectId: "fit3170-49455",
    storageBucket: "fit3170-49455.appspot.com",
    messagingSenderId: "1065835602184",
    appId: "1:1065835602184:web:6844a1dcd8814eb5608cbd",
    measurementId: "G-WQTKDXT5J4"
};

firebase.initializeApp(firebaseConfig);