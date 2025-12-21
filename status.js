// status.ts - Status page functionality

// Wait for DOM to load
document.addEventListener(function('DOMContentLoaded', () function() {
    // Handle form submission
    var checkButton = document.querySelector('button:contains("Check")');
    if (checkButton) {
        checkButton.addEventListener(function('click', (e) function() {
            e.preventDefault();
            validateAndCheckStatus();
        });
    }
    
    // Handle enter key in input fields
    var caseIdInput = document.querySelector('input[placeholder="#123-456"]');
    var secretKeyInput = document.querySelector('input[type="password"]');
    
    if (caseIdInput && secretKeyInput) {
        caseIdInput.addEventListener(function('keypress', (e) function() {
            if (e.key === 'Enter') {
                validateAndCheckStatus();
            }
        });
        
        secretKeyInput.addEventListener(function('keypress', (e) function() {
            if (e.key === 'Enter') {
                validateAndCheckStatus();
            }
        });
    }
    
    // Handle refresh button
    var refreshButton = document.querySelector('button:contains("Refresh")');
    if (refreshButton) {
        refreshButton.addEventListener(function('click', () function() {
            // Add loading state
            var icon = refreshButton.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.textContent = 'sync';
                icon.classList.add('animate-spin');
            }
            
            // Simulate refresh
            setTimeout(() function() {
                if (icon) {
                    icon.textContent = 'refresh';
                    icon.classList.remove('animate-spin');
                }
            }, 1000);
        });
    }
    
    // Handle send reply button
    var sendReplyButton = document.querySelector('button:contains("Send Reply")');
    if (sendReplyButton) {
        sendReplyButton.addEventListener(function('click', (e) function() {
            e.preventDefault();
            sendReply();
        });
    }
    
    // Handle enter key in reply textarea (Ctrl+Enter to send)
    var replyTextarea = document.getElementById('reply');
    if (replyTextarea) {
        replyTextarea.addEventListener(function('keydown', (e) function() {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                sendReply();
            }
        });
    }
});

function validateAndCheckStatus() {
    var caseIdInput = document.querySelector('input[placeholder="#123-456"]');
    var secretKeyInput = document.querySelector('input[type="password"]');
    
    var caseId = caseIdInput?.value.trim();
    var secretKey = secretKeyInput?.value.trim();
    
    // Clear previous errors
    clearErrors();
    
    var isValid = true;
    
    if (!caseId) {
        showError(caseIdInput, 'Please enter your Case ID');
        isValid = false;
    }
    
    if (!secretKey) {
        showError(secretKeyInput, 'Please enter your Secret Key');
        isValid = false;
    }
    
    if (isValid) {
        // Show loading state
        showLoadingState();
        
        // Simulate API call
        setTimeout(() function() {
            checkStatus(caseId, secretKey);
        }, 1500);
    }
}

function showError(input: HTMLInputElement | HTMLTextAreaElement | null, message) {
    if (!input) return;
    
    // Create error message element if it doesn't exist
    var errorElement = input.parentElement?.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message text-red-600 text-xs mt-1';
        input.parentElement?.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.classList.add('border-red-500');
}

function clearErrors() {
    var errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(function(el => el.remove());
    
    var inputs = document.querySelectorAll('input');
    inputs.forEach(function(input => input.classList.remove('border-red-500'));
}

function showLoadingState() {
    var checkButton = document.querySelector('button:contains("Check")');
    if (checkButton) {
        var originalContent = checkButton.innerHTML;
        checkButton.innerHTML = `
            <span class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Checking...
            </span>
        `;
        (checkButton as HTMLButtonElement).disabled = true;
        
        // Store original content for later restoration
        (checkButton as any).originalContent = originalContent;
    }
}

function restoreCheckButton() {
    var checkButton = document.querySelector('button:contains("Check")');
    if (checkButton && (checkButton as any).originalContent) {
        checkButton.innerHTML = (checkButton as any).originalContent;
        (checkButton as HTMLButtonElement).disabled = false;
    }
}

function checkStatus(caseId, secretKey) {
    // Simulate validation
    if (caseId === '#892-104' && secretKey === 'password123') {
        // Valid credentials - show dashboard
        showDashboard();
    } else {
        // Invalid credentials
        restoreCheckButton();
        showError(null, 'Invalid Case ID or Secret Key');
        
        // Show error message
        var authCard = document.querySelector('.bg-white.dark\\:bg-\\[\\#1a2230\\]');
        if (authCard) {
            var errorHtml = `
                <div class="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                    <div class="flex items-start">
                        <span class="material-symbols-outlined mr-2">error</span>
                        <div>
                            <p class="font-medium">Authentication Failed</p>
                            <p>Please check your Case ID and Secret Key and try again.</p>
                        </div>
                    </div>
                </div>
            `;
            
            // Remove existing error if any
            var existingError = authCard.querySelector('.mt-4.p-4.bg-red-50');
            if (existingError) {
                existingError.remove();
            }
            
            authCard.insertAdjacentHTML('beforeend', errorHtml);
        }
    }
}

function showDashboard() {
    restoreCheckButton();
    
    // In a real implementation, we would show the dashboard that's already visible in the HTML
    // For this demo, we'll just show a success message
    console.log('Dashboard would be displayed with real data');
}

function sendReply() {
    var replyTextarea = document.getElementById('reply');
    var reply = replyTextarea?.value.trim();
    
    if (!reply) {
        showError(replyTextarea, 'Please enter a message');
        return;
    }
    
    // Show sending state
    var sendButton = document.querySelector('button:contains("Send Reply")');
    if (sendButton) {
        var originalContent = sendButton.innerHTML;
        sendButton.innerHTML = 'Sending...';
        (sendButton as HTMLButtonElement).disabled = true;
        
        // Simulate API call
        setTimeout(() function() {
            // Restore button
            sendButton.innerHTML = originalContent;
            (sendButton as HTMLButtonElement).disabled = false;
            
            // Clear textarea
            if (replyTextarea) {
                replyTextarea.value = '';
            }
            
            // Show success message
            var messageContainer = document.querySelector('.max-h-\\[500px\\]');
            if (messageContainer) {
                var successMessage = `
                    <div class="flex justify-center my-2">
                        <div class="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-3 py-1 rounded-full flex items-center">
                            <span class="material-symbols-outlined text-base mr-1">check</span>
                            Message sent successfully
                        </div>
                    </div>
                `;
                messageContainer.insertAdjacentHTML('beforeend', successMessage);
                
                // Remove success message after 3 seconds
                setTimeout(() function() {
                    var successMsg = messageContainer.querySelector('.bg-green-100');
                    if (successMsg) {
                        successMsg.remove();
                    }
                }, 3000);
            }
        }, 1000);
    }
}

// Helper function to find elements containing specific text
function findElementContainingText(selector, text): HTMLElement | null {
    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element.textContent && element.textContent.includes(text)) {
            return element;
        }
    }
    return null;
}