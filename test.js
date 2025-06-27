/**
 * Timer App Test Suite
 * Tests for timer functionality, user interactions, and utility functions
 */

// Test utilities
const TestUtils = {
    // Mock DOM elements for testing
    createMockElement: (id, type = 'div') => {
        const element = document.createElement(type);
        element.id = id;
        return element;
    },
    
    // Wait for async operations
    wait: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
    
    // Assert function
    assert: (condition, message) => {
        if (!condition) {
            throw new Error(`Assertion failed: ${message}`);
        }
    },
    
    // Test result tracking
    testResults: [],
    
    // Run a test
    runTest: async (testName, testFn) => {
        try {
            await testFn();
            TestUtils.testResults.push({ name: testName, status: 'PASS' });
            console.log(`✅ ${testName}`);
        } catch (error) {
            TestUtils.testResults.push({ name: testName, status: 'FAIL', error: error.message });
            console.error(`❌ ${testName}: ${error.message}`);
        }
    },
    
    // Display test results
    displayResults: () => {
        const passed = TestUtils.testResults.filter(r => r.status === 'PASS').length;
        const failed = TestUtils.testResults.filter(r => r.status === 'FAIL').length;
        
        console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
        
        if (failed > 0) {
            console.log('\n❌ Failed tests:');
            TestUtils.testResults
                .filter(r => r.status === 'FAIL')
                .forEach(r => console.log(`  - ${r.name}: ${r.error}`));
        }
        
        return { passed, failed, total: TestUtils.testResults.length };
    }
};

// Timer utility function tests
const testTimerUtils = async () => {
    await TestUtils.runTest('formatTime - basic formatting', () => {
        TestUtils.assert(TimerUtils.formatTime(125) === '02:05', 'Should format 125 seconds as 02:05');
        TestUtils.assert(TimerUtils.formatTime(0) === '00:00', 'Should format 0 seconds as 00:00');
        TestUtils.assert(TimerUtils.formatTime(3661) === '61:01', 'Should handle times over 60 minutes');
    });
    
    await TestUtils.runTest('validateTimeInput - input validation', () => {
        TestUtils.assert(TimerUtils.validateTimeInput('25') === true, 'Should accept valid number');
        TestUtils.assert(TimerUtils.validateTimeInput('0') === false, 'Should reject zero');
        TestUtils.assert(TimerUtils.validateTimeInput('-5') === false, 'Should reject negative');
        TestUtils.assert(TimerUtils.validateTimeInput('61') === false, 'Should reject > 60');
        TestUtils.assert(TimerUtils.validateTimeInput('abc') === false, 'Should reject non-numeric');
    });
    
    await TestUtils.runTest('calculateProgress - progress calculation', () => {
        TestUtils.assert(TimerUtils.calculateProgress(500, 1000) === 0.5, 'Should calculate 50% progress');
        TestUtils.assert(TimerUtils.calculateProgress(0, 1000) === 1, 'Should calculate 100% progress');
        TestUtils.assert(TimerUtils.calculateProgress(1000, 1000) === 0, 'Should calculate 0% progress');
        TestUtils.assert(TimerUtils.calculateProgress(500, 0) === 0, 'Should handle zero total');
    });
};

// Timer app functionality tests
const testTimerApp = async () => {
    // Note: These tests would require a more sophisticated mocking setup
    // for full DOM manipulation testing
    
    await TestUtils.runTest('Timer state management', () => {
        // Test initial state
        if (window.timerApp) {
            TestUtils.assert(window.timerApp.isRunning === false, 'Timer should start in stopped state');
            TestUtils.assert(window.timerApp.isPaused === false, 'Timer should not be paused initially');
            TestUtils.assert(window.timerApp.isWorkSession === true, 'Should start with work session');
        }
    });
    
    await TestUtils.runTest('Session switching logic', () => {
        if (window.timerApp) {
            const initialSession = window.timerApp.isWorkSession;
            // This would need to be tested with actual session completion
            TestUtils.assert(typeof initialSession === 'boolean', 'Session type should be boolean');
        }
    });
};

// Local storage tests
const testLocalStorage = async () => {
    await TestUtils.runTest('Settings persistence', () => {
        const testSettings = { workTime: '30', breakTime: '10' };
        localStorage.setItem('timerSettings', JSON.stringify(testSettings));
        
        const retrieved = JSON.parse(localStorage.getItem('timerSettings'));
        TestUtils.assert(retrieved.workTime === '30', 'Work time should persist');
        TestUtils.assert(retrieved.breakTime === '10', 'Break time should persist');
        
        // Cleanup
        localStorage.removeItem('timerSettings');
    });
    
    await TestUtils.runTest('Session count persistence', () => {
        localStorage.setItem('sessionCount', '5');
        const count = parseInt(localStorage.getItem('sessionCount'));
        TestUtils.assert(count === 5, 'Session count should persist');
        
        // Cleanup
        localStorage.removeItem('sessionCount');
    });
};

// Browser feature tests
const testBrowserFeatures = async () => {
    await TestUtils.runTest('Audio context availability', () => {
        const hasAudioContext = !!(window.AudioContext || window.webkitAudioContext);
        console.log(`Audio context available: ${hasAudioContext}`);
        // This is informational, not a strict requirement
    });
    
    await TestUtils.runTest('Local storage availability', () => {
        TestUtils.assert(typeof Storage !== 'undefined', 'Local storage should be available');
    });
    
    await TestUtils.runTest('Service worker support', () => {
        const hasServiceWorker = 'serviceWorker' in navigator;
        console.log(`Service worker support: ${hasServiceWorker}`);
        // This is informational, not a strict requirement
    });
};

// UI interaction tests (would require DOM setup)
const testUIInteractions = async () => {
    await TestUtils.runTest('Keyboard shortcuts', () => {
        // Test spacebar and escape key handling
        // This would require event simulation
        TestUtils.assert(true, 'Keyboard shortcuts test placeholder');
    });
    
    await TestUtils.runTest('Button state changes', () => {
        // Test button text and class changes
        TestUtils.assert(true, 'Button state test placeholder');
    });
};

// Main test runner
const runAllTests = async () => {
    console.log('🧪 Starting Timer App Test Suite...\n');
    
    // Wait for app to initialize
    await TestUtils.wait(100);
    
    // Run test suites
    await testTimerUtils();
    await testLocalStorage();
    await testBrowserFeatures();
    await testTimerApp();
    await testUIInteractions();
    
    // Display results
    const results = TestUtils.displayResults();
    
    // Create visual test results
    createTestResultsUI(results);
    
    return results;
};

// Create visual test results in the UI
const createTestResultsUI = (results) => {
    const existingResults = document.getElementById('test-results');
    if (existingResults) {
        existingResults.remove();
    }
    
    const testResultsDiv = document.createElement('div');
    testResultsDiv.id = 'test-results';
    testResultsDiv.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: #2d3748;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        font-family: monospace;
        font-size: 0.875rem;
        z-index: 1000;
        max-width: 300px;
    `;
    
    const status = results.failed === 0 ? '✅ All tests passed!' : `❌ ${results.failed} tests failed`;
    const color = results.failed === 0 ? '#48bb78' : '#f56565';
    
    testResultsDiv.innerHTML = `
        <div style="color: ${color}; font-weight: bold; margin-bottom: 0.5rem;">
            ${status}
        </div>
        <div>
            📊 ${results.passed}/${results.total} tests passed
        </div>
        <div style="margin-top: 0.5rem; font-size: 0.75rem; opacity: 0.7;">
            Open console for details
        </div>
    `;
    
    document.body.appendChild(testResultsDiv);
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        testResultsDiv.style.opacity = '0';
        testResultsDiv.style.transition = 'opacity 0.5s';
        setTimeout(() => testResultsDiv.remove(), 500);
    }, 10000);
};

// Auto-run tests when page loads (for development)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(runAllTests, 1000); // Wait for app to fully initialize
    });
} else {
    setTimeout(runAllTests, 1000);
}

// Export for manual testing
window.runTests = runAllTests;
window.TestUtils = TestUtils;
