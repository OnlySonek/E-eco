// Simple JavaScript Obfuscator
// This script will minify and obfuscate your code

const fs = require('fs');
const path = require('path');

// Files to obfuscate
const files = [
    'main.js',
    'home.js',
    'products.js',
    'cart.js',
    'auth.js',
    'product-details.js',
    'profile.js',
    'contact.js',
    'utils.js'
];

// Simple minification (remove comments, extra spaces, newlines)
function minify(code) {
    return code
        // Remove single-line comments
        .replace(/\/\/.*$/gm, '')
        // Remove multi-line comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove console.log statements
        .replace(/console\.(log|info|debug|warn)\([^)]*\);?/g, '')
        // Remove extra whitespace
        .replace(/\s+/g, ' ')
        // Remove spaces around operators
        .replace(/\s*([=+\-*/<>!&|,;:{}()\[\]])\s*/g, '$1')
        .trim();
}

// Obfuscate variable names (basic)
function obfuscate(code) {
    // This is a very basic obfuscation
    // For production, use a proper obfuscator like javascript-obfuscator
    
    // Encode strings
    code = code.replace(/'([^']*)'/g, (match, str) => {
        return `atob('${Buffer.from(str).toString('base64')}')`;
    });
    
    return code;
}

// Process files
files.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Skipping ${file} (not found)`);
        return;
    }
    
    console.log(`🔒 Processing ${file}...`);
    
    const code = fs.readFileSync(filePath, 'utf8');
    const minified = minify(code);
    
    // Save minified version
    const outputPath = path.join(__dirname, 'min', file);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, minified);
    
    console.log(`✅ Saved to min/${file}`);
});

console.log('\n✅ All files processed!');
console.log('📁 Minified files are in js/min/ folder');
console.log('💡 Update your HTML files to use the minified versions');
