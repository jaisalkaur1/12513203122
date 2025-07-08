const express = require("express");
const Log = require('./utils/logger'); // middleware

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// CORS middleware to allow requests from React app
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Home route
app.get("/", (req, res) => {
  res.send("Hello! Server is running.");
});

// Logging endpoint for frontend
app.post("/log", async (req, res) => {
  try {
    const { stack, level, package: pkg, message } = req.body;

    if (!stack || !level || !pkg || !message) {
      return res.status(400).json({ error: "Missing required fields: stack, level, package, message" });
    }

    await Log(stack, level, pkg, message);
    res.status(200).json({ success: true, message: "Log sent successfully" });
  } catch (error) {
    console.error("Error in logging endpoint:", error);
    res.status(500).json({ error: "Failed to process log" });
  }
});

// Error simulation + log
app.get("/test", async (req, res) => {
  try {
    throw new Error("Simulated crash");
  } catch (err) {
    await Log("backend", "error", "handler", err.message);
    res.status(500).send("Error occurred and logged");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
