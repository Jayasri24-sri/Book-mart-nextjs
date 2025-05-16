import {initializeApp, getApp, getApps} from "@firebase/app";
import {getAuth, GoogleAuthProvider} from "@firebase/auth";
import {getFirestore} from "@firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyD4HiEEPe3BfSxEyoOqkye7YgkAmVm7Weo",
    authDomain: "completeauth-9aba2.firebaseapp.com",
    projectId: "completeauth-9aba2",
    storageBucket: "completeauth-9aba2..appspot.com",
    messagingSenderId: "639198799026",
    appId: "1:639198799026:web:f02f9ef213f628fae9d5ab",
    measurementId: "G-F0QXMVTPLQ"
}
console.log("Firebase Config:", firebaseConfig);
const app = !getApps().length? initializeApp(firebaseConfig):getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);
export {auth, firestore, app};
export const googleProvider = new GoogleAuthProvider();
