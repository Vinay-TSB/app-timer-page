# App Timer Redirect Page

A mobile-optimized web page that displays a 10-second countdown timer and automatically redirects to your Android app using a universal link.

## 🚀 Features

- **10-Second Countdown Timer** with visual progress indicator
- **Automatic Redirect** to Android app after countdown
- **Mobile-Responsive Design** optimized for mobile devices
- **Fallback Manual Button** if automatic redirect fails
- **Easy Configuration** - just update one file with your app link
- **Multiple Redirect Methods** for better compatibility

## 📱 How It Works

1. User opens the web page
2. Timer counts down from 10 seconds
3. After countdown, page automatically redirects to your Android app
4. If app doesn't open, a manual button appears

## ⚙️ Configuration

### Update Your Universal Link

Edit the `config.js` file and replace the placeholder with your actual universal link:

```javascript
const CONFIG = {
    // Replace with your actual universal link
    UNIVERSAL_LINK: "myapp://open",  // <-- CHANGE THIS
    
    // Other settings (optional)
    TIMER_DURATION: 10,
    FALLBACK_URL: null,
    SHOW_MANUAL_BUTTON: true,
    MANUAL_BUTTON_DELAY: 2000
};
```

### Universal Link Examples

**Custom Scheme:**
```javascript
UNIVERSAL_LINK: "myapp://open"
```

**HTTPS Universal Link:**
```javascript
UNIVERSAL_LINK: "https://yourdomain.com/app"
```

**Android Intent URL:**
```javascript
UNIVERSAL_LINK: "intent://example.com#Intent;scheme=https;package=com.example.app;end"
```

**With Parameters:**
```javascript
UNIVERSAL_LINK: "myapp://open?screen=home&user=123"
```

### Optional Settings

- **TIMER_DURATION**: Change countdown duration (in seconds)
- **FALLBACK_URL**: Redirect to Play Store if app isn't installed
- **SHOW_MANUAL_BUTTON**: Show/hide manual button after redirect
- **MANUAL_BUTTON_DELAY**: Delay before showing manual button (milliseconds)

## 🧪 Testing Locally

1. Open `index.html` in a web browser
2. The timer should start automatically
3. After 10 seconds, it will attempt to open the configured link

**Note:** Testing deep links locally may not work perfectly. Deploy to test on actual mobile devices.

## 🌐 Deployment (GitHub Pages)

### Prerequisites
- Git installed on your computer
- GitHub account

### Deployment Steps

1. **Initialize Git Repository**
   ```bash
   cd app-timer-page
   git init
   git add .
   git commit -m "Initial commit: App timer redirect page"
   ```

2. **Create GitHub Repository**
   - Go to https://github.com/new
   - Create a new repository (e.g., "app-timer-page")
   - Don't initialize with README (we already have files)

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/app-timer-page.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Source", select "main" branch
   - Click "Save"
   - Your page will be live at: `https://YOUR_USERNAME.github.io/app-timer-page/`

### Quick Deploy Script

Run this after updating YOUR_USERNAME:

```bash
cd app-timer-page
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/app-timer-page.git
git branch -M main
git push -u origin main
```

## 📲 Testing on Mobile

1. **Get Your Deployment URL**
   - After deploying, your page will be at: `https://YOUR_USERNAME.github.io/app-timer-page/`

2. **Test on Android Device**
   - Open the URL in Chrome or any mobile browser
   - Timer should start automatically
   - After 10 seconds, your app should open
   - If app doesn't open, check your universal link configuration

3. **Debugging Tips**
   - Open browser console (Chrome DevTools) to see logs
   - Verify your app is installed on the device
   - Check that your app's manifest handles the universal link
   - Try the manual button if automatic redirect fails

## 🔄 Updating the Universal Link

After deployment, to update your universal link:

1. Edit `config.js` with your actual link
2. Commit and push changes:
   ```bash
   git add config.js
   git commit -m "Update universal link"
   git push
   ```
3. Changes will be live in a few minutes

## 📁 File Structure

```
app-timer-page/
├── index.html      # Main HTML page with timer UI
├── config.js       # Configuration file (UPDATE THIS)
├── timer.js        # Timer and redirect logic
└── README.md       # This file
```

## 🛠️ Customization

### Change Timer Duration

In `config.js`:
```javascript
TIMER_DURATION: 5,  // Change to 5 seconds
```

### Add Play Store Fallback

In `config.js`:
```javascript
FALLBACK_URL: "https://play.google.com/store/apps/details?id=com.your.app",
```

### Customize Colors

Edit the CSS in `index.html` to change colors:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## 🐛 Troubleshooting

**Timer doesn't start:**
- Check browser console for JavaScript errors
- Ensure all three files are in the same directory

**App doesn't open:**
- Verify universal link is correct in `config.js`
- Ensure app is installed on device
- Check app's AndroidManifest.xml for intent filters
- Try the manual button

**Page not loading after deployment:**
- Wait a few minutes for GitHub Pages to build
- Check repository settings → Pages for deployment status
- Verify repository is public

## 📝 License

Free to use and modify for your projects.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review your universal link configuration
3. Test with browser console open to see error messages

---

**Made with ❤️ for easy app testing**