// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_Xx5f2_yLYO2uQq8_Hr8JPywbC93Db2A",
  authDomain: "skolaproject-3dab2.firebaseapp.com",
  projectId: "skolaproject-3dab2",
  storageBucket: "skolaproject-3dab2.appspot.com",
  messagingSenderId: "781003412751",
  appId: "1:781003412751:web:49b62035f7f91e6c271a7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;