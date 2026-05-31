const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const nodemailer = require("nodemailer");
const connectDB = require("./config/db");
const Consultation = require("./models/Consultation");
const cors = require("cors");

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

const createTransporter = () => {
    if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
        return null;
    }

    return nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT) || 587,
        secure: process.env.MAIL_SECURE === "true",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });
};

const escapeHtml = (value = "") => String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const sendConsultationEmail = async (consultation) => {
    const ownerEmail = process.env.WEBSITE_OWNER_EMAIL;
    const transporter = createTransporter();

    if (!ownerEmail || !transporter) {
        console.warn("Consultation email skipped: mail environment is incomplete.");
        return;
    }

    await transporter.sendMail({
        from: process.env.MAIL_FROM || process.env.MAIL_USER,
        to: ownerEmail,
        replyTo: consultation.email,
        subject: `New consultation request from ${consultation.name}`,
        text: [
            "A new consultation request was submitted.",
            "",
            `Name: ${consultation.name}`,
            `Email: ${consultation.email}`,
            `Phone: ${consultation.phone}`,
            `Health Goal: ${consultation.service || "Not provided"}`,
            "",
            "Message:",
            consultation.message || "Not provided"
        ].join("\n"),
        html: `
            <h2>New consultation request</h2>
            <p><strong>Name:</strong> ${escapeHtml(consultation.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(consultation.email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(consultation.phone)}</p>
            <p><strong>Health Goal:</strong> ${escapeHtml(consultation.service || "Not provided")}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(consultation.message || "Not provided")}</p>
        `
    });
};

// Middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Home Route
app.get("/", (req, res) => {
    res.send("Mātrāśin Server Running");
});

// Consultation Form Route
app.post("/consultation", async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Name, email and phone are required."
            });
        }

        const consultation = await Consultation.create({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            service: service ? service.trim() : "",
            message: message ? message.trim() : ""
        });

        await sendConsultationEmail(consultation);

        res.status(201).json({
            success: true,
            message: "Consultation request received"
        });
    } catch (error) {
        console.error("Consultation submission error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to submit consultation request. Please try again."
        });
    }

});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
