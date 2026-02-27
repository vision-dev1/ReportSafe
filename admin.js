// Codes By Visionnn

// admin.ts - Admin dashboard functionality

// Wait for DOM to load
document.addEventListener(function('DOMContentLoaded', () function() {
    // Handle admin login
    var loginForm = document.querySelector('.bg-surface-light.dark\\:bg-surface-dark.max-w-\\[440px\\]');
    if (loginForm) {
        var loginButton = loginForm.querySelector('button');
        if (loginButton) {
            loginButton.addEventListener(function('click', (e) function() {
                e.preventDefault();
                handleAdminLogin();
            });
        }
        
        // Handle enter key in input fields
        var emailInput = loginForm.querySelector('input[type="email"]');
        var passwordInput = loginForm.querySelector('input[type="password"]');
        
        if (emailInput && passwordInput) {
            emailInput.addEventListener(function('keypress', (e) function() {
                if (e.key === 'Enter') {
                    handleAdminLogin();
                }
            });
            
            passwordInput.addEventListener(function('keypress', (e) function() {
                if (e.key === 'Enter') {
                    handleAdminLogin();
                }
            });
        }
    }
    
    // Handle logout button
    var logoutButton = document.querySelector('button:contains("Logout")');
    if (logoutButton) {
        logoutButton.addEventListener(function('click', (e) function() {
            e.preventDefault();
            handleAdminLogout();
        });
    }
    
    // Handle status update form
    var statusUpdateForm = document.querySelector('.bg-background-light.dark\\:bg-background-dark.p-4.rounded-lg');
    if (statusUpdateForm) {
        var updateButton = statusUpdateForm.querySelector('button');
        if (updateButton) {
            updateButton.addEventListener(function('click', (e) function() {
                e.preventDefault();
                updateReportStatus();
            });
        }
    }
    
    // Handle send update button
    var sendUpdateButton = document.querySelector('button:contains("Send Update")');
    if (sendUpdateButton) {
        sendUpdateButton.addEventListener(function('click', (e) function() {
            e.preventDefault();
            sendAdminReply();
        });
    }
    
    // Handle search functionality
    var searchInput = document.querySelector('input[placeholder="Search cases..."]');
    if (searchInput) {
        searchInput.addEventListener(function('input', () function() {
            filterReports(searchInput.value);
        });
    }
    
    // Handle report row clicks
    var reportRows = document.querySelectorAll('tbody tr');
    reportRows.forEach(function(row function() {
        row.addEventListener(function('click', () function() {
            // Highlight selected row
            reportRows.forEach(function(r => r.classList.remove('bg-blue-50/30', 'dark:bg-blue-900/10'));
            row.classList.add('bg-blue-50/30', 'dark:bg-blue-900/10');
            
            // In a real app, this would load the report details
            console.log('Report selected');
        });
    });
});

function handleAdminLogin() {
    var loginForm = document.querySelector('.bg-surface-light.dark\\:bg-surface-dark.max-w-\\[440px\\]');
    if (!loginForm) return;
    
    var emailInput = loginForm.querySelector('input[type="email"]');
    var passwordInput = loginForm.querySelector('input[type="password"]');
    
    var email = emailInput?.value.trim();
    var password = passwordInput?.value.trim();
    
    // Clear previous errors
    clearLoginErrors();
    
    var isValid = true;
    
    if (!email) {
        showLoginError(emailInput, 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showLoginError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!password) {
        showLoginError(passwordInput, 'Please enter your password');
        isValid = false;
    }
    
    if (isValid) {
        // Show loading state
        showLoginLoadingState();
        
        // Simulate API call
        setTimeout(() function() {
            // For demo purposes, accept any non-empty credentials
            if (email && password) {
                showDashboard();
            } else {
                restoreLoginButton();
                showLoginError(null, 'Invalid credentials. Please try again.');
            }
        }, 1500);
    }
}

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showLoginError(input: HTMLInputElement | null, message) {
    if (!input) {
        // Show general error message
        var loginForm = document.querySelector('.bg-surface-light.dark\\:bg-surface-dark.max-w-\\[440px\\]');
        if (loginForm) {
            var errorHtml = `
                <div class="error-message p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm mb-4">
                    <div class="flex items-start">
                        <span class="material-symbols-outlined mr-2">error</span>
                        <div>${message}</div>
                    </div>
                </div>
            `;
            
            // Remove existing error if any
            var existingError = loginForm.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            var formContent = loginForm.querySelector('.px-8.pb-10');
            if (formContent) {
                formContent.insertAdjacentHTML('afterbegin', errorHtml);
            }
        }
        return;
    }
    
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

function clearLoginErrors() {
    var errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(function(el => el.remove());
    
    var inputs = document.querySelectorAll('input');
    inputs.forEach(function(input => input.classList.remove('border-red-500'));
}

function showLoginLoadingState() {
    var loginForm = document.querySelector('.bg-surface-light.dark\\:bg-surface-dark.max-w-\\[440px\\]');
    if (!loginForm) return;
    
    var loginButton = loginForm.querySelector('button');
    if (loginButton) {
        var originalContent = loginButton.innerHTML;
        loginButton.innerHTML = `
            <span class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
            </span>
        `;
        (loginButton as HTMLButtonElement).disabled = true;
        
        // Store original content for later restoration
        (loginButton as any).originalContent = originalContent;
    }
}

function restoreLoginButton() {
    var loginForm = document.querySelector('.bg-surface-light.dark\\:bg-surface-dark.max-w-\\[440px\\]');
    if (!loginForm) return;
    
    var loginButton = loginForm.querySelector('button');
    if (loginButton && (loginButton as any).originalContent) {
        loginButton.innerHTML = (loginButton as any).originalContent;
        (loginButton as HTMLButtonElement).disabled = false;
    }
}

function showDashboard() {
    // Hide login modal and show dashboard
    var loginModal = document.querySelector('.fixed.inset-0.z-50');
    if (loginModal) {
        loginModal.classList.add('hidden');
    }
    
    // Show success notification
    var notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center';
    notification.innerHTML = `
        <span class="material-symbols-outlined mr-2">check_circle</span>
        <span>Login successful. Welcome back!</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() function() {
        notification.remove();
    }, 3000);
}

function handleAdminLogout() {
    // Show confirmation dialog
    if (confirm('Are you sure you want to logout?')) {
        // Show login modal
        var loginModal = document.querySelector('.fixed.inset-0.z-50');
        if (loginModal) {
            loginModal.classList.remove('hidden');
        }
        
        // Reset form
        var loginForm = document.querySelector('.bg-surface-light.dark\\:bg-surface-dark.max-w-\\[440px\\]');
        if (loginForm) {
            var emailInput = loginForm.querySelector('input[type="email"]');
            var passwordInput = loginForm.querySelector('input[type="password"]');
            
            if (emailInput) emailInput.value = '';
            if (passwordInput) passwordInput.value = '';
            
            // Clear errors
            clearLoginErrors();
        }
    }
}

function updateReportStatus() {
    var statusSelect = document.querySelector('.form-select');
    var status = statusSelect?.value;
    
    if (status) {
        // Show loading state
        var updateButton = document.querySelector('.bg-background-light.dark\\:bg-background-dark.p-4.rounded-lg button');
        if (updateButton) {
            var originalContent = updateButton.innerHTML;
            updateButton.innerHTML = 'Updating...';
            (updateButton as HTMLButtonElement).disabled = true;
            
            // Simulate API call
            setTimeout(() function() {
                // Restore button
                updateButton.innerHTML = originalContent;
                (updateButton as HTMLButtonElement).disabled = false;
                
                // Show success message
                var statusCard = document.querySelector('.bg-background-light.dark\\:bg-background-dark.p-4.rounded-lg');
                if (statusCard) {
                    var successMessage = `
                        <div class="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 text-sm flex items-center">
                            <span class="material-symbols-outlined mr-2">check</span>
                            Status updated successfully
                        </div>
                    `;
                    
                    // Remove existing success message if any
                    var existingSuccess = statusCard.querySelector('.bg-green-50');
                    if (existingSuccess) {
                        existingSuccess.remove();
                    }
                    
                    statusCard.insertAdjacentHTML('beforeend', successMessage);
                    
                    // Remove success message after 3 seconds
                    setTimeout(() function() {
                        var successMsg = statusCard.querySelector('.bg-green-50');
                        if (successMsg) {
                            successMsg.remove();
                        }
                    }, 3000);
                }
            }, 1000);
        }
    }
}

function sendAdminReply() {
    var replyTextarea = document.querySelector('textarea[placeholder*="Type your response here"]');
    var reply = replyTextarea?.value.trim();
    
    if (!reply) {
        // Show error on textarea
        var errorElement = document.createElement('div');
        errorElement.className = 'error-message text-red-600 text-xs mt-1';
        errorElement.textContent = 'Please enter a message';
        replyTextarea.parentElement?.appendChild(errorElement);
        replyTextarea.classList.add('border-red-500');
        return;
    }
    
    // Clear previous errors
    var existingError = replyTextarea.parentElement?.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    replyTextarea.classList.remove('border-red-500');
    
    // Show sending state
    var sendButton = document.querySelector('button:contains("Send Update")');
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
            var replySection = document.querySelector('div > div:has(h3.text-sm.font-bold:contains("Reply to Reporter"))');
            if (replySection) {
                var successMessage = `
                    <div class="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 text-sm flex items-center">
                        <span class="material-symbols-outlined mr-2">check</span>
                        Reply sent successfully
                    </div>
                `;
                
                // Remove existing success message if any
                var existingSuccess = replySection.querySelector('.bg-green-50');
                if (existingSuccess) {
                    existingSuccess.remove();
                }
                
                replySection.insertAdjacentHTML('beforeend', successMessage);
                
                // Remove success message after 3 seconds
                setTimeout(() function() {
                    var successMsg = replySection.querySelector('.bg-green-50');
                    if (successMsg) {
                        successMsg.remove();
                    }
                }, 3000);
            }
        }, 1000);
    }
}

function filterReports(query) {
    var reportRows = document.querySelectorAll('tbody tr');
    var searchTerm = query.toLowerCase().trim();
    
    reportRows.forEach(function(row function() {
        var rowText = row.textContent?.toLowerCase() || '';
        if (searchTerm === '' || rowText.includes(searchTerm)) {
            (row).style.display = '';
        } else {
            (row).style.display = 'none';
        }
    });
}
