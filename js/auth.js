// Authentication Module
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signInWithPopup 
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { auth, googleProvider, setupAuthObserver } from './firebase-init.js';
import { updateCartCounter } from './main.js';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('🔐 Auth page initializing...');
        
        // Setup auth observer
        setupAuthObserver();
        
        // Update cart counter
        updateCartCounter();
        
        // Setup event listeners
        setupEventListeners();
        
        console.log('✅ Auth page ready');
    } catch (error) {
        console.error('❌ Auth page error:', error);
    }
});

function setupEventListeners() {
    // Toggle between Login and Register
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    showRegisterBtn?.addEventListener('click', () => {
        loginForm?.classList.add('hidden');
        registerForm?.classList.remove('hidden');
    });
    
    showLoginBtn?.addEventListener('click', () => {
        registerForm?.classList.add('hidden');
        loginForm?.classList.remove('hidden');
    });

    // Email Login
    document.getElementById('loginEmailForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = 'profile.html';
        } catch (error) {
            alert('Login Error: ' + error.message);
            console.error('Login error:', error);
        }
    });

    // Email Registration
    document.getElementById('registerEmailForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirm = document.getElementById('registerConfirmPassword').value;

        if (password !== confirm) {
            alert('Passwords do not match!');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            window.location.href = 'profile.html';
        } catch (error) {
            alert('Registration Error: ' + error.message);
            console.error('Registration error:', error);
        }
    });

    // Google Login
    document.getElementById('googleLogin')?.addEventListener('click', async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            window.location.href = 'profile.html';
        } catch (error) {
            console.error('Google login error:', error);
            alert('Login failed: ' + error.message);
        }
    });
}
