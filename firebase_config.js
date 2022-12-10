import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBXEWL4rfFq7MC1aRWoQPta_MtC84J8mVE",
    authDomain: "hostel-management-website.firebaseapp.com",
    projectId: "hostel-management-website",
    storageBucket: "hostel-management-website.appspot.com",
    messagingSenderId: "169655480979",
    appId: "1:169655480979:web:efc68f00a399591c559366",
    measurementId: "G-TZ98YSQ3GZ"
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

export async function getStudents() {
    try {
        const studentsCol = collection(db, 'students');
        const studentSnapshot = await getDocs(studentsCol);
        const studentList = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(studentList);
        console.log("Students fetched successfully");
        return studentList;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}