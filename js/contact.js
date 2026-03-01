// Contact Page Module with EmailJS Integration
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { db, setupAuthObserver } from './firebase-init.js';
import { updateCartCounter } from './main.js';
import { showToast } from './utils.js';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('📧 Contact page initializing...');
    setupAuthObserver();
    updateCartCounter();
    setupContactForm();
    console.log('✅ Contact page ready');
});

// Setup contact form
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    form.addEventListener('submit', async (e) => {
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
                    console.log('✅ Message also saved to Firestore');
                } catch (firestoreError) {
                    console.warn('⚠️ Could not save to Firestore:', firestoreError);
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
                
                console.log('✅ Message sent to email successfully');
                
                // Hide success message after 7 seconds
                setTimeout(() => {
                    formStatus.classList.add('hidden');
                }, 7000);
            } else {
                throw new Error('Failed to send email');
            }
            
        } catch (error) {
            console.error('❌ Error sending message:', error);
            
            // Show error message
            formStatus.classList.remove('hidden');
            formStatus.innerHTML = `
                <div class="bg-red-600 text-white p-4 rounded-lg">
                    <p class="font-semibold">❌ Error sending message</p>
                    <p class="text-sm mt-1">${error.message}</p>
                    <p class="text-sm mt-2">Please try again or contact us directly at abdelrhmansherif140@gmail.com</p>
                </div>
            `;
            
            showToast('Error sending message', 'error');
            
            // Hide error message after 7 seconds
            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 7000);
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Send email using EmailJS
async function sendEmailViaEmailJS(name, email, subject, message) {
    try {
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            console.error('❌ EmailJS not loaded');
            return false;
        }
        
        // EmailJS template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: 'abdelrhmansherif140@gmail.com',
            reply_to: email
        };
        
        // Send email
        // Note: You need to replace these with your actual EmailJS credentials
        const response = await emailjs.send(
            'YOUR_SERVICE_ID',      // Replace with your EmailJS Service ID
            'YOUR_TEMPLATE_ID',     // Replace with your EmailJS Template ID
            templateParams
        );
        
        console.log('✅ EmailJS Response:', response);
        return response.status === 200;
        
    } catch (error) {
        console.error('❌ EmailJS Error:', error);
        return false;
    }
}
