
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;

        console.log({
            method: req.method,
            path: req.path,
            status: res.statusCode,
            duration: `${duration}ms`,
            timestamp: new Date().toISOString()
        });
    });

    next();
});

// Home endpoint
app.get("/", (req, res) => {
    res.json({ message: "CloudWatch Monitoring Lab API" });
});

// Health check
app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        uptime: process.uptime()
    });
});

// Simulate normal requests
app.get("/users", (req, res) => {
    res.json({
        users: ["Eugene", "John", "Mary"]
    });
});

// Generate an application error
app.get("/error", (req, res) => {
    res.status(500).json({
        error: "Simulated internal server error"
    });
});

// Simulate slow responses
app.get("/slow", async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 5000));

    res.json({ message: "Slow response completed" });
});

// Simulate CPU-intensive work
app.get("/cpu", (req, res) => {
    let result = 0;

    for (let i = 0; i < 100_000_000; i++) {
        result += Math.sqrt(i);
    }

    res.json({
        message: "CPU workload completed",
        result
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
