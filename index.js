import express from "express";
import { addStudent, getStudents } from "./firebase_config.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static('public'));
app.set("view engine", "ejs");

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

app.get("/rooms.html", async (req, res) => {
    res.redirect("/public/html/rooms.html");
});

app.get("/students.html", async (req, res) => {
    var response = getStudents();
    res.redirect("/public/html/students.html");
});

app.get("/studentDetails.html", async (req, res) => {
    res.render("studentDetails");
});

app.get("/staff.html", async (req, res) => {
    res.redirect("/public/html/staff.html");
});