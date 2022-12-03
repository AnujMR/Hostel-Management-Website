import express from "express";
import { addStudent } from "./firebase_config.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started at port 3000");
});

app.get("/", async (req, res) => {
    res.send("It's working!");
    const userData = {
        name: "Anuj Ramane",
        age: 19,
        isStaying: true
    };
    addStudent(userData);
});