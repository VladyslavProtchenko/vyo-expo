const fs = require('fs');
const path = require('path');

/**
 * Check product files by groups of 20
 */

const productsFilePath = path.join(__dirname, '../store/products.ts');
const productsContent = fs.readFileSync(productsFilePath, 'utf-8');
const webpDir = path.join(__dirname, '../assets/images/convert/products/results/results');

// Extract all product entries with their imageUrl
const productRegex = /{\s*name:\s*['"]([^'"]+)['"],\s*imageUrl:\s*(require\(['"]([^'"]+)['"]\)|null)/g;
const products = [];
let match;
while ((match = productRegex.exec(productsContent)) !== null) {
  const name = match[1];
  const imageUrl = match[2];
  if (imageUrl !== 'null') {
    const imagePath = match[3];
    const fileName = path.basename(imagePath);
    products.push({ name, fileName, imagePath });
  } else {
    products.push({ name, fileName: null, imagePath: null });
  }
}

// Get actual WebP files
const actualFiles = fs.existsSync(webpDir)
  ? fs.readdirSync(webpDir).filter(f => f.endsWith('.webp'))
  : [];

const actualFilesSet = new Set(actualFiles);

console.log('\n📊 DETAILED GROUP CHECK\n');
console.log(`Total products: ${products.length}`);
console.log(`Products with images: ${products.filter(p => p.fileName).length}`);
console.log(`Products without images: ${products.filter(p => !p.fileName).length}`);
console.log(`Actual WebP files: ${actualFiles.length}\n`);

// Check by groups of 20
const groupSize = 20;
const groups = Math.ceil(products.length / groupSize);

for (let group = 0; group < groups; group++) {
  const start = group * groupSize;
  const end = Math.min(start + groupSize, products.length);
  const groupProducts = products.slice(start, end);
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`GROUP ${group + 1} (items ${start + 1}-${end})`);
  console.log('='.repeat(60));
  
  let groupMatched = 0;
  let groupMissing = 0;
  let groupNoImage = 0;
  
  groupProducts.forEach((product, idx) => {
    const itemNum = start + idx + 1;
    
    if (!product.fileName) {
      console.log(`${itemNum.toString().padStart(3)}. "${product.name}" → [NO IMAGE]`);
      groupNoImage++;
    } else if (actualFilesSet.has(product.fileName)) {
      console.log(`${itemNum.toString().padStart(3)}. ✓ "${product.name}" → ${product.fileName}`);
      groupMatched++;
    } else {
      console.log(`${itemNum.toString().padStart(3)}. ✗ "${product.name}" → ${product.fileName} [MISSING]`);
      groupMissing++;
    }
  });
  
  console.log(`\nGroup ${group + 1} Summary: ✅ ${groupMatched} matched, ❌ ${groupMissing} missing, ⚪ ${groupNoImage} no image`);
}

// Final summary
const totalMatched = products.filter(p => p.fileName && actualFilesSet.has(p.fileName)).length;
const totalMissing = products.filter(p => p.fileName && !actualFilesSet.has(p.fileName)).length;
const totalNoImage = products.filter(p => !p.fileName).length;

console.log(`\n${'='.repeat(60)}`);
console.log('FINAL SUMMARY');
console.log('='.repeat(60));
console.log(`✅ Matched: ${totalMatched}`);
console.log(`❌ Missing: ${totalMissing}`);
console.log(`⚪ No image (null): ${totalNoImage}`);
console.log(`📁 Total WebP files available: ${actualFiles.length}`);

if (totalMissing > 0) {
  console.log(`\n❌ Missing files:`);
  products
    .filter(p => p.fileName && !actualFilesSet.has(p.fileName))
    .forEach(p => {
      console.log(`   - "${p.name}" requires: ${p.fileName}`);
    });
}

console.log('');
