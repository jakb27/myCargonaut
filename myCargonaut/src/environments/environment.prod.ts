export const environment = {
  firebase: {
    projectId: 'mycargonaut-2e064',
    appId: '1:1045911373307:web:2bc4905fe1c719f57db75e',
    storageBucket: 'mycargonaut-2e064.appspot.com',
    apiKey: 'AIzaSyCWSr3InrPkGLL6JEzqc0XYup_Pe3rG20M',
    authDomain: 'mycargonaut-2e064.firebaseapp.com',
    messagingSenderId: '1045911373307',
    measurementId: 'G-9K0V7W197B',
  },
  production: true
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWSr3InrPkGLL6JEzqc0XYup_Pe3rG20M",
  authDomain: "mycargonaut-2e064.firebaseapp.com",
  projectId: "mycargonaut-2e064",
  storageBucket: "mycargonaut-2e064.appspot.com",
  messagingSenderId: "1045911373307",
  appId: "1:1045911373307:web:2bc4905fe1c719f57db75e",
  measurementId: "G-9K0V7W197B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
