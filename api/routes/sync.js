// API route to sync resume data with JobTracker
import { analyzeResume } from "../services/resumeAnalyzer.js";
import express from "express";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["application/pdf", "text/plain", "text/x-plain"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and text files are allowed"));
    }
  },
});

/**
 * POST /api/sync/analyze-for-job
 * Analyze a resume for a specific job from JobTracker
 * Used when user wants to analyze resume for a particular job application
 */
router.post("/sync/analyze-for-job", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { jobId, jobTitle, companyName } = req.body;

    // Analyze the resume
    const analysis = await analyzeResume(req.file);

    // Return analysis with job context
    res.json({
      success: true,
      data: {
        jobId,
        jobTitle,
        companyName,
        analysis,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error analyzing resume for job:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to analyze resume",
    });
  }
});

/**
 * POST /api/sync/match-resume-to-job
 * Match resume content against a job description
 */
router.post("/sync/match-resume-to-job", async (req, res) => {
  try {
    const { resumeAnalysis, jobDescription } = req.body;

    if (!resumeAnalysis || !jobDescription) {
      return res
        .status(400)
        .json({
          error: "resumeAnalysis and jobDescription are required",
        });
    }

    // Simple matching: compare keywords from resume vs job description
    const resumeKeywords = [
      ...resumeAnalysis.keywords.present,
      ...resumeAnalysis.keywords.missing,
    ];
    const jobKeywords = jobDescription.match(/\b[a-z]+\b/gi) || [];

    const matchedKeywords = resumeKeywords.filter((keyword) =>
      jobKeywords.some((jk) =>
        jk.toLowerCase().includes(keyword.toLowerCase())
      )
    );

    const matchPercentage = Math.round(
      (matchedKeywords.length / resumeKeywords.length) * 100
    );

    res.json({
      success: true,
      data: {
        matchPercentage: Math.min(100, matchPercentage),
        matchedKeywords,
        missingKeywords: resumeAnalysis.keywords.missing,
        recommendations: generateRecommendations(
          resumeAnalysis,
          jobDescription
        ),
      },
    });
  } catch (error) {
    console.error("Error matching resume to job:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to match resume to job",
    });
  }
});

/**
 * Generate recommendations for tailoring resume to job
 */
function generateRecommendations(resumeAnalysis, jobDescription) {
  const recommendations = [];

  if (resumeAnalysis.score < 70) {
    recommendations.push(
      "Consider revising your resume before applying - current score is below 70"
    );
  }

  if (resumeAnalysis.keywords.missing.length > 5) {
    recommendations.push(
      `Add more of these keywords to match the job: ${resumeAnalysis.keywords.missing.slice(0, 3).join(", ")}`
    );
  }

  if (resumeAnalysis.categories.achievements.score < 70) {
    recommendations.push(
      "Add more quantifiable achievements to strengthen your candidacy"
    );
  }

  recommendations.push("Tailor your cover letter to highlight matching skills");

  return recommendations;
}

export default router;
