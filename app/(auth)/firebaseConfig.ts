import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC_N1k2JZCJu6xnqGqZayLvE5LNKDF3oKI",
  authDomain: "wellness-67f28.firebaseapp.com",
  databaseURL: "https://wellness-67f28-default-rtdb.firebaseio.com",
  projectId: "wellness-67f28",
  storageBucket: "wellness-67f28.appspot.com",
  messagingSenderId: "1018888888888",
  appId: "1:1018888888888:web:1234567890",
  measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { auth, db, analytics };
export default firebaseConfig;
