import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey:"AIzaSyCVvchSy1tKPTA0L9L2Hqy3xvJ8cEKr2RU",
    authDomain: "plugin-ea704.firebaseapp.com",
    projectId: "plugin-ea704",
    storageBucket: "plugin-ea704.appspot.com",
    messagingSenderId: "538707026939",
    appId: "1:538707026939:web:f740a2607ca30db578215e"
  };
const app=initializeApp(firebaseConfig);
export const authentication=getAuth(app);
export const db = getFirestore(app);
export const storage=getStorage(app);
export const database = getDatabase();
