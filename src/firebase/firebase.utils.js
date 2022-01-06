// import firebase from "firebase/app";
// import "firebase/firestore";


import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, getDoc } from 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyAFoTFtLUnYLFbb89gTQgtmhQtZIKe3ZAY",
    authDomain: "react-course-57b20.firebaseapp.com",
    projectId: "react-course-57b20",
    storageBucket: "react-course-57b20.appspot.com",
    messagingSenderId: "410972443693",
    appId: "1:410972443693:web:eb9319acddc9f3af1e14a4",
    measurementId: "G-2VKDRLYFES"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
const auth = getAuth();

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        return;
    }
    //const usersCollectionRef = collection(db, `users`);
    const userDocumentRef = doc(db, `users/${userAuth.uid}`);
    const usersSnapshot = await getDoc(userDocumentRef);
    if (!usersSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const created = new Date();
        try {

            // Add a new document in collection "cities"
            await setDoc(doc(db, "users", userAuth.uid), {
                displayName, email, created, ...additionalData
            });
        } catch (error) {
            console.log.error("failed to create user ", error);
        }
    }else{
        console.log("data exists");
    }
    return userDocumentRef;
}

export const signInWithGoogle = () => (signInWithPopup(auth, provider));