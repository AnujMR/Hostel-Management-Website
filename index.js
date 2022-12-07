import express from "express";
import { addStudent } from "./firebase_config.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('html'));

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started at port 3000");
});

app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/front_end/html/dashboard.html");
});

app.get("/dashboard.html", async (req, res) => {
    res.sendFile(__dirname + "/front_end/html/dashboard.html");
});

app.get("/profile.html", async (req, res) => {
    res.sendFile(__dirname + "/front_end/html/profile.html");
});

app.get("/rooms.html", async (req, res) => {
    res.sendFile(__dirname + "/front_end/html/rooms.html");
});

app.get("/students.html", async (req, res) => {
    res.sendFile(__dirname + "/front_end/html/students.html");
});

app.get("/staff.html", async (req, res) => {
    res.sendFile(__dirname + "/front_end/html/staff.html");
});