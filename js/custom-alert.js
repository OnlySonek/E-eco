// Custom Alert System
// استخدام: customAlert('message', 'type', callback)
// Types: success, error, warning, info

function customAlert(message, type = 'info', callback = null) {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.custom-alert-overlay');
    existingAlerts.forEach(alert => alert.remove());
    
    // Icon mapping
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    // Title mapping
    const titles = {
        success: 'نجح!',
        error: 'خطأ!',
        warning: 'تحذير!',
        info: 'معلومة'
    };
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'custom-alert-overlay';
    
    // Create alert
    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;
    
    // Alert content
    alert.innerHTML = `
        <div class="custom-alert-header">
            <div class="custom-alert-icon ${type}">
                ${icons[type] || icons.info}
            </div>
            <div>${titles[type] || titles.info}</div>
        </div>
        <div class="custom-alert-body">
            ${message}
        </div>
        <div class="custom-alert-footer">
            <button class="custom-alert-btn custom-alert-btn-primary" onclick="closeCustomAlert()">
                حسناً
            </button>
        </div>
    `;
    
    // Append to body
    document.body.appendChild(overlay);
    document.body.appendChild(alert);
    
    // Close on overlay click
    overlay.addEventListener('click', () => {
        closeCustomAlert(callback);
    });
    
    // Close on Escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeCustomAlert(callback);
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

function closeCustomAlert(callback = null) {
    const overlay = document.querySelector('.custom-alert-overlay');
    const alert = document.querySelector('.custom-alert');
    
    if (overlay) overlay.remove();
    if (alert) alert.remove();
    
    if (callback && typeof callback === 'function') {
        callback();
    }
}

// Confirm dialog
function customConfirm(message, onConfirm, onCancel = null) {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.custom-alert-overlay');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'custom-alert-overlay';
    
    // Create alert
    const alert = document.createElement('div');
    alert.className = 'custom-alert warning';
    
    // Alert content
    alert.innerHTML = `
        <div class="custom-alert-header">
            <div class="custom-alert-icon warning">⚠️</div>
            <div>تأكيد</div>
        </div>
        <div class="custom-alert-body">
            ${message}
        </div>
        <div class="custom-alert-footer">
            <button class="custom-alert-btn custom-alert-btn-secondary" id="cancelBtn">
                إلغاء
            </button>
            <button class="custom-alert-btn custom-alert-btn-primary" id="confirmBtn">
                تأكيد
            </button>
        </div>
    `;
    
    // Append to body
    document.body.appendChild(overlay);
    document.body.appendChild(alert);
    
    // Handle confirm
    document.getElementById('confirmBtn').addEventListener('click', () => {
        closeCustomAlert();
        if (onConfirm && typeof onConfirm === 'function') {
            onConfirm();
        }
    });
    
    // Handle cancel
    document.getElementById('cancelBtn').addEventListener('click', () => {
        closeCustomAlert();
        if (onCancel && typeof onCancel === 'function') {
            onCancel();
        }
    });
    
    // Close on overlay click (cancel)
    overlay.addEventListener('click', () => {
        closeCustomAlert();
        if (onCancel && typeof onCancel === 'function') {
            onCancel();
        }
    });
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { customAlert, customConfirm, closeCustomAlert };
}

// Examples:
// customAlert('تم إرسال الرسالة بنجاح!', 'success');
// customAlert('حدث خطأ في الإرسال', 'error');
// customAlert('يرجى ملء جميع الحقول', 'warning');
// customAlert('معلومة مفيدة', 'info');
// customConfirm('هل أنت متأكد من الحذف؟', () => { console.log('Confirmed'); }, () => { console.log('Cancelled'); });
