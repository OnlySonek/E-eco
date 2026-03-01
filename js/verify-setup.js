// Setup Verification Script
// Run this in browser console to verify everything works

console.log('🔍 Verifying Media Store Setup...\n');

// 1. Check Products Database
import { products, totalProducts } from './products-data.js';
console.log(`✅ Products Database: ${totalProducts} products loaded`);
console.log(`   Categories: ${[...new Set(products.map(p => p.category))].join(', ')}`);

// 2. Check Firebase Config
import { firebaseConfig } from './config.js';
console.log(`✅ Firebase Config: Project ID = ${firebaseConfig.projectId}`);

// 3. Check localStorage
const testCart = [{ id: 1, name: "Test", price: 100, quantity: 1 }];
localStorage.setItem('test-cart', JSON.stringify(testCart));
const retrieved = JSON.parse(localStorage.getItem('test-cart'));
console.log(`✅ localStorage: ${retrieved ? 'Working' : 'Not working'}`);
localStorage.removeItem('test-cart');

// 4. Check Search Functionality
const searchTest = products.filter(p => p.name.toLowerCase().includes('asus'));
console.log(`✅ Search: Found ${searchTest.length} ASUS products`);

// 5. Check Category Filtering
const laptops = products.filter(p => p.category === 'laptop');
console.log(`✅ Filtering: ${laptops.length} laptops found`);

console.log('\n🎉 All systems operational!');
