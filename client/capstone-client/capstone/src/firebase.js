// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQKkcxqIkXj0XPSWEhl8pGXwDgoLsuMQE",
  authDomain: "blink-firebase-storage.firebaseapp.com",
  projectId: "blink-firebase-storage",
  storageBucket: "blink-firebase-storage.appspot.com",
  messagingSenderId: "257947774708",
  appId: "1:257947774708:web:9defde80250cd2cedcf8a1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
