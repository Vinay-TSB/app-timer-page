# 🚀 Deployment Guide - GitHub Pages

This guide will help you deploy your app timer page to GitHub Pages for free hosting.

## Prerequisites

- Git installed on your computer ✅ (Already initialized)
- GitHub account (create one at https://github.com/signup if you don't have one)

## Step-by-Step Deployment

### Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Fill in the repository details:
   - **Repository name**: `app-timer-page` (or any name you prefer)
   - **Description**: "Mobile app redirect timer page"
   - **Visibility**: Public (required for free GitHub Pages)
   - **DO NOT** check "Initialize this repository with a README" (we already have files)
3. Click "Create repository"

### Step 2: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

```bash
# Navigate to your project directory
cd /Users/vinay/Desktop/app-timer-page

# Add your GitHub repository as remote (REPLACE YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/app-timer-page.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

**Important:** Replace `YOUR_USERNAME` with your actual GitHub username!

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/app-timer-page`
2. Click on **"Settings"** tab (top right)
3. Scroll down and click **"Pages"** in the left sidebar
4. Under **"Source"**:
   - Select branch: **main**
   - Select folder: **/ (root)**
5. Click **"Save"**
6. Wait 1-2 minutes for deployment

### Step 4: Get Your Live URL

After deployment completes, you'll see a message:
```
Your site is live at https://YOUR_USERNAME.github.io/app-timer-page/
```

This is your public URL! 🎉

## Quick Copy-Paste Commands

Replace `YOUR_USERNAME` with your GitHub username and run these commands:

```bash
cd /Users/vinay/Desktop/app-timer-page
git remote add origin https://github.com/YOUR_USERNAME/app-timer-page.git
git branch -M main
git push -u origin main
```

## After Deployment

### Update Your Universal Link

1. Edit `config.js` and replace the placeholder with your actual app link:
   ```javascript
   UNIVERSAL_LINK: "your-actual-app-link-here"
   ```

2. Commit and push the changes:
   ```bash
   cd /Users/vinay/Desktop/app-timer-page
   git add config.js
   git commit -m "Update universal link"
   git push
   ```

3. Changes will be live in 1-2 minutes

### Test on Mobile

1. Open your deployment URL on your Android device:
   ```
   https://YOUR_USERNAME.github.io/app-timer-page/
   ```

2. The timer should start automatically
3. After 10 seconds, your app should open
4. If it doesn't open, use the manual button

## Troubleshooting

### "Permission denied" when pushing
- You may need to authenticate with GitHub
- Use a Personal Access Token instead of password
- Generate token at: https://github.com/settings/tokens

### Page shows 404
- Wait a few minutes for GitHub Pages to build
- Check Settings → Pages to see deployment status
- Ensure repository is public

### Timer works but app doesn't open
- Verify your universal link in `config.js`
- Ensure your app is installed on the test device
- Check your app's AndroidManifest.xml for proper intent filters

## Alternative: Deploy with GitHub CLI

If you have GitHub CLI installed:

```bash
cd /Users/vinay/Desktop/app-timer-page
gh repo create app-timer-page --public --source=. --push
gh browse
```

Then enable Pages in Settings → Pages.

## Need Help?

1. Check if Git is configured:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

2. Verify remote is set:
   ```bash
   git remote -v
   ```

3. Check deployment status:
   - Go to your repository → Actions tab
   - Look for "pages build and deployment" workflow

---

**Ready to deploy?** Follow the steps above and you'll have your page live in minutes! 🚀