# Job Application Tracker - Setup Guide

## Overview
A modern job application tracking tool with AI-powered interview coaching and insights.

**Features:**
- 📝 Track job applications with status (Applied, Interview, Rejected, Offer)
- 💡 AI-powered interview insights and preparation tips
- 🎓 Interview coaching for any question
- 📊 Statistics dashboard showing application status distribution
- 🎨 Beautiful, responsive UI with bright yellow theme

## Prerequisites
- Node.js 18+ ([Download](https://nodejs.org))
- npm (comes with Node.js)
- OpenAI API key ([Get one free](https://platform.openai.com/api-keys))

## Installation & Setup

### 1. Install Dependencies
```bash
cd C:\Users\User\jobtracker
npm install
```

### 2. Configure OpenAI API
1. Visit [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create a new API key
3. Open `.env.local` in the project root
4. Replace `your_openai_api_key_here` with your actual API key:
```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
```

### 3. Start Development Server
```bash
npm run dev
```

Visit **http://localhost:3000** in your browser.

## Features & Usage

### 📋 Job Tracking
1. Click **"✨ Get Started"** or scroll to the form
2. Enter company name and position
3. Select application status
4. (Optional) Add salary and notes
5. Click **"Add Application"**
6. View all applications in the list below
7. Delete any application with the X button

### 💡 Interview Insights
1. From the job list, click **"Get Insights"** on any job
2. View AI-powered tips on:
   - Key strengths to highlight
   - Areas to prepare
   - Tough questions and answers
   - Smart questions to ask

### 🎓 Interview Coach
1. Navigate to the **Insights** page (from any job card)
2. In the **Interview Coach** section, enter your interview question
3. Click **"Get Coaching"**
4. Receive personalized coaching with:
   - STAR method example answers
   - Common mistakes to avoid
   - Ways to make your answer more impressive
   - Follow-up questions

### 📊 Statistics
The main page shows:
- Total applications
- Applications by status
- Visual breakdown with color-coded badges

## Build & Deployment

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel (Free)
1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add `OPENAI_API_KEY` environment variable
6. Click "Deploy"

**Live URL:** Your app will be available at `[your-name].vercel.app`

## Tech Stack
- **Frontend:** Next.js 16+ with React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **AI:** OpenAI (GPT-3.5-turbo)
- **Storage:** localStorage (client-side)
- **Styling:** Tailwind CSS with bright yellow theme

## Project Structure
```
jobtracker/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Main job tracker page
│   │   ├── insights/
│   │   │   └── page.tsx       # AI insights & coaching
│   │   ├── api/
│   │   │   ├── insights/      # Interview insights API
│   │   │   └── coach/         # Interview coaching API
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   └── [other config files]
├── .env.local                 # API key (⚠️ never commit!)
├── package.json               # Dependencies
├── tailwind.config.js         # Tailwind configuration
└── tsconfig.json              # TypeScript configuration
```

## Troubleshooting

### "OpenAI API key not configured"
- Add `OPENAI_API_KEY` to `.env.local`
- Restart the dev server after adding it
- Make sure it's in the correct format: `sk-...`

### Port 3000 already in use
```bash
# Kill all node processes
taskkill /IM node.exe /F

# Start dev server again
npm run dev
```

### PowerShell execution policy error
```powershell
# Run as Administrator:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

## Next Steps
- ✅ Core job tracking built
- ✅ AI insights integrated
- ✅ Interview coaching live
- 🔜 Add database (Supabase)
- 🔜 User authentication
- 🔜 Job analytics & trends
- 🔜 Email notifications

## Support
If you encounter issues, check:
1. Node.js is installed: `node --version`
2. npm is updated: `npm update -g npm`
3. `.env.local` has valid OpenAI API key
4. All dependencies installed: `npm install`

---

**Built to impress! 🚀**
