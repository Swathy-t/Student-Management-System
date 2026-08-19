const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend files
app.use(express.static(__dirname));

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "home.html"));
});

// Test API
app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "Student Management Server is running!"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(Server running at http://localhost:${PORT});
});