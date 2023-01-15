import express from "express";
import { addStudent, getStudents, addRoom, getRooms, updateStudent, deleteStudent, getExpenses, addExpense, getAdminDetails, updateAdmin } from "./firebase_config.js";
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
    res.redirect("loginScreen");
});

app.get("/loginScreen", async (req, res) => {
    var adminData = await getAdminDetails();
    res.render("loginScreen",{
        adminData: adminData
    });
});

app.post("/changePassword", async (req, res) => {
    var newPassword = req.body.newPassword;
    console.log(newPassword);
    var updatedAdmin = await updateAdmin({
        password: newPassword
    });
    res.redirect("/profile");
});

app.get("/dashboard", async (req, res) => {
    studentList = await getStudents();
    roomsList = await getRooms();
    var expensesList = await getExpenses();
    var noOfStudents = studentList.length;
    var totalRooms = roomsList.length;
    var noOfoccupiedRooms = roomsList.filter(r=> r.studentCount >= 3).length;
    res.render("dashboard",{
        students: noOfStudents,
        rooms : totalRooms,
        occupiedRooms : noOfoccupiedRooms,
        expenses: expensesList
    });
});

app.get("/profile", async (req, res) => {
    var adminDetails = await getAdminDetails();
    // console.log(adminDetails);
    res.render("profile", {
        adminData: adminDetails
    });
});

//  ** Student Module **

app.get("/students", async (req, res) => {
    roomsList = await getRooms();
    roomsList.sort((a, b) => a.roomNo - b.roomNo);
    studentList = await getStudents();
    var availableRooms = roomsList.filter(r => r.studentCount < 3);
    // console.log(availableRooms);
    res.render("students", {
        allStudents: studentList,
        allRooms: availableRooms
    });
});

app.post("/studentDetails", async (req, res) => {
    // console.log(req.body);
    var myStudent;
    var availableRooms = roomsList.filter(r => r.studentCount < 3);
    studentList.forEach((stud) => {
        if (stud.id === req.body.studentId) {
            myStudent = stud;
        }
    });
    // console.log(myStudent);
    res.render("studentDetails", {
        studentData: myStudent,
        allRooms: availableRooms
    });
});

app.post("/addStudent", async (req, res) => {
    console.log(req.body);
    var studentRoom = roomsList.find(r => r.roomNo == req.body.room);
    var studentData = { isStaying: true, rentStatus: "paid", roomId: studentRoom.id, ...req.body };
    addStudent(studentData);
    res.redirect("/students");
});

app.post("/updateStudent", async (req, res) => {
    // console.log(req.body);
    updateStudent(req.body.id, req.body);
    res.redirect("/students")
});

app.post("/deleteStudent", async (req, res) => {
    console.log(req.body);
    deleteStudent(req.body.studentId);
    // updateStudent(req.body.id, req.body);
    res.redirect("/students")
});


app.get("/staff", async (req, res) => {
    res.render("staff");
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

// Expense Module

app.post("/addNewExpense", async (req, res) => {
    // console.log(req.body);
    var currentDate = new Date();
    var expenseData = {
        year: currentDate.getFullYear(),
        month: currentDate.toLocaleDateString('en-US', { month: 'long' }),
        date: currentDate.getDate(),
        amount: Number(req.body.amount),
        title: req.body.title
    };
    addExpense(expenseData);
    res.redirect("/dashboard");
});