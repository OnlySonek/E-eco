// Profile Page Module
import { auth, db, setupAuthObserver } from './firebase-init.js';
import { onAuthStateChanged, updateProfile, signOut, deleteUser } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { doc, setDoc, getDoc, collection, query, where, getDocs, orderBy } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { updateCartCounter } from './main.js';
import { showToast } from './utils.js';

let currentUser = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('👤 Profile page initializing...');
    
    setupAuthObserver();
    updateCartCounter();
    setupTabs();
    setupEventListeners();
    
    // Check auth state
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            currentUser = user;
            await loadUserProfile(user);
            console.log('✅ Profile loaded for:', user.email);
        } else {
            // Redirect to auth page if not logged in
            window.location.href = 'auth.html';
        }
    });
});

// Load user profile
async function loadUserProfile(user) {
    // Display basic info
    document.getElementById('displayName').textContent = user.displayName || user.email.split('@')[0];
    document.getElementById('userEmail').textContent = user.email;
    
    // Profile picture
    const profilePic = document.getElementById('profilePicture');
    profilePic.src = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=3b82f6&color=fff&size=256`;
    
    // Member since
    const createdAt = user.metadata.creationTime;
    const year = new Date(createdAt).getFullYear();
    document.getElementById('memberSince').textContent = year;
    
    // Load additional profile data from Firestore
    try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            const data = userDoc.data();
            document.getElementById('fullName').value = data.fullName || '';
            document.getElementById('age').value = data.age || '';
            document.getElementById('phone').value = data.phone || '';
            document.getElementById('street').value = data.street || '';
            document.getElementById('city').value = data.city || '';
            document.getElementById('postal').value = data.postal || '';
            document.getElementById('country').value = data.country || '';
        }
    } catch (error) {
        console.error('Error loading profile data:', error);
    }
    
    // Load orders
    await loadOrders(user.uid);
}

// Setup tabs
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            
            // Update active button
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show corresponding pane
            tabPanes.forEach(pane => {
                if (pane.id === `${tabName}-tab`) {
                    pane.classList.add('active');
                } else {
                    pane.classList.remove('active');
                }
            });
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Sign out
    document.getElementById('signOutBtn').addEventListener('click', async () => {
        try {
            await signOut(auth);
            showToast('Signed out successfully', 'success');
            window.location.href = 'index.html';
        } catch (error) {
            showToast('Error signing out', 'error');
            console.error(error);
        }
    });
    
    // Change picture
    document.getElementById('changePictureBtn').addEventListener('click', () => {
        document.getElementById('editModal').classList.remove('hidden');
    });
    
    document.getElementById('cancelPhotoBtn').addEventListener('click', () => {
        document.getElementById('editModal').classList.add('hidden');
    });
    
    document.getElementById('savePhotoBtn').addEventListener('click', async () => {
        const photoURL = document.getElementById('photoURL').value;
        if (!photoURL) {
            showToast('Please enter a valid URL', 'error');
            return;
        }
        
        try {
            await updateProfile(currentUser, { photoURL });
            document.getElementById('profilePicture').src = photoURL;
            document.getElementById('editModal').classList.add('hidden');
            showToast('Profile picture updated!', 'success');
        } catch (error) {
            showToast('Error updating picture', 'error');
            console.error(error);
        }
    });
    
    // Edit profile button
    document.getElementById('editProfileBtn').addEventListener('click', () => {
        document.getElementById('editModal').classList.remove('hidden');
    });
    
    // Personal info form
    document.getElementById('personalInfoForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await savePersonalInfo();
    });
    
    // Address form
    document.getElementById('addressForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveAddress();
    });
    
    // Delete account
    document.getElementById('deleteAccountBtn').addEventListener('click', async () => {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                await deleteUser(currentUser);
                showToast('Account deleted', 'success');
                window.location.href = 'index.html';
            } catch (error) {
                showToast('Error deleting account. Please sign in again and try.', 'error');
                console.error(error);
            }
        }
    });
}

// Save personal info
async function savePersonalInfo() {
    if (!currentUser) return;
    
    const data = {
        fullName: document.getElementById('fullName').value,
        age: document.getElementById('age').value,
        phone: document.getElementById('phone').value,
        updatedAt: new Date().toISOString()
    };
    
    try {
        await setDoc(doc(db, 'users', currentUser.uid), data, { merge: true });
        
        // Update display name in Firebase Auth
        if (data.fullName) {
            await updateProfile(currentUser, { displayName: data.fullName });
            document.getElementById('displayName').textContent = data.fullName;
        }
        
        showToast('✅ Personal info saved!', 'success');
    } catch (error) {
        showToast('Error saving info', 'error');
        console.error(error);
    }
}

// Save address
async function saveAddress() {
    if (!currentUser) return;
    
    const data = {
        street: document.getElementById('street').value,
        city: document.getElementById('city').value,
        postal: document.getElementById('postal').value,
        country: document.getElementById('country').value,
        updatedAt: new Date().toISOString()
    };
    
    try {
        await setDoc(doc(db, 'users', currentUser.uid), data, { merge: true });
        showToast('✅ Address saved!', 'success');
    } catch (error) {
        showToast('Error saving address', 'error');
        console.error(error);
    }
}


// Load user orders
async function loadOrders(userId) {
    try {
        const ordersQuery = query(
            collection(db, 'orders'),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );
        
        const ordersSnapshot = await getDocs(ordersQuery);
        const ordersList = document.getElementById('ordersList');
        
        if (ordersSnapshot.empty) {
            ordersList.innerHTML = `
                <div class="text-center py-12 text-gray-400">
                    <p class="text-6xl mb-4">📦</p>
                    <p>No orders yet</p>
                    <a href="products.html" class="text-blue-400 hover:underline mt-2 inline-block">Start Shopping</a>
                </div>
            `;
            return;
        }
        
        ordersList.innerHTML = '';
        ordersSnapshot.forEach((doc) => {
            const order = doc.data();
            const orderDate = new Date(order.createdAt).toLocaleDateString();
            const statusColor = order.status === 'pending' ? 'bg-yellow-600' : 
                               order.status === 'completed' ? 'bg-green-600' : 'bg-blue-600';
            
            const orderHTML = `
                <div class="bg-slate-800 rounded-lg p-4 border border-slate-700">
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <h4 class="font-semibold">Order #${doc.id.slice(0, 8)}</h4>
                            <p class="text-sm text-gray-400">${orderDate}</p>
                        </div>
                        <span class="px-3 py-1 ${statusColor} rounded-full text-xs font-medium">${order.status}</span>
                    </div>
                    <div class="space-y-2 mb-3">
                        ${order.items.map(item => `
                            <div class="flex justify-between text-sm">
                                <span>${item.name} x${item.quantity}</span>
                                <span>$${(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="border-t border-slate-700 pt-3 flex justify-between font-bold">
                        <span>Total</span>
                        <span class="text-blue-400">$${order.total.toLocaleString()}</span>
                    </div>
                </div>
            `;
            
            ordersList.innerHTML += orderHTML;
        });
        
        console.log(`✅ Loaded ${ordersSnapshot.size} orders`);
        
    } catch (error) {
        console.error('Error loading orders:', error);
        showToast('Error loading orders', 'error');
    }
}
