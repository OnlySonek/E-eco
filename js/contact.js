// Contact Page Module with EmailJS Integration + Alert-Based Debugging
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { db, setupAuthObserver } from './firebase-init.js';
import { updateCartCounter } from './main.js';
import { showToast } from './utils.js';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupAuthObserver();
    updateCartCounter();
    setupContactForm();
});

// Setup contact form
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    form.addEventListener('submit', async (e) => {
        // ✅ منع إعادة تحميل الصفحة
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="animate-spin inline-block mr-2">⏳</span> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Send email using EmailJS
            const emailSent = await sendEmailViaEmailJS(name, email, subject, message);
            
            if (emailSent) {
                // ✅ Custom Alert نجاح
                if (typeof customAlert === 'function') {
                    customAlert(
                        '✅ تم إرسال الرسالة بنجاح!<br><br>' +
                        'Email sent successfully to:<br>' +
                        '<strong>abdelrhmansherif140@gmail.com</strong><br><br>' +
                        'سنرد عليك في أقرب وقت',
                        'success'
                    );
                } else {
                    alert('✅ تم إرسال الرسالة بنجاح!\n\nEmail sent successfully to:\nabdelrhmansherif140@gmail.com\n\nسنرد عليك في أقرب وقت');
                }
                
                // Also save to Firestore for backup
                try {
                    await addDoc(collection(db, 'messages'), {
                        name: name,
                        email: email,
                        subject: subject,
                        message: message,
                        status: 'unread',
                        createdAt: new Date().toISOString()
                    });
                } catch (firestoreError) {
                    // Silent fail for Firestore
                }
                
                // Show success message
                formStatus.classList.remove('hidden');
                formStatus.innerHTML = `
                    <div class="bg-green-600 text-white p-4 rounded-lg">
                        <p class="font-semibold">✅ Message sent successfully!</p>
                        <p class="text-sm mt-1">Your message has been sent to abdelrhmansherif140@gmail.com</p>
                        <p class="text-sm">We'll get back to you as soon as possible.</p>
                    </div>
                `;
                
                // Show toast
                showToast('✅ Message sent to email successfully!', 'success');
                
                // Reset form
                form.reset();
                
                // Hide success message after 7 seconds
                setTimeout(() => {
                    formStatus.classList.add('hidden');
                }, 7000);
            } else {
                throw new Error('Failed to send email');
            }
            
        } catch (error) {
            // ✅ Alert خطأ مفصل مع معلومات التشخيص
            let errorDetails = '❌ فشل إرسال الرسالة!\n\n';
            errorDetails += '📋 تفاصيل الخطأ:\n';
            errorDetails += error.message + '\n\n';
            
            // تحليل نوع الخطأ
            if (error.message.includes('Public Key') || error.message.includes('not initialized')) {
                errorDetails += '🔑 المشكلة: Public Key غير صحيح\n';
                errorDetails += '✅ الحل: تحقق من Public Key في contact.html';
            } else if (error.message.includes('Service')) {
                errorDetails += '🔧 المشكلة: Service ID غير صحيح\n';
                errorDetails += '✅ الحل: تحقق من Service ID في contact.html';
            } else if (error.message.includes('Template')) {
                errorDetails += '📝 المشكلة: Template ID غير صحيح\n';
                errorDetails += '✅ الحل: تحقق من Template ID في contact.html';
            } else if (error.message.includes('not configured')) {
                errorDetails += '⚙️ المشكلة: لم يتم تكوين EmailJS\n';
                errorDetails += '✅ الحل: راجع ملف 🔧_حل_مشكلة_الإيميل.md';
            } else if (error.message.includes('Network')) {
                errorDetails += '🌐 المشكلة: مشكلة في الاتصال\n';
                errorDetails += '✅ الحل: تحقق من الإنترنت وحاول مرة أخرى';
            } else {
                errorDetails += '❓ خطأ غير معروف\n';
                errorDetails += '✅ الحل: راجع التكوين في contact.html';
            }
            
            errorDetails += '\n\n📧 أو تواصل معنا مباشرة:\nabdelrhmansherif140@gmail.com';
            
            // ✅ Custom Alert للخطأ
            if (typeof customAlert === 'function') {
                customAlert(errorDetails.replace(/\n/g, '<br>'), 'error');
            } else {
                alert(errorDetails);
            }
            
            // Show error message
            formStatus.classList.remove('hidden');
            formStatus.innerHTML = `
                <div class="bg-red-600 text-white p-4 rounded-lg">
                    <p class="font-semibold">❌ Error sending message</p>
                    <p class="text-sm mt-1"><strong>Error:</strong> ${error.message}</p>
                    <p class="text-sm mt-2">Please contact us directly at:</p>
                    <p class="text-sm font-semibold">abdelrhmansherif140@gmail.com</p>
                </div>
            `;
            
            showToast('Error sending message', 'error');
            
            // Hide error message after 10 seconds
            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 10000);
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Send email using EmailJS with Alert-based debugging
async function sendEmailViaEmailJS(name, email, subject, message) {
    try {
        // 1. Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS library not loaded. Check if script is included in contact.html');
        }
        
        // 2. Get configuration from window (set in contact.html)
        const serviceId = window.EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
        const templateId = window.EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
        
        // 3. Check if IDs are configured
        if (serviceId === 'YOUR_SERVICE_ID' || serviceId === '') {
            throw new Error('Service ID not configured. Please update contact.html with your EmailJS Service ID');
        }
        
        if (templateId === 'YOUR_TEMPLATE_ID' || templateId === '') {
            throw new Error('Template ID not configured. Please update contact.html with your EmailJS Template ID');
        }
        
        // 4. Prepare template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: 'abdelrhmansherif140@gmail.com',
            reply_to: email
        };
        
        // 5. Send email
        const response = await emailjs.send(
            serviceId,
            templateId,
            templateParams
        );
        
        // 6. Check response
        if (response.status === 200) {
            return true;
        } else {
            throw new Error('Unexpected response status: ' + response.status);
        }
        
    } catch (error) {
        // Re-throw with more details
        throw error;
    }
}
