const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps, curl, postman)
        if (!origin) return callback(null, true);

        // allow any localhost origin (different Vite ports during dev)
        if (
          origin.startsWith("http://localhost") ||
          origin.startsWith("http://127.0.0.1")
        ) {
          return callback(null, true);
        }

        // otherwise block
        return callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
    })
  );
}

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    success: true,
    message: "Backend is running",
  });
});

// Serve the production React build when it is available. During local
// development, Vite serves the frontend and proxies /api to this server.
const frontendBuildPath = path.join(__dirname, "public");
const frontendIndexPath = path.join(frontendBuildPath, "index.html");

if (fs.existsSync(frontendIndexPath)) {
  const serveFrontend = express.static(frontendBuildPath);

  app.use((req, res, next) => {
    if (req.path === "/api" || req.path.startsWith("/api/")) {
      return next();
    }

    return serveFrontend(req, res, next);
  });

  // SPA fallback: client-side routes return React's index.html.
  app.use((req, res, next) => {
    if (
      req.method !== "GET" ||
      req.path === "/api" ||
      req.path.startsWith("/api/")
    ) {
      return next();
    }

    return res.sendFile(frontendIndexPath);
  });
}

// Connect to the database only when this file starts the server directly.
// Tests can import the Express app without requiring a live MongoDB instance.
if (require.main === module) {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

module.exports = app;
