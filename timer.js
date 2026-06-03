// Timer and redirect logic
(function() {
    'use strict';

    // Get configuration
    const config = typeof CONFIG !== 'undefined' ? CONFIG : {
        UNIVERSAL_LINK: "myapp://open",
        TIMER_DURATION: 10,
        FALLBACK_URL: null,
        SHOW_MANUAL_BUTTON: true,
        MANUAL_BUTTON_DELAY: 2000
    };

    // DOM elements
    const countdownElement = document.getElementById('countdown');
    const statusTextElement = document.getElementById('statusText');
    const statusSecondsElement = document.getElementById('statusSeconds');
    const manualButtonElement = document.getElementById('manualButton');
    const progressCircle = document.getElementById('progressCircle');

    // Timer variables
    let timeRemaining = config.TIMER_DURATION;
    let timerInterval = null;

    // Calculate circle properties for progress animation
    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = 0;

    /**
     * Update the progress circle
     */
    function updateProgressCircle(percentage) {
        const offset = circumference - (percentage / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
    }

    /**
     * Update the countdown display
     */
    function updateDisplay() {
        countdownElement.textContent = timeRemaining;
        statusSecondsElement.textContent = timeRemaining;
        
        // Update progress circle
        const percentage = (timeRemaining / config.TIMER_DURATION) * 100;
        updateProgressCircle(percentage);
    }

    /**
     * Open the app using the universal link
     */
    function openApp() {
        console.log('Attempting to open app with link:', config.UNIVERSAL_LINK);
        
        // Update status
        statusTextElement.textContent = 'Opening app...';
        
        // Try to open the app
        try {
            // For Android, we can use different methods
            if (isAndroid()) {
                // Method 1: Direct window.location
                window.location.href = config.UNIVERSAL_LINK;
                
                // Method 2: Create invisible iframe (fallback)
                setTimeout(() => {
                    const iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    iframe.src = config.UNIVERSAL_LINK;
                    document.body.appendChild(iframe);
                    
                    // Remove iframe after a short delay
                    setTimeout(() => {
                        document.body.removeChild(iframe);
                    }, 1000);
                }, 100);
            } else {
                // For other platforms, use direct navigation
                window.location.href = config.UNIVERSAL_LINK;
            }
            
            // Show manual button after delay if configured
            if (config.SHOW_MANUAL_BUTTON) {
                setTimeout(() => {
                    manualButtonElement.style.display = 'block';
                    statusTextElement.textContent = 'App didn\'t open? Try the button below.';
                }, config.MANUAL_BUTTON_DELAY);
            }
            
            // If fallback URL is provided and app doesn't open, redirect there
            if (config.FALLBACK_URL) {
                setTimeout(() => {
                    if (document.visibilityState === 'visible') {
                        window.location.href = config.FALLBACK_URL;
                    }
                }, 3000);
            }
        } catch (error) {
            console.error('Error opening app:', error);
            statusTextElement.textContent = 'Error opening app. Please try manually.';
            manualButtonElement.style.display = 'block';
        }
    }

    /**
     * Check if the device is Android
     */
    function isAndroid() {
        return /Android/i.test(navigator.userAgent);
    }

    /**
     * Check if the device is iOS
     */
    function isIOS() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    /**
     * Start the countdown timer
     */
    function startTimer() {
        // Initial display
        updateDisplay();
        
        // Start countdown
        timerInterval = setInterval(() => {
            timeRemaining--;
            
            if (timeRemaining > 0) {
                updateDisplay();
            } else {
                // Timer finished
                clearInterval(timerInterval);
                countdownElement.textContent = '0';
                updateProgressCircle(0);
                
                // Trigger redirect
                openApp();
            }
        }, 1000);
    }

    /**
     * Initialize the page
     */
    function init() {
        console.log('Timer page initialized');
        console.log('Device:', isAndroid() ? 'Android' : isIOS() ? 'iOS' : 'Other');
        console.log('Universal Link:', config.UNIVERSAL_LINK);
        
        // Add click handler to manual button
        manualButtonElement.addEventListener('click', openApp);
        
        // Start the timer
        startTimer();
        
        // Log page visibility changes (useful for debugging)
        document.addEventListener('visibilitychange', () => {
            console.log('Page visibility:', document.visibilityState);
        });
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Make openApp available globally for the manual button
    window.openApp = openApp;
})();

// Made with Bob
