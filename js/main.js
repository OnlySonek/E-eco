// Main.js - Global Navbar and Cart Counter
import { auth } from './firebase-init.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

// Update cart counter from localStorage
export function updateCartCounter() {
    try {
        const cart = JSON.parse(localStorage.getItem('media_cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        
        const cartCountElements = document.querySelectorAll('#cartCount');
        cartCountElements.forEach(el => {
            el.textContent = totalItems;
            if (totalItems > 0) {
                el.classList.add('animate-pulse');
            } else {
                el.classList.remove('animate-pulse');
            }
        });
    } catch (error) {
        // Silent error handling
    }
}

// Setup auth observer for navbar
export function setupNavbarAuth() {
    onAuthStateChanged(auth, (user) => {
        const authLink = document.getElementById('authLink');
        const profileLink = document.getElementById('profileLink');
        const userAvatar = document.getElementById('userAvatar');
        const userNameDisplay = document.getElementById('userNameDisplay');

        if (user) {
            // User is signed in
            if (authLink) authLink.classList.add('hidden');
            if (profileLink) profileLink.classList.remove('hidden');

            if (userAvatar) {
                userAvatar.src = user.photoURL || 
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=3b82f6&color=fff&size=128`;
            }

            if (userNameDisplay) {
                userNameDisplay.textContent = user.displayName || user.email.split('@')[0];
            }
        } else {
            // User is signed out
            if (authLink) authLink.classList.remove('hidden');
            if (profileLink) profileLink.classList.add('hidden');
        }
    });
}

// Setup global search
export function setupGlobalSearch() {
    const globalSearch = document.getElementById('globalSearch');
    const mobileGlobalSearch = document.getElementById('mobileGlobalSearch');

    function handleSearch(searchTerm) {
        if (searchTerm.trim()) {
            // Navigate to products page without showing search in URL
            window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
        }
    }

    if (globalSearch) {
        globalSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch(e.target.value);
            }
        });
    }

    if (mobileGlobalSearch) {
        mobileGlobalSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch(e.target.value);
            }
        });
    }
}

// Setup mobile menu toggle
export function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
}

// Theme Toggle
export function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');

    if (!themeToggle) return;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');

        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        } else {
            localStorage.setItem('theme', 'dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
    setupNavbarAuth();
    setupGlobalSearch();
    setupMobileMenu();
    setupThemeToggle();
});

// Export for use in other modules
window.updateCartCounter = updateCartCounter;
