import "dotenv/config.js";
import express from "express";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { analyzeResume } from "./api/services/resumeAnalyzer.js";
import syncRoutes from "./api/routes/sync.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.RESUME_API_PORT || 3001;

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["application/pdf", "text/plain", "text/x-plain"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and text files are allowed"));
    }
  },
});

// ─── Routes ─────────────────────────────────────────────────────────

// Sync routes (for JobTracker integration)
app.use("/api", syncRoutes);

// ─── POST /api/analyze-resume ─────────────────────────────────────
// Accepts a file upload, extracts text, and returns AI-powered analysis
app.post("/api/analyze-resume", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const analysis = await analyzeResume(req.file);
    res.json({ success: true, analysis });
  } catch (error) {
    console.error("Error analyzing resume:", error.message);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to analyze resume",
    });
  }
});

// ─── Health Check ───────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Resume API is running" });
});

// ─── 404 Handler ────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// ─── Server Startup ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Resume API server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
