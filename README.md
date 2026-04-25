# 🚀 Job Application Tracker

A modern, AI-powered job application tracking tool to help you land your dream job. Built with Next.js, React, TypeScript, and OpenAI.

## ✨ Features

- **📝 Job Tracking** - Add, view, and manage all your job applications
- **💡 AI Interview Insights** - Get personalized interview tips powered by OpenAI
- **🎓 Interview Coach** - Practice with AI-powered interview coaching
- **📊 Statistics Dashboard** - Visual overview of your application statuses
- **🎨 Beautiful UI** - Responsive design with bright yellow theme
- **⚡ Fast & Modern** - Built with Next.js 16, React 19, TypeScript

## 🎯 Quick Start

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org))
- OpenAI API key ([Get free](https://platform.openai.com/api-keys))

### Installation
```bash
# 1. Navigate to project
cd C:\Users\User\jobtracker

# 2. Install dependencies
npm install

# 3. Create .env.local with your OpenAI API key
# (See SETUP.md for detailed instructions)

# 4. Start the dev server
npm run dev
```

Visit **http://localhost:3000** in your browser.

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Detailed setup and configuration guide
- **[DEPLOY.md](./DEPLOY.md)** - How to deploy to Vercel (live on internet)

## 🏗️ Project Structure

```
jobtracker/
├── src/app/
│   ├── page.tsx              # Job tracker main page
│   ├── insights/page.tsx     # AI insights & coaching
│   ├── api/
│   │   ├── insights/route.ts # Interview insights API
│   │   └── coach/route.ts    # Interview coaching API
│   ├── globals.css           # Tailwind styles
│   └── layout.tsx            # Root layout
├── public/                   # Static files
├── .env.local               # API keys (never commit!)
├── SETUP.md                 # Setup instructions
├── DEPLOY.md                # Deployment guide
└── package.json             # Dependencies
```

## 🚀 Deployment

To deploy to Vercel (free, takes 5 minutes):

1. Read [DEPLOY.md](./DEPLOY.md)
2. Push to GitHub
3. Connect to Vercel
4. Add `OPENAI_API_KEY` environment variable
5. Done! Your app is live

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Next.js 16, TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Backend** | Next.js API Routes |
| **AI** | OpenAI GPT-3.5-turbo |
| **Storage** | localStorage (client-side) |
| **Hosting** | Vercel (free) |

## 📖 How to Use

### Track Jobs
1. Fill in company and position
2. Select application status
3. (Optional) Add salary and notes
4. Click "Add Application"

### Get Interview Insights
1. Click "Get Insights" on any job
2. View AI-generated tips for interview preparation

### Practice with Coach
1. Go to job's "Insights" page
2. Ask any interview question
3. Get personalized AI coaching

### View Statistics
- See total applications
- Breakdown by status
- Color-coded application types

## 🔑 Environment Variables

Create `.env.local` with:
```
OPENAI_API_KEY=sk-your-actual-key-here
```

Get your key from [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

## 📦 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
```

## 🐛 Troubleshooting

### "OpenAI API key not configured"
- Add `OPENAI_API_KEY` to `.env.local`
- Restart dev server
- See SETUP.md for details

### Port 3000 already in use
```bash
taskkill /IM node.exe /F    # Kill all Node processes
npm run dev                   # Start fresh
```

## 💡 Tips for Impressing Founders

1. ✅ **Ship fast** - Have a working demo ready
2. ✅ **Show initiative** - Built something useful for yourself
3. ✅ **Clean code** - Well-structured, documented code
4. ✅ **Use modern tech** - Next.js, TypeScript, AI integration
5. ✅ **Deploy it** - Live on the internet (not just localhost)
6. ✅ **Mobile friendly** - Works on phones and tablets
7. ✅ **Write docs** - Clear setup and usage instructions

This tracker checks all those boxes! 🎉

---

**Ready to land your dream job? Let's go! 🚀**
- Add notes about the job, team, or interview details

### 2. Monitor Progress
- View statistics dashboard showing:
  - Total applications
  - Number of interviews scheduled
  - Offers received
  - Success rate (% of interviews/offers vs applications)

### 3. Get AI Insights (Optional)
- Click "View AI Insights" on any job card
- Get personalized interview tips based on the company and position
- Practice with the Interview Coach feature

### 4. Interview Coach (Optional)
- Ask interview questions
- Get AI-powered feedback and tips for answering
- Improve your interview skills with STAR method guidance

## Setting Up AI Features (Optional) 🤖

To enable AI-powered insights and coaching:

1. **Get OpenAI API Key**:
   - Go to https://platform.openai.com/api-keys
   - Create a new API key
   - Copy the key

2. **Create `.env.local` file** (in the project root):
```bash
OPENAI_API_KEY=your_api_key_here
```

3. **Install OpenAI package**:
```bash
npm install openai
```

4. **Uncomment the AI code** in:
   - `src/app/api/insights/route.ts`
   - `src/app/api/coach/route.ts`

5. **Restart the dev server**:
```bash
npm run dev
```

## Building for Production 🏗️

```bash
npm run build
npm start
```

## Deploying to Vercel 🚀

The easiest way to deploy is with Vercel (free tier available):

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/jobtracker
git push -u origin main
```

2. **Deploy on Vercel**:
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables if using OpenAI:
     - `OPENAI_API_KEY=your_key`
   - Click "Deploy"

Your app will be live at: `https://jobtracker-xxx.vercel.app`

## File Structure 📁

```
jobtracker/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Main job tracker page
│   │   ├── insights/
│   │   │   └── page.tsx       # AI insights and coach
│   │   ├── api/
│   │   │   ├── insights/
│   │   │   │   └── route.ts   # AI insights API
│   │   │   └── coach/
│   │   │       └── route.ts   # Interview coach API
│   │   └── layout.tsx         # App layout
│   └── ...
├── package.json
├── .env.example              # Environment variables template
└── README.md                 # This file
```

## Future Enhancements 🎯

- [ ] User authentication with Supabase
- [ ] Cloud database (Supabase/Firebase)
- [ ] Export job tracking data
- [ ] Email reminders for follow-ups
- [ ] Resume analysis
- [ ] Calendar integration
- [ ] Network with other job seekers
- [ ] Salary negotiation coach

## Troubleshooting 🔧

**"npm command not found"**
- Restart PowerShell after installing Node.js
- Or use the Windows Command Prompt instead of PowerShell

**Local storage not persisting**
- Clear browser cache and reload
- Check if you're in an incognito window (they don't persist storage)

**Build errors**
- Delete `node_modules` and `.next` folders
- Run `npm install` again

## Contributing 💡

Feel free to fork this project and add your own features!

## License 📄

MIT - Feel free to use this project for personal or commercial use.

---

**Built with ❤️ to help you land your dream job!**

For questions or feedback, feel free to open an issue on GitHub.
