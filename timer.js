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
        
        // Try to open the app with user interaction
        try {
            // Direct navigation - works best with user interaction
            window.location.href = config.UNIVERSAL_LINK;
            
            // Update status after attempt
            setTimeout(() => {
                statusTextElement.textContent = 'If the app didn\'t open, please try again.';
            }, 2000);
        } catch (error) {
            console.error('Error opening app:', error);
            statusTextElement.textContent = 'Error opening app. Please try again.';
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
                
                // Simulate user click on the button to trigger redirect
                statusTextElement.textContent = 'Opening app...';
                manualButtonElement.click();
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
