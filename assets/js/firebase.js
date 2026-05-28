/* FIREBASE IMPORTS */

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh40xeDQbM8_g9ZcT_tHs3087a6PZdED0",
  authDomain: "ecommerce-website-99493.firebaseapp.com",
  projectId: "ecommerce-website-99493",
  storageBucket: "ecommerce-website-99493.firebasestorage.app",
  messagingSenderId: "1092001873526",
  appId: "1:1092001873526:web:effff5a617b5061026e957"
};

/* INITIALIZE FIREBASE */

const app =
initializeApp(firebaseConfig);

/* AUTH */

const auth = getAuth(app);

/* EXPORT */

export { auth };