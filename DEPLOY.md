# Deployment Guide - Deploy to Vercel

Vercel is the easiest way to deploy Next.js apps. It's free, takes 5 minutes, and gives you a live URL to share with founders.

## Quick Deploy (5 minutes)

### Option 1: Deploy from GitHub (Recommended)

**Step 1: Push code to GitHub**
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Job Application Tracker"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/jobtracker.git
git branch -M main
git push -u origin main
```

**Step 2: Connect to Vercel**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub account
4. Select the `jobtracker` repository
5. Click "Import"

**Step 3: Add Environment Variable**
1. In Vercel dashboard, go to **Settings → Environment Variables**
2. Add:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** Your OpenAI API key from [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
3. Click "Add" and then "Save"

**Step 4: Deploy**
1. Go to **Deployments** tab
2. Click "Redeploy" on the latest deployment
3. Wait for the green checkmark ✓
4. Your app is now live! You'll see a URL like: `https://jobtracker-xyz.vercel.app`

### Option 2: Direct Deploy (No GitHub)

1. Go to [vercel.com](https://vercel.com)
2. Click "Upload Project"
3. Upload the `jobtracker` folder
4. Vercel will detect it's a Next.js app
5. Add `OPENAI_API_KEY` environment variable (same as above)
6. Click "Deploy"

## What Happens After Deploy

✅ Your app is live on the internet
✅ Every time you push to GitHub, Vercel auto-deploys
✅ Get a custom domain (e.g., `jobtracker.vercel.app`)
✅ SSL certificate included
✅ Free hosting forever

## Share Your App

Once deployed, share the URL with founders:
```
https://jobtracker-xyz.vercel.app
```

Or add a custom domain:
1. In Vercel: Settings → Domains
2. Add your domain
3. Update DNS settings with your registrar

## Monitor Your Deployment

In Vercel dashboard:
- **Deployments:** See all versions
- **Logs:** Debug issues
- **Analytics:** Track usage
- **Settings:** Update environment variables

## Troubleshooting Deployment

### "OpenAI API key not found"
- Check Settings → Environment Variables
- Make sure `OPENAI_API_KEY` is added
- Redeploy after adding it

### "Build failed"
- Check Build Logs in Vercel
- Make sure `npm run build` works locally first
- Verify all dependencies in `package.json`

### "App works locally but not on Vercel"
- Check environment variables
- Check Vercel logs for errors
- Verify Next.js version is 14+

## Next Steps After Deployment

1. ✅ Test all features on live URL
2. ✅ Share with friends/founders
3. ✅ Collect feedback
4. 🔜 Add authentication with Auth0 or Supabase
5. 🔜 Switch to real database (PostgreSQL/Supabase)
6. 🔜 Add job recommendations
7. 🔜 Add user profiles

## Custom Domain (Optional)

To use your own domain (e.g., jobtracker.com):

1. Buy a domain from [Namecheap](https://namecheap.com) or [GoDaddy](https://godaddy.com)
2. In Vercel: Settings → Domains → Add Domain
3. Enter your domain name
4. Follow Vercel's DNS setup instructions
5. Wait 10-30 minutes for DNS to propagate

## Support

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment:** [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment/vercel)
- **Need help?** Email support@vercel.com

---

**Your job tracker will be live in minutes! 🚀**
