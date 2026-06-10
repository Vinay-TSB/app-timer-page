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
    const autoRedirectLink = document.getElementById('autoRedirectLink');

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
                
                // Update status and button text
                statusTextElement.textContent = 'Opening app...';
                manualButtonElement.textContent = 'Opening...';
                
                // Simulate complete touch gesture sequence for Android
                setTimeout(() => {
                    // Get button position for realistic touch coordinates
                    const rect = manualButtonElement.getBoundingClientRect();
                    const x = rect.left + rect.width / 2;
                    const y = rect.top + rect.height / 2;
                    
                    // Create touch event properties
                    const touchObj = new Touch({
                        identifier: Date.now(),
                        target: manualButtonElement,
                        clientX: x,
                        clientY: y,
                        radiusX: 2.5,
                        radiusY: 2.5,
                        rotationAngle: 0,
                        force: 1
                    });
                    
                    // Simulate touchstart
                    const touchStartEvent = new TouchEvent('touchstart', {
                        bubbles: true,
                        cancelable: true,
                        view: window,
                        touches: [touchObj],
                        targetTouches: [touchObj],
                        changedTouches: [touchObj]
                    });
                    manualButtonElement.dispatchEvent(touchStartEvent);
                    
                    // Simulate touchend after a brief moment
                    setTimeout(() => {
                        const touchEndEvent = new TouchEvent('touchend', {
                            bubbles: true,
                            cancelable: true,
                            view: window,
                            touches: [],
                            targetTouches: [],
                            changedTouches: [touchObj]
                        });
                        manualButtonElement.dispatchEvent(touchEndEvent);
                        
                        // Follow with click event
                        const clickEvent = new MouseEvent('click', {
                            view: window,
                            bubbles: true,
                            cancelable: true,
                            clientX: x,
                            clientY: y
                        });
                        manualButtonElement.dispatchEvent(clickEvent);
                    }, 50);
                }, 100);
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
