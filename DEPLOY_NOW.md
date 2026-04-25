# DEPLOYMENT CHECKLIST - DEPLOY TO VERCEL NOW

Follow these exact steps to deploy your Job Application Tracker to Vercel (takes 10-15 minutes).

## STEP 1: Verify Your Code is Ready ✓
Your app is at: `C:\Users\User\jobtracker`

Check that dev server runs:
```bash
cd C:\Users\User\jobtracker
npm run dev
```
Should show: "✓ Ready in 664ms" at http://localhost:3000

## STEP 2: Initialize Git Repository

Open PowerShell in your jobtracker folder and run:

```powershell
cd C:\Users\User\jobtracker
git init
git add .
git commit -m "Initial commit: Job Application Tracker with AI"
```

If you get an error about git not being installed, [download Git](https://git-scm.com/download/win) first.

## STEP 3: Create GitHub Account (if you don't have one)

1. Go to [github.com](https://github.com)
2. Click "Sign up"
3. Fill in: username, email, password
4. Verify your email
5. You're done!

## STEP 4: Create GitHub Repository

1. Log in to [github.com](https://github.com)
2. Click the "+" icon (top right) → "New repository"
3. Repository name: `jobtracker`
4. Description: "AI-powered job application tracker with interview coaching"
5. Make it **Public** (so Vercel can access it)
6. Click "Create repository"

You'll see instructions. Copy the repository URL (looks like `https://github.com/YOUR_USERNAME/jobtracker.git`)

## STEP 5: Push Code to GitHub

Run these commands in PowerShell (replace URL with yours):

```powershell
cd C:\Users\User\jobtracker

git remote add origin https://github.com/YOUR_USERNAME/jobtracker.git
git branch -M main
git push -u origin main
```

Wait for it to complete. Your code is now on GitHub!

## STEP 6: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access GitHub
5. Click "Import Project"
6. You should see `jobtracker` in your repos - click it
7. Vercel will auto-detect Next.js settings (click "Deploy")

## STEP 7: Add Environment Variable (CRITICAL!)

Before deploying, you MUST add your OpenAI API key:

1. In Vercel dashboard, go to **Settings** (top navigation)
2. Click **Environment Variables**
3. Add new variable:
   - Name: `OPENAI_API_KEY`
   - Value: Your actual OpenAI key from [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
4. Click "Add"
5. Go back to **Deployments** tab
6. Click "Redeploy" button

## STEP 8: Wait for Deployment ⏳

Watch the **Deployments** tab. You'll see:
- 🟡 Building...
- 🟡 Compiling...
- ✅ Ready

When you see the green checkmark, your app is LIVE!

## STEP 9: Get Your Live URL

In Vercel dashboard, under Deployments, click the top deployment. You'll see a URL like:

```
https://jobtracker-xyz.vercel.app
```

**This is your live app URL!**

## STEP 10: Test Your Live App

1. Visit your Vercel URL
2. Try adding a job application
3. Get AI insights
4. Test the coach feature

Everything should work exactly like localhost, but LIVE on the internet!

## STEP 11: Share With Founders! 🚀

Now you have a live URL to share:

> "I built an AI-powered job application tracker. Check it out: https://jobtracker-xyz.vercel.app"

---

## TROUBLESHOOTING

### "Git not found"
- Install from [git-scm.com](https://git-scm.com/download/win)
- Restart PowerShell after installing

### "Repository already exists on origin"
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/jobtracker.git
```

### "OpenAI API key not configured" error when using app
- Check you added it in Vercel Settings → Environment Variables
- Make sure you clicked "Redeploy" after adding it
- Wait 5 minutes for deployment to complete

### "Build failed" error
- Check build logs in Vercel
- Verify `npm run build` works locally first
- Make sure .env.local is in .gitignore (it is)

### "Preview deployment succeeded, production failed"
- Usually means environment variable wasn't set
- Add OPENAI_API_KEY and redeploy

---

## YOU'RE DONE! 🎉

Your app is now:
- ✅ Built locally
- ✅ Deployed to Vercel
- ✅ Live on the internet
- ✅ Ready to impress founders

**Next: Share the URL with anyone you want to impress!**
