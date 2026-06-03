// Configuration file for the app redirect timer
// Update the UNIVERSAL_LINK constant with your actual Android app deep link

const CONFIG = {
    // Replace this with your actual universal link
    // Examples:
    // - Custom scheme: "myapp://open"
    // - HTTPS universal link: "https://yourdomain.com/app"
    // - Android intent: "intent://example.com#Intent;scheme=https;package=com.example.app;end"
    UNIVERSAL_LINK: "myapp://open",
    
    // Timer duration in seconds
    TIMER_DURATION: 10,
    
    // Fallback URL if the app doesn't open (optional)
    FALLBACK_URL: null, // Set to a URL like "https://play.google.com/store/apps/details?id=your.app.id"
    
    // Show manual button after redirect attempt
    SHOW_MANUAL_BUTTON: true,
    
    // Delay before showing manual button (milliseconds)
    MANUAL_BUTTON_DELAY: 2000
};

// Export for use in timer.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

// Made with Bob
