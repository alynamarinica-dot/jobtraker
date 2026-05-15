# JobTracker with Resume Enhancement Platform

This repository contains an integrated JobTracker application with an AI-powered Resume Enhancement Platform backend.

## Project Structure

```
jobtracker/
├── src/                    # Next.js frontend (React)
│   ├── app/
│   │   ├── page.tsx       # Main JobTracker page with Resume Manager tab
│   │   └── components/
│   │       └── ResumeManager.tsx  # Resume upload & analysis UI
│   └── ...
├── api/                    # Express.js backend for Resume Analysis
│   ├── services/
│   │   └── resumeAnalyzer.js      # Core AI analysis logic
│   └── routes/
│       └── sync.js                # API endpoints for integration
├── server.js               # Express server entry point
├── package.json            # Dependencies & scripts
├── .env                    # Server environment variables
├── .env.local              # Frontend environment variables
└── ...
```

## Features

### JobTracker (Next.js Frontend)
- Job application tracking and management
- OpenAI integration for job insights
- Integration with Resume Manager for resume analysis

### Resume Enhancement Platform (Express Backend)
- PDF and TXT file upload
- AI-powered resume analysis using Google Generative AI (Gemini)
- 5-category scoring system:
  - Content Quality
  - Keywords & ATS Optimization
  - Formatting & Structure
  - Achievements & Metrics
  - Skills Alignment
- Demo mode fallback for testing without API key
- Cross-origin request support (CORS)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**

   **For the frontend (.env.local):**
   ```
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_API_KEY=your_google_api_key
   RESUME_API_PORT=3001
   ```

   **For the server (.env):**
   ```
   PORT=3001
   NODE_ENV=development
   GOOGLE_API_KEY=your_google_api_key
   ```

   Get your keys:
   - **Google API Key**: https://aistudio.google.com/app/apikey
   - **OpenAI API Key**: https://platform.openai.com/api-keys

## Running the Application

### Option 1: Run both servers concurrently (recommended for development)
```bash
npm run dev:all
```
This will start:
- NextJS frontend: http://localhost:3000
- Resume API: http://localhost:3001

### Option 2: Run servers separately in different terminals

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run dev:api
```

### Option 3: Production setup
```bash
npm run build        # Build NextJS app
npm start            # Start production NextJS server
npm start:api        # In another terminal, start production API
```

## API Endpoints

### Resume Analysis
- **POST** `/api/analyze-resume`
  - Upload and analyze a resume file
  - Accepts: PDF or TXT files (max 5MB)
  - Returns: Detailed analysis with score and recommendations

### Sync Routes (for JobTracker integration)
- **POST** `/api/sync/analyze-for-job`
  - Analyze resume for a specific job application
  
- **POST** `/api/sync/match-resume-to-job`
  - Match resume against job description

### Health Check
- **GET** `/api/health`
  - Check if Resume API is running

## Usage

1. **Navigate to JobTracker:**
   Open http://localhost:3000 in your browser

2. **Click "📄 Resumes" tab** to access Resume Manager

3. **Upload a resume:**
   - Drag & drop or select a PDF/TXT file
   - Wait for analysis to complete

4. **View results:**
   - Overall score (0-100)
   - 5-category breakdown
   - Strengths, improvements, and action items
   - Keywords analysis (present vs missing)

## Features in Detail

### Resume Analysis Categories
1. **Content Quality** - Professional relevance and impact
2. **Keywords & ATS** - Industry terminology and ATS optimization
3. **Formatting** - Layout, readability, and structure
4. **Achievements** - Quantifiable results and metrics
5. **Skills** - Relevance to market trends and target roles

### Analysis Output
```json
{
  "score": 78,
  "summary": "Resume overview",
  "categories": {
    "content": { "score": 75, "title": "...", "feedback": "..." },
    "keywords": { "score": 82, "title": "...", "feedback": "..." },
    "formatting": { "score": 80, "title": "...", "feedback": "..." },
    "achievements": { "score": 72, "title": "...", "feedback": "..." },
    "skills": { "score": 76, "title": "...", "feedback": "..." }
  },
  "strengths": ["Strength 1", "Strength 2", ...],
  "improvements": ["Improvement 1", "Improvement 2", ...],
  "actionItems": ["Action 1", "Action 2", ...],
  "keywords": {
    "present": ["Keyword 1", "Keyword 2", ...],
    "missing": ["Keyword 1", "Keyword 2", ...]
  }
}
```

## Demo Mode

If the Google API key is invalid or unavailable, the system will automatically use demo mode, which generates realistic sample analysis based on the resume content. This allows testing without API credentials.

## Troubleshooting

### Port Already in Use
If port 3000 or 3001 is already in use:
```bash
# Find and kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or change port in .env
RESUME_API_PORT=3002
```

### CORS Errors
The server has CORS enabled for all origins. If you still see CORS errors:
1. Check that both servers are running on the correct ports
2. Verify ResumeManager.tsx is calling `http://localhost:3001/api/analyze-resume`

### API Key Not Found
1. Verify `.env` has `GOOGLE_API_KEY=your_key`
2. Check that the key is valid at https://aistudio.google.com/app/apikey
3. Restart the server after updating .env

## GitHub Deployment

This repository is set up for easy GitHub deployment:

1. Update `.gitignore` (already excludes `.env` and `.env.local`)
2. Create a new repository on GitHub
3. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: JobTracker with Resume Enhancement Platform"
   git branch -M main
   git remote add origin https://github.com/your-username/jobtracker.git
   git push -u origin main
   ```

## Environment Setup for CI/CD

For deployment services (Vercel, etc.):

**Frontend Environment Variables:**
- `OPENAI_API_KEY` - Your OpenAI API key
- `GOOGLE_API_KEY` - Your Google API key

**Backend Environment Variables:**
- `NODE_ENV` - Set to `production`
- `PORT` - Port for API (default 3001)
- `GOOGLE_API_KEY` - Your Google API key

## Security Notes

- **Never commit** `.env` or `.env.local` files
- Keep API keys secure and rotated regularly
- In production, use environment variable services
- Implement rate limiting for API endpoints
- Add authentication/authorization as needed

## Technologies Used

### Frontend
- Next.js 16.2.4
- React 19.2.4
- TypeScript
- Tailwind CSS
- OpenAI SDK

### Backend
- Node.js with Express.js
- Google Generative AI (Gemini)
- PDF Parse for document processing
- Multer for file uploads
- CORS middleware

## License

MIT

## Support

For issues or questions, please check:
1. Environment variables are correctly set
2. Both servers are running (`npm run dev:all`)
3. Ports 3000 and 3001 are available
4. API keys are valid and have necessary permissions
