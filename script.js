/**
 * Timer Application - Modern Pomodoro Timer
 * Features: Countdown timer, work/break sessions, visual progress, notifications
 */

class TimerApp {
    constructor() {
        this.isRunning = false;
        this.isPaused = false;
        this.currentTime = 0;
        this.totalTime = 0;
        this.timerInterval = null;
        this.isWorkSession = true;
        this.sessionCount = 0;
        
        // DOM elements
        this.display = document.getElementById('display');
        this.startPauseBtn = document.getElementById('start-pause-btn');
        this.startPauseText = document.getElementById('start-pause-text');
        this.resetBtn = document.getElementById('reset-btn');
        this.workTimeInput = document.getElementById('work-time');
        this.breakTimeInput = document.getElementById('break-time');
        this.sessionCountDisplay = document.getElementById('session-count');
        this.timerLabel = document.getElementById('timer-label');
        this.progressRing = document.querySelector('.progress-ring-circle');
        this.notification = document.getElementById('notification');
        this.notificationText = document.getElementById('notification-text');
        
        // Progress ring setup
        this.progressRingRadius = 120;
        this.progressRingCircumference = 2 * Math.PI * this.progressRingRadius;
        this.progressRing.style.strokeDasharray = this.progressRingCircumference;
        this.progressRing.style.strokeDashoffset = this.progressRingCircumference;
        
        this.initializeEventListeners();
        this.loadSettings();
        this.resetTimer();
    }

    initializeEventListeners() {
        this.startPauseBtn.addEventListener('click', () => this.toggleTimer());
        this.resetBtn.addEventListener('click', () => this.resetTimer());
        this.workTimeInput.addEventListener('change', () => this.saveSettings());
        this.breakTimeInput.addEventListener('change', () => this.saveSettings());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.toggleTimer();
            } else if (e.code === 'Escape') {
                this.resetTimer();
            }
        });

        // Page visibility API for background behavior
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.isRunning) {
                this.handlePageHidden();
            } else if (!document.hidden && this.isRunning) {
                this.handlePageVisible();
            }
        });
    }

    toggleTimer() {
        if (this.isRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        if (!this.isPaused && this.currentTime === 0) {
            // Starting fresh timer
            this.currentTime = this.getCurrentSessionTime() * 60;
            this.totalTime = this.currentTime;
        }

        this.isRunning = true;
        this.isPaused = false;
        this.updateButtonState();
        this.progressRing.classList.add('active');
        
        this.timerInterval = setInterval(() => {
            this.currentTime--;
            this.updateDisplay();
            this.updateProgress();
            
            if (this.currentTime <= 0) {
                this.completeSession();
            }
        }, 1000);

        this.showNotification(`${this.isWorkSession ? '作業' : '休憩'}を開始しました！`, 'success');
    }

    pauseTimer() {
        this.isRunning = false;
        this.isPaused = true;
        this.updateButtonState();
        clearInterval(this.timerInterval);
        this.showNotification('タイマーを一時停止しました', 'info');
    }

    resetTimer() {
        this.isRunning = false;
        this.isPaused = false;
        clearInterval(this.timerInterval);
        
        this.currentTime = this.getCurrentSessionTime() * 60;
        this.totalTime = this.currentTime;
        
        this.updateDisplay();
        this.updateProgress();
        this.updateButtonState();
        this.progressRing.classList.remove('active');
        
        this.showNotification('タイマーをリセットしました', 'info');
    }

    completeSession() {
        this.isRunning = false;
        clearInterval(this.timerInterval);
        
        if (this.isWorkSession) {
            this.sessionCount++;
            this.sessionCountDisplay.textContent = this.sessionCount;
            this.showNotification('お疲れ様でした！休憩時間です。', 'success');
            this.playNotificationSound();
            this.addPulseAnimation();
        } else {
            this.showNotification('休憩終了！作業を再開しましょう。', 'success');
            this.playNotificationSound();
        }
        
        // Switch session type
        this.isWorkSession = !this.isWorkSession;
        this.updateSessionLabel();
        
        // Auto-start next session after 3 seconds
        setTimeout(() => {
            this.resetTimer();
            // Optionally auto-start the next session
            // this.startTimer();
        }, 3000);
        
        this.saveSessionCount();
    }

    getCurrentSessionTime() {
        return this.isWorkSession ? 
            parseInt(this.workTimeInput.value) : 
            parseInt(this.breakTimeInput.value);
    }

    updateDisplay() {
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = this.currentTime % 60;
        this.display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update document title
        document.title = `${this.display.textContent} - Timer App`;
    }

    updateProgress() {
        const progress = (this.totalTime - this.currentTime) / this.totalTime;
        const offset = this.progressRingCircumference - (progress * this.progressRingCircumference);
        this.progressRing.style.strokeDashoffset = offset;
    }

    updateButtonState() {
        if (this.isRunning) {
            this.startPauseText.textContent = '一時停止';
            this.startPauseBtn.classList.add('pause');
        } else {
            this.startPauseText.textContent = this.isPaused ? '再開' : '開始';
            this.startPauseBtn.classList.remove('pause');
        }
    }

    updateSessionLabel() {
        this.timerLabel.textContent = this.isWorkSession ? '作業時間' : '休憩時間';
    }

    showNotification(message, type = 'success') {
        this.notificationText.textContent = message;
        this.notification.className = `notification show ${type}`;
        
        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 3000);
    }

    playNotificationSound() {
        // Create audio context for notification sound
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('Audio notification not supported');
        }
    }

    addPulseAnimation() {
        this.display.classList.add('pulse');
        setTimeout(() => {
            this.display.classList.remove('pulse');
        }, 2000);
    }

    saveSettings() {
        const settings = {
            workTime: this.workTimeInput.value,
            breakTime: this.breakTimeInput.value
        };
        localStorage.setItem('timerSettings', JSON.stringify(settings));
        
        // Update current timer if not running
        if (!this.isRunning) {
            this.resetTimer();
        }
    }

    loadSettings() {
        const savedSettings = localStorage.getItem('timerSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            this.workTimeInput.value = settings.workTime || 25;
            this.breakTimeInput.value = settings.breakTime || 5;
        }
        
        // Load session count
        const savedSessionCount = localStorage.getItem('sessionCount');
        if (savedSessionCount) {
            this.sessionCount = parseInt(savedSessionCount);
            this.sessionCountDisplay.textContent = this.sessionCount;
        }
    }

    saveSessionCount() {
        localStorage.setItem('sessionCount', this.sessionCount.toString());
    }

    handlePageHidden() {
        // Store the time when page becomes hidden
        localStorage.setItem('timerHiddenTime', Date.now().toString());
    }

    handlePageVisible() {
        // Calculate elapsed time while page was hidden
        const hiddenTime = localStorage.getItem('timerHiddenTime');
        if (hiddenTime && this.isRunning) {
            const elapsedSeconds = Math.floor((Date.now() - parseInt(hiddenTime)) / 1000);
            this.currentTime = Math.max(0, this.currentTime - elapsedSeconds);
            
            if (this.currentTime <= 0) {
                this.completeSession();
            } else {
                this.updateDisplay();
                this.updateProgress();
            }
        }
        localStorage.removeItem('timerHiddenTime');
    }
}

// Utility functions for testing
const TimerUtils = {
    formatTime: (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },
    
    validateTimeInput: (value) => {
        const num = parseInt(value);
        return !isNaN(num) && num > 0 && num <= 60;
    },
    
    calculateProgress: (current, total) => {
        return total > 0 ? (total - current) / total : 0;
    }
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new TimerApp();
    
    // Make app instance available globally for testing
    window.timerApp = app;
    window.TimerUtils = TimerUtils;
    
    console.log('Timer App initialized successfully!');
});

// Service Worker registration for PWA features (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
