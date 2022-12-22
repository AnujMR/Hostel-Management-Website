import express from "express";
import { addStudent, getStudents, addRoom, getRooms } from "./firebase_config.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static('public'));
app.set("view engine", "ejs");
var studentList = [];
var roomsList = [];

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started at port 3000");
});

app.get("/", async (req, res) => {
    res.redirect("/public/html/dashboard.html");
});

app.get("/dashboard.html", async (req, res) => {
    res.redirect("/public/html/dashboard.html");
});

app.get("/profile.html", async (req, res) => {
    res.redirect("/public/html/profile.html");
});

//  ** Student Module **

app.get("/students", async (req, res) => {
    studentList = await getStudents();
    // console.log(studentList);
    res.render("students", {
        allStudents: studentList
    });
});

app.post("/studentDetails", async (req, res) => {
    // console.log(req.body);
    var myStudent;
    studentList.forEach((stud) => {
        if (stud.id === req.body.studentId) {
            myStudent = stud;
        }
    });
    // console.log(myStudent);
    res.render("studentDetails", {
        studentData: myStudent
    });
});

app.post("/addStudent", async (req, res) => {
    console.log(req.body);
    var studentData = { isStaying: true, rentStatus: "paid", ...req.body };
    addStudent(studentData);
    res.redirect("/students");
});


app.get("/staff.html", async (req, res) => {
    res.redirect("/public/html/staff.html");
});

//  ** Rooms Module **

app.get("/rooms", async (req, res) => {
    roomsList = await getRooms();
    roomsList.sort((a, b) => a.roomNo - b.roomNo);
    // console.log(roomsList);
    if (studentList.length <= 0) {
        studentList = await getStudents();
    }
    const thirdFloorTop = roomsList.filter(r => r["roomNo"] >= "301" && r["roomNo"] <= "305");
    const thirdFloorBottom = roomsList.filter(r => r["roomNo"] >= "306" && r["roomNo"] <= "309");
    const secondFloorTop = roomsList.filter(r => r["roomNo"] >= "201" && r["roomNo"] <= "205");
    const secondFloorBottom = roomsList.filter(r => r["roomNo"] >= "206" && r["roomNo"] <= "209");
    const firstFloorTop = roomsList.filter(r => r["roomNo"] >= "101" && r["roomNo"] <= "105");
    const firstFloorBottom = roomsList.filter(r => r["roomNo"] >= "106" && r["roomNo"] <= "109");
    const groundFloorTop = roomsList.filter(r => r["roomNo"] >= "001" && r["roomNo"] <= "005");
    const groundFloorBottom = roomsList.filter(r => r["roomNo"] >= "006" && r["roomNo"] <= "009");
    var roomwiseStudents = {};
    roomsList.forEach(roomData => {
        roomwiseStudents[roomData["roomNo"]] = studentList.filter((s) => { return s.room === roomData["roomNo"]; });
    });
    // console.log(roomwiseStudents);

    res.render("rooms", {
        allRooms: roomsList,
        thirdFloorTop: thirdFloorTop,
        thirdFloorBottom: thirdFloorBottom,
        secondFloorTop: secondFloorTop,
        secondFloorBottom: secondFloorBottom,
        firstFloorTop: firstFloorTop,
        firstFloorBottom: firstFloorBottom,
        groundFloorTop: groundFloorTop,
        groundFloorBottom: groundFloorBottom,
        allStudents: roomwiseStudents,
    });
});

// app.post("/addRoom", async (req, res) => {
//     var roomData = {
//         roomNo: "309",
//         isEmpty: true
//     }
//     const response = await addRoom(roomData);
//     res.send({
//         message: response.message,
//         room: roomData.roomNo
//     })
// });