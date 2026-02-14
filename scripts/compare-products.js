const fs = require('fs');
const path = require('path');

/**
 * Compare product names in store/products.ts with actual WebP files
 */

function toKebabCase(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[()]/g, '')
    .replace(/[%]/g, '')
    .replace(/[,]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Read products.ts file
const productsFilePath = path.join(__dirname, '../store/products.ts');
const productsContent = fs.readFileSync(productsFilePath, 'utf-8');

// Extract product names from the file
const productNameRegex = /name:\s*['"]([^'"]+)['"]/g;
const productNames = [];
let match;
while ((match = productNameRegex.exec(productsContent)) !== null) {
  productNames.push(match[1]);
}

// Read actual WebP files
const webpDir = path.join(__dirname, '../assets/images/convert/products/results/results');
let webpFiles = [];
if (fs.existsSync(webpDir)) {
  webpFiles = fs.readdirSync(webpDir)
    .filter(file => file.endsWith('.webp'))
    .map(file => file.replace('.webp', ''));
}

console.log('\n📊 COMPARISON REPORT\n');
console.log(`Products in store/products.ts: ${productNames.length}`);
console.log(`WebP files in results/results: ${webpFiles.length}\n`);

// Convert product names to kebab-case and compare
const productKebabNames = productNames.map(name => toKebabCase(name));
const webpSet = new Set(webpFiles);

console.log('🔍 Checking for mismatches...\n');

const missingFiles = [];
const extraFiles = [];
const matchedFiles = [];

productKebabNames.forEach((kebabName, index) => {
  const originalName = productNames[index];
  if (webpSet.has(kebabName)) {
    matchedFiles.push({ original: originalName, kebab: kebabName });
    webpSet.delete(kebabName);
  } else {
    missingFiles.push({ original: originalName, kebab: kebabName });
  }
});

// Remaining files in webpSet are extra files
extraFiles.push(...Array.from(webpSet));

// Report results
if (missingFiles.length > 0) {
  console.log(`❌ MISSING FILES (${missingFiles.length}):`);
  missingFiles.forEach(({ original, kebab }) => {
    console.log(`   - "${original}" → expected: ${kebab}.webp`);
  });
  console.log('');
}

if (extraFiles.length > 0) {
  console.log(`⚠️  EXTRA FILES (not in products.ts) (${extraFiles.length}):`);
  extraFiles.forEach(file => {
    console.log(`   - ${file}.webp`);
  });
  console.log('');
}

if (matchedFiles.length > 0) {
  console.log(`✅ MATCHED FILES: ${matchedFiles.length}`);
  if (matchedFiles.length <= 20) {
    matchedFiles.forEach(({ original, kebab }) => {
      console.log(`   ✓ "${original}" → ${kebab}.webp`);
    });
  } else {
    console.log(`   (showing first 10 of ${matchedFiles.length})`);
    matchedFiles.slice(0, 10).forEach(({ original, kebab }) => {
      console.log(`   ✓ "${original}" → ${kebab}.webp`);
    });
    console.log(`   ... and ${matchedFiles.length - 10} more`);
  }
  console.log('');
}

// Summary
console.log('\n📈 SUMMARY:');
console.log(`   ✅ Matched: ${matchedFiles.length}`);
console.log(`   ❌ Missing: ${missingFiles.length}`);
console.log(`   ⚠️  Extra: ${extraFiles.length}`);

if (missingFiles.length === 0 && extraFiles.length === 0) {
  console.log('\n✨ Perfect match! All product names correspond to WebP files.\n');
} else {
  console.log('\n⚠️  Some mismatches found. Please review the list above.\n');
}
