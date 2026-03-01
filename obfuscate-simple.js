// Simple JavaScript Obfuscator Script
// Run with: node obfuscate-simple.js

const fs = require('fs');
const path = require('path');

// Files to obfuscate
const filesToObfuscate = [
    'js/main.js',
    'js/home.js',
    'js/products.js',
    'js/cart.js',
    'js/auth.js',
    'js/product-details.js',
    'js/utils.js',
    'js/contact.js'
];

// Simple obfuscation function
function obfuscateCode(code) {
    let obfuscated = code;
    
    // Remove all comments
    obfuscated = obfuscated.replace(/\/\*[\s\S]*?\*\//g, '');
    obfuscated = obfuscated.replace(/\/\/.*/g, '');
    
    // Remove console.log statements
    obfuscated = obfuscated.replace(/console\.(log|info|debug|warn|error)\([^)]*\);?/g, '');
    
    // Minify: remove extra whitespace
    obfuscated = obfuscated.replace(/\s+/g, ' ');
    obfuscated = obfuscated.replace(/\s*([{}();,:])\s*/g, '$1');
    
    // Remove spaces around operators
    obfuscated = obfuscated.replace(/\s*([=+\-*/<>!&|])\s*/g, '$1');
    
    return obfuscated.trim();
}

// Create backup folder
const backupDir = 'js-backup';
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
    console.log('📁 Created backup folder: js-backup/');
}

console.log('🔒 Starting obfuscation process...\n');

// Process each file
filesToObfuscate.forEach(filePath => {
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  Skipping ${filePath} (not found)`);
            return;
        }
        
        // Read original file
        const originalCode = fs.readFileSync(filePath, 'utf8');
        const fileSize = (originalCode.length / 1024).toFixed(2);
        
        // Create backup
        const fileName = path.basename(filePath);
        const backupPath = path.join(backupDir, fileName);
        fs.writeFileSync(backupPath, originalCode);
        
        // Obfuscate
        const obfuscatedCode = obfuscateCode(originalCode);
        const newSize = (obfuscatedCode.length / 1024).toFixed(2);
        const reduction = ((1 - obfuscatedCode.length / originalCode.length) * 100).toFixed(1);
        
        // Write obfuscated version
        fs.writeFileSync(filePath, obfuscatedCode);
        
        console.log(`✅ ${fileName}`);
        console.log(`   Original: ${fileSize} KB → Obfuscated: ${newSize} KB (${reduction}% smaller)`);
        console.log(`   Backup saved to: ${backupPath}\n`);
        
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
});

console.log('✅ Obfuscation complete!');
console.log('\n📋 Next steps:');
console.log('1. Test your website thoroughly');
console.log('2. If something breaks, restore from js-backup/ folder');
console.log('3. For stronger protection, use https://obfuscator.io/');
console.log('\n⚠️  Remember: Keep js-backup/ folder safe!');
