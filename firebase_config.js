import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, increment, deleteDoc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

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

var allRooms;
var allStudents;
var admin;

// ** Student Module **

export async function addStudent(studentData) {
    try {

        const studDocRef = await addDoc(collection(db, "students"), studentData);
        const docRef = doc(db, "rooms", studentData.roomId);
        const updatedRoom = await updateDoc(docRef, { studentCount: increment(1) });

        const file = document.querySelector('#file').files[0];
        console.log(file);

        const storage = getStorage();
        const storageRef = ref(storage, 'some-child');

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });

        // const ref = getStorage();
        // const file = document.querySelector('#profile_pic').files[0]
        // const name = (+new Date()) + '-' + file.name;
        // const metadata = {
        //     contentType: file.type
        // };
        // const task = ref.child(name).put(file, metadata);
        // task
        //     .then(snapshot => snapshot.ref.getDownloadURL())
        //     .then(async (url) => {
        //         console.log(url);
        //         const updatedStudent = await updateDoc(studDocRef, { avatar: url });
        //         // document.querySelector('#someImageTagID').src = url;
        //     })
        //     .catch(console.error);


        console.log("Student added successfully");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function updateStudent(studentId, studentData) {
    try {

        // update old room
        var oldRoomId = allRooms.find(r => r.roomNo == allStudents.find(s => s.id == studentId).room).id;
        const oldRoomDoc = doc(db, "rooms", oldRoomId);
        const oldUpdatedRoom = await updateDoc(oldRoomDoc, { studentCount: increment(-1) });

        const docRef = doc(db, "students", studentId);
        const updatedStudent = await updateDoc(docRef, studentData);

        // update new room
        var roomId = allRooms.find(r => r.roomNo == studentData.room).id;
        const roomDoc = doc(db, "rooms", roomId);
        const updatedRoom = await updateDoc(roomDoc, { studentCount: increment(1) });

        // console.log(studentList);
        console.log("Students fetched successfully");
        return updatedStudent;
    } catch (e) {
        console.error("Error fetching students: ", e);
    }
}

export async function deleteStudent(studentId) {
    try {

        const studentDoc = doc(db, "students", studentId);
        const updatedRoom = await deleteDoc(studentDoc);

        // console.log(studentList);
        console.log("Student deleted successfully");
        return updatedStudent;
    } catch (e) {
        console.error("Error deleting student: ", e);
    }
}

export async function getStudents() {
    try {
        const studentsCol = collection(db, 'students');
        const studentSnapshot = await getDocs(studentsCol);
        const studentList = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // console.log(studentList);
        console.log("Students fetched successfully");
        allStudents = studentList;
        return studentList;
    } catch (e) {
        console.error("Error fetching students: ", e);
    }
}

// ** Rooms Module **

export async function addRoom(roomData) {
    try {
        const docRef = await addDoc(collection(db, "rooms"), roomData);
        console.log("Room added successfully");
        return { message: "Success" };
    } catch (e) {
        console.error("Error adding document: ", e);
        return { message: "Failed" };
    }
}


export async function getRooms() {
    try {
        const roomsCol = collection(db, 'rooms');
        const roomsSnapshot = await getDocs(roomsCol);
        const roomsList = roomsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        allRooms = roomsList;
        // console.log(roomsList);
        console.log("Rooms fetched successfully");
        return roomsList;
    } catch (e) {
        console.error("Error fetching rooms: ", e);
    }
}

// Profile Module

export async function getAdminDetails() {
    try {
        const adminCol = collection(db, 'admin');
        const adminSnapshots = await getDocs(adminCol);
        const adminDoc = adminSnapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
        admin = adminDoc;
        // console.log(adminDoc);
        console.log("Admin fetched successfully");
        return adminDoc;
    } catch (e) {
        console.error("Error fetching admin: ", e);
    }
}


export async function updateAdmin(adminData) {
    try {

        const docRef = doc(db, "admin", admin.id);
        const updatedAdmin = await updateDoc(docRef, adminData);

        // console.log(studentList);
        console.log("Admin updated successfully");
        return updatedAdmin;
    } catch (e) {
        console.error("Error updating admin: ", e);
    }
}