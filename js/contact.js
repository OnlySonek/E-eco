// Contact Page Module
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
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Save to Firestore
            await addDoc(collection(db, 'messages'), {
                name: name,
                email: email,
                subject: subject,
                message: message,
                status: 'unread',
                createdAt: new Date().toISOString()
            });
            
            // Show success message
            formStatus.classList.remove('hidden');
            formStatus.innerHTML = `
                <div class="bg-green-600 text-white p-4 rounded-lg">
                    <p class="font-semibold">✅ Message sent successfully!</p>
                    <p class="text-sm mt-1">We'll get back to you as soon as possible.</p>
                </div>
            `;
            
            // Show toast
            showToast('✅ Message sent successfully!', 'success');
            
            // Reset form
            form.reset();
            
            console.log('✅ Message sent to Firestore');
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 5000);
            
        } catch (error) {
            console.error('❌ Error sending message:', error);
            
            // Show error message
            formStatus.classList.remove('hidden');
            formStatus.innerHTML = `
                <div class="bg-red-600 text-white p-4 rounded-lg">
                    <p class="font-semibold">❌ Error sending message</p>
                    <p class="text-sm mt-1">${error.message}</p>
                </div>
            `;
            
            showToast('Error sending message', 'error');
            
            // Hide error message after 5 seconds
            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 5000);
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}
