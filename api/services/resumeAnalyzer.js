import pdfParse from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with API key if available
let genAI = null;
if (process.env.GOOGLE_API_KEY && process.env.GOOGLE_API_KEY !== "your_google_api_key_here") {
  try {
    genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  } catch (error) {
    console.warn("Failed to initialize Google AI:", error.message);
  }
}

/**
 * Extract text from uploaded file
 */
async function extractTextFromFile(file) {
  if (file.mimetype === "application/pdf") {
    const data = await pdfParse(file.buffer);
    return data.text;
  } else {
    // Plain text file
    return file.buffer.toString("utf-8");
  }
}

/**
 * Analyze resume using Google Generative AI
 */
export async function analyzeResume(file) {
  // Extract text from file
  const resumeText = await extractTextFromFile(file);

  if (!resumeText || resumeText.trim().length === 0) {
    throw new Error("Could not extract text from the provided file");
  }

  // Create analysis prompt
  const analysisPrompt = `You are an expert resume reviewer and career coach. Analyze the following resume and provide detailed, actionable feedback.

RESUME:
${resumeText}

Please analyze this resume and provide your response in the following JSON format (valid JSON only, no markdown):
{
  "score": <0-100 overall score>,
  "summary": "<1-2 sentence summary of the resume's overall quality>",
  "categories": {
    "content": {
      "score": <0-100>,
      "title": "Content Quality",
      "feedback": "<specific feedback on content quality, relevance, and impact>"
    },
    "keywords": {
      "score": <0-100>,
      "title": "Keywords & ATS Optimization",
      "feedback": "<feedback on industry keywords and ATS optimization>"
    },
    "formatting": {
      "score": <0-100>,
      "title": "Formatting & Structure",
      "feedback": "<feedback on layout, formatting, and readability>"
    },
    "achievements": {
      "score": <0-100>,
      "title": "Achievements & Metrics",
      "feedback": "<feedback on quantifiable results and impact statements>"
    },
    "skills": {
      "score": <0-100>,
      "title": "Skills Alignment",
      "feedback": "<feedback on skill relevance and market trends>"
    }
  },
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>", "<improvement 4>", "<improvement 5>"],
  "actionItems": ["<action 1>", "<action 2>", "<action 3>"],
  "keywords": {
    "present": ["<keyword 1>", "<keyword 2>"],
    "missing": ["<missing keyword 1>", "<missing keyword 2>"]
  }
}

Ensure the response is valid JSON that can be parsed directly.`;

  try {
    // Try to use Google API if available
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(analysisPrompt);
        const analysisText = result.response.text();

        let analysis;
        try {
          analysis = JSON.parse(analysisText);
        } catch {
          const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            analysis = JSON.parse(jsonMatch[0]);
          } else {
            throw new Error("Could not parse AI response");
          }
        }

        return analysis;
      } catch (apiError) {
        console.warn("Google API error, using demo mode:", apiError.message);
        // Fall through to demo mode
      }
    }

    // Demo/Mock mode - return realistic sample analysis
    console.log("Using DEMO MODE - returning sample analysis");
    return generateDemoAnalysis(resumeText);
  } catch (error) {
    console.error("Resume analysis error:", error.message);
    throw error;
  }
}

/**
 * Generate realistic demo analysis for testing
 */
function generateDemoAnalysis(resumeText) {
  // Detect if resume has certain elements
  const hasMetrics = /\d+%|\$\d+|increased|improved|reduced/i.test(resumeText);
  const hasKeywords = /leadership|collaboration|communication|problem-solving/i.test(resumeText);
  const hasEducation = /bachelor|master|phd|degree/i.test(resumeText);
  const hasExperience = /years|year of|experience/i.test(resumeText);

  const baseScore = 65;
  const metricsBonus = hasMetrics ? 15 : 0;
  const keywordBonus = hasKeywords ? 10 : 0;
  const totalScore = Math.min(100, baseScore + metricsBonus + keywordBonus);

  return {
    score: totalScore,
    summary: `This resume shows ${totalScore > 75 ? "strong" : "moderate"} potential with clear professional experience. ${totalScore < 70 ? "There are several areas for improvement to increase impact." : "Consider the suggestions below to make it even stronger."}`,
    categories: {
      content: {
        score: hasExperience ? 78 : 65,
        title: "Content Quality",
        feedback: `Your resume ${hasExperience ? "effectively showcases your professional experience" : "could benefit from more specific work experience details"}. Focus on using action verbs and ${hasMetrics ? "you've done well with" : "include more"} quantifiable results in your job descriptions.`
      },
      keywords: {
        score: hasKeywords ? 82 : 60,
        title: "Keywords & ATS Optimization",
        feedback: `Your resume ${hasKeywords ? "includes strong industry keywords" : "could benefit from more industry-specific keywords"}. ATS systems will ${hasKeywords ? "easily recognize your qualifications" : "have difficulty matching your profile"}. Consider adding technical skills and industry terms relevant to your target roles.`
      },
      formatting: {
        score: 75,
        title: "Formatting & Structure",
        feedback: "Your resume structure is clean and professional. Ensure consistent formatting, proper spacing, and clear section headers. Use a simple, readable font and maintain consistent date formats throughout."
      },
      achievements: {
        score: hasMetrics ? 80 : 55,
        title: "Achievements & Metrics",
        feedback: `${hasMetrics ? "Great! You've included quantifiable results." : "This is an area for improvement."} Instead of just listing duties, focus on achievements. Use metrics like percentages, dollar amounts, or time saved to demonstrate your impact. Example: 'Increased sales by 25%' instead of 'Responsible for sales.'`
      },
      skills: {
        score: hasEducation ? 76 : 68,
        title: "Skills Alignment",
        feedback: `Your skills section ${hasEducation ? "aligns well with your background" : "could be strengthened"} and job market trends. Highlight technical and soft skills that match your target positions. Ensure top skills relevant to your industry are listed first.`
      }
    },
    strengths: [
      hasExperience ? "Clear professional experience highlighted" : "Resume provides basic overview",
      "Organized structure and formatting",
      hasKeywords ? "Good use of industry terminology" : "Professional presentation"
    ],
    improvements: [
      `${hasMetrics ? "Continue showcasing" : "Add more"} quantifiable results and metrics to each role`,
      "Include more relevant industry keywords for ATS optimization",
      "Strengthen action verbs at the beginning of each bullet point",
      "Consider adding a professional summary or objective",
      "Ensure consistent date formatting and terminology throughout"
    ],
    actionItems: [
      "Revise job descriptions to start with strong action verbs (Led, Managed, Increased, etc.)",
      "Add metrics and numbers to demonstrate impact and results",
      "Review and add relevant keywords from job descriptions of your target positions"
    ],
    keywords: {
      present: hasKeywords ? ["Leadership", "Communication", "Problem-solving", "Collaboration"] : ["Professional", "Experience"],
      missing: ["Technical skills specific to your role", "Industry certifications", "Quantifiable achievements", "Software/tools expertise"]
    }
  };
}
