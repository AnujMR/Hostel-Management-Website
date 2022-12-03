import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_Auth_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const firebaseapp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseapp);

export async function addStudent(studentData) {
    try {
        const docRef = await addDoc(collection(db, "students"), studentData);
        console.log("Student added successfully");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}