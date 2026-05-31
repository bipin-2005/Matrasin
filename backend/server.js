const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT;

// Middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files
app.use(express.static("public"));

// Home Route
app.get("/", (req, res) => {
    res.send("Mātrāśin Server Running");
});

// Consultation Form Route
app.post("/consultation", (req, res) => {

    console.log(req.body);

    res.json({
        success: true,
        message: "Consultation request received"
    });

});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});