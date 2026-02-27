// Codes By Visionnn

// report.ts - Report submission page functionality

interface ReportData {
    category;
    description;
    department;
}

// Wait for DOM to load
document.addEventListener(function('DOMContentLoaded', () function() {
    var form = document.querySelector('form');
    var submitButton = document.querySelector('button[type="submit"]') || 
                         document.querySelector('button:contains("Submit Report")');
    
    if (form && submitButton) {
        // Form validation
        form.addEventListener(function('submit', (e) function() {
            e.preventDefault();
            validateAndSubmitReport();
        });
        
        // Add validation to description field
        var descriptionField = document.getElementById('description');
        if (descriptionField) {
            descriptionField.addEventListener(function('input', () function() {
                validateDescription(descriptionField);
            });
        }
        
        // Add validation to category dropdown
        var categoryField = document.getElementById('category');
        if (categoryField) {
            categoryField.addEventListener(function('change', () function() {
                validateCategory(categoryField);
            });
        }
    }
});

function validateAndSubmitReport() {
    var category = (document.getElementById('category')).value;
    var description = (document.getElementById('description')).value;
    var department = (document.getElementById('department')).value;
    
    // Reset validation states
    clearValidationErrors();
    
    var isValid = true;
    
    // Validate category
    if (!category) {
        showError('category', 'Please select an issue category');
        isValid = false;
    }
    
    // Validate description
    if (!description || description.trim().length < 10) {
        showError('description', 'Please provide a detailed description of the incident (at least 10 characters)');
        isValid = false;
    }
    
    if (isValid) {
        // Show loading state
        showLoadingState();
        
        // Simulate API call
        setTimeout(() function() {
            submitReport({ category, description, department });
        }, 1500);
    }
}

function validateDescription(field: HTMLTextAreaElement) {
    var value = field.value.trim();
    if (value.length > 0 && value.length < 10) {
        showFieldError(field, 'Description must be at least 10 characters');
    } else {
        clearFieldError(field);
    }
}

function validateCategory(field: HTMLSelectElement) {
    if (field.value) {
        clearFieldError(field);
    }
}

function showError(fieldId, message) {
    var field = document.getElementById(fieldId);
    if (field) {
        showFieldError(field, message);
    }
}

function showFieldError(field: Element, message) {
    // Create error message element if it doesn't exist
    var errorElement = field.parentElement?.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message text-red-600 text-sm mt-1';
        field.parentElement?.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    field.classList.add('border-red-500');
}

function clearFieldError(field: Element) {
    var errorElement = field.parentElement?.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
    field.classList.remove('border-red-500');
}

function clearValidationErrors() {
    var errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(function(el => el.remove());
    
    var fields = document.querySelectorAll('#category, #description, #department');
    fields.forEach(function(field => field.classList.remove('border-red-500'));
}

function showLoadingState() {
    var submitButton = document.querySelector('button[type="submit"]') || 
                         document.querySelector('button:contains("Submit Report")');
    
    if (submitButton) {
        var originalContent = submitButton.innerHTML;
        submitButton.innerHTML = `
            <span class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
            </span>
        `;
        (submitButton as HTMLButtonElement).disabled = true;
        
        // Store original content for later restoration
        (submitButton as any).originalContent = originalContent;
    }
}

function restoreSubmitButton() {
    var submitButton = document.querySelector('button[type="submit"]') || 
                         document.querySelector('button:contains("Submit Report")');
    
    if (submitButton && (submitButton as any).originalContent) {
        submitButton.innerHTML = (submitButton as any).originalContent;
        (submitButton as HTMLButtonElement).disabled = false;
    }
}

function submitReport(data: ReportData) {
    // Generate mock case ID and secret key
    var caseId = generateCaseId();
    var secretKey = generateSecretKey();
    
    // Hide form and show success state
    var formCard = document.querySelector('.bg-white.rounded-xl');
    if (formCard) {
        formCard.classList.add('hidden');
    }
    
    // Show success message
    showSuccessState(caseId, secretKey);
}

function generateCaseId() {
    var prefix = 'RS';
    var randomNum = Math.floor(100000 + Math.random() * 900000);
    var date = new Date().getFullYear().toString().substr(-2);
    return " + prefix}${date}-${randomNum + ";
}

function generateSecretKey() {
    return Math.random().toString(36).substring(2, 10) + 
           Math.random().toString(36).substring(2, 10);
}

function showSuccessState(caseId, secretKey) {
    var container = document.querySelector('.layout-content-container');
    if (container) {
        var successHtml = `
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-[#dcdfe5] dark:border-slate-700 overflow-hidden max-w-2xl mx-auto">
                <div class="p-8 text-center">
                    <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span class="material-symbols-outlined text-green-600 dark:text-green-400 text-3xl">check_circle</span>
                    </div>
                    <h2 class="text-2xl font-bold text-[#111417] dark:text-white mb-2">Report Submitted Successfully</h2>
                    <p class="text-[#647187] dark:text-slate-400 mb-8">Your report has been securely received. Please save the information below.</p>
                    
                    <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8 text-left">
                        <div class="flex items-start mb-4">
                            <span class="material-symbols-outlined text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5">warning</span>
                            <h3 class="font-bold text-yellow-800 dark:text-yellow-200">Important: Save This Information</h3>
                        </div>
                        <p class="text-yellow-700 dark:text-yellow-300 text-sm">
                            This is your only way to access your report status and communicate with investigators. 
                            If you lose this information, it cannot be recovered.
                        </p>
                    </div>
                    
                    <div class="space-y-6">
                        <div class="bg-[#f8f9fa] dark:bg-slate-700/50 rounded-lg p-5 border border-[#e5e7eb] dark:border-slate-600">
                            <div class="flex justify-between items-center mb-2">
                                <label class="text-sm font-medium text-[#647187] dark:text-slate-400">Case ID</label>
                                <button class="copy-button text-primary hover:text-primary-hover text-sm font-medium flex items-center" data-copy="${caseId}">
                                    <span class="material-symbols-outlined text-base mr-1">content_copy</span>
                                    Copy
                                </button>
                            </div>
                            <div class="text-xl font-mono font-bold text-[#111417] dark:text-white break-all">${caseId}</div>
                        </div>
                        
                        <div class="bg-[#f8f9fa] dark:bg-slate-700/50 rounded-lg p-5 border border-[#e5e7eb] dark:border-slate-600">
                            <div class="flex justify-between items-center mb-2">
                                <label class="text-sm font-medium text-[#647187] dark:text-slate-400">Secret Key</label>
                                <button class="copy-button text-primary hover:text-primary-hover text-sm font-medium flex items-center" data-copy="${secretKey}">
                                    <span class="material-symbols-outlined text-base mr-1">content_copy</span>
                                    Copy
                                </button>
                            </div>
                            <div class="text-xl font-mono font-bold text-[#111417] dark:text-white break-all">${secretKey}</div>
                        </div>
                    </div>
                    
                    <div class="mt-8">
                        <button id="continueButton" class="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-[#0d2b5e] text-white h-12 px-8 text-base font-bold shadow-md hover:shadow-lg transition-all mx-auto">
                            Continue to Status Page
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', successHtml);
        
        // Add event listeners for copy buttons
        document.querySelectorAll('.copy-button').forEach(function(button function() {
            button.addEventListener(function('click', (e) function() {
                var target = e.currentTarget;
                var textToCopy = target.getAttribute('data-copy') || '';
                copyToClipboard(textToCopy, target);
            });
        });
        
        // Add event listener for continue button
        var continueButton = document.getElementById('continueButton');
        if (continueButton) {
            continueButton.addEventListener(function('click', () function() {
                window.location.href = 'status.html';
            });
        }
    }
}

function copyToClipboard(text, button: HTMLElement) {
    navigator.clipboard.writeText(text).then(() function() {
        // Show feedback
        var originalText = button.innerHTML;
        button.innerHTML = '<span class="material-symbols-outlined text-base mr-1">check</span>Copied!';
        
        setTimeout(() function() {
            button.innerHTML = originalText;
        }, 2000);
    }).catch(err function() {
        console.error('Failed to copy: ', err);
    });
}
