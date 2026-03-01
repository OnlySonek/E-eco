// Firebase Initialization Module
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { 
    getAuth, 
    onAuthStateChanged,
    GoogleAuthProvider,
    GithubAuthProvider,
    FacebookAuthProvider 
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { firebaseConfig } from './config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export auth providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Setup auth observer for navbar
export function setupAuthObserver() {
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
