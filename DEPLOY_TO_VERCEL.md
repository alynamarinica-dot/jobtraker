# Deploy to Vercel in 5 Minutes 🚀

## Step 1: Initialize Git (2 minutes)

Open PowerShell in your `jobtracker` folder:

```powershell
cd C:\Users\User\jobtracker
git init
git add .
git commit -m "Initial commit: Job Application Tracker with AI coaching"
```

## Step 2: Create GitHub Repository (1 minute)

1. Go to https://github.com/new
2. Sign in or create account
3. Create new repo called: `jobtracker`
4. **Do NOT** initialize with README (we already have one)
5. Click "Create repository"
6. Copy the commands shown on the page

## Step 3: Push to GitHub (1 minute)

In PowerShell, paste and run the commands from GitHub:

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jobtracker.git
git push -u origin main
```

(Replace `YOUR_USERNAME` with your actual GitHub username)

## Step 4: Deploy to Vercel (1 minute)

1. Go to https://vercel.com
2. Click "Sign Up" (use GitHub account)
3. Click "New Project"
4. Click "Import Git Repository"
5. Find `jobtracker` in the list
6. Click "Import"
7. Keep default settings
8. Click "Deploy"

**Wait 1-2 minutes...**

✅ **Done!** You'll get a URL like: `https://jobtracker-xxx.vercel.app`

## Verify It Works

- Visit your Vercel URL
- Add a test job application
- Verify everything works on the live site

## Share It

Now you can share:
- **Live URL**: https://jobtracker-xxx.vercel.app
- **GitHub Repo**: https://github.com/YOUR_USERNAME/jobtracker
- In job applications, portfolios, interviews, etc.

## Next: Optional - Add AI Features

To make "Get AI Insights" actually work with ChatGPT:

1. Get OpenAI API key: https://platform.openai.com/api-keys
2. In Vercel dashboard → Settings → Environment Variables
3. Add: `OPENAI_API_KEY=sk-xxx...`
4. Redeploy
5. The app will now use real AI!

---

**That's it! Your app is now live on the internet.** 🎉
