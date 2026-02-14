const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Convert images to WebP format
 * Usage: node scripts/convert-to-webp.js <sourceDir>
 * Example: node scripts/convert-to-webp.js VYO_OLD/assets/images/products
 * 
 * The script will:
 * 1. Scan all files in the specified directory
 * 2. Create a 'results' folder inside the source directory
 * 3. Convert all supported images to WebP format
 * 4. Save converted images to the 'results' folder
 */

const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff'];

async function convertImageToWebP(inputPath, outputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    
    if (!SUPPORTED_FORMATS.includes(ext)) {
      return { success: false, skipped: true };
    }

    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    await sharp(inputPath)
      .webp({ quality: 85, effort: 4 })
      .toFile(outputPath);

    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const sizeReduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
    const sizeInfo = `${(inputStats.size / 1024).toFixed(1)}KB → ${(outputStats.size / 1024).toFixed(1)}KB`;

    return {
      success: true,
      skipped: false,
      sizeReduction,
      sizeInfo,
    };
  } catch (error) {
    return {
      success: false,
      skipped: false,
      error: error.message,
    };
  }
}

async function convertDirectory(sourceDir) {
  if (!fs.existsSync(sourceDir)) {
    console.error(`❌ Source directory does not exist: ${sourceDir}`);
    process.exit(1);
  }

  const stats = fs.statSync(sourceDir);
  if (!stats.isDirectory()) {
    console.error(`❌ Path is not a directory: ${sourceDir}`);
    process.exit(1);
  }

  const resultsDir = path.join(sourceDir, 'results');
  
  console.log(`\n🔄 Starting conversion...`);
  console.log(`📂 Source directory: ${sourceDir}`);
  console.log(`📦 Results directory: ${resultsDir}\n`);

  const files = fs.readdirSync(sourceDir);
  const imageFiles = files.filter((file) => {
    const filePath = path.join(sourceDir, file);
    const stats = fs.statSync(filePath);
    if (!stats.isFile()) {
      return false;
    }
    const ext = path.extname(file).toLowerCase();
    return SUPPORTED_FORMATS.includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log('⚠️  No supported image files found in source directory');
    console.log(`   Supported formats: ${SUPPORTED_FORMATS.join(', ')}`);
    return;
  }

  console.log(`📊 Found ${imageFiles.length} image file(s) to convert\n`);

  let successCount = 0;
  let failCount = 0;
  let skipCount = 0;
  let totalOriginalSize = 0;
  let totalConvertedSize = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(sourceDir, file);
    const fileName = path.basename(file, path.extname(file));
    const outputPath = path.join(resultsDir, `${fileName}.webp`);

    const result = await convertImageToWebP(inputPath, outputPath);

    if (result.skipped) {
      skipCount++;
      continue;
    }

    if (result.success) {
      successCount++;
      const inputStats = fs.statSync(inputPath);
      const outputStats = fs.statSync(outputPath);
      totalOriginalSize += inputStats.size;
      totalConvertedSize += outputStats.size;
      console.log(`✅ ${file} → ${fileName}.webp (${result.sizeReduction}% smaller, ${result.sizeInfo})`);
    } else {
      failCount++;
      console.error(`❌ ${file}: ${result.error}`);
    }
  }

  const totalReduction = totalOriginalSize > 0
    ? ((1 - totalConvertedSize / totalOriginalSize) * 100).toFixed(1)
    : 0;

  console.log(`\n✨ Conversion complete!`);
  console.log(`✅ Successfully converted: ${successCount}`);
  if (skipCount > 0) {
    console.log(`⏭️  Skipped (unsupported format): ${skipCount}`);
  }
  if (failCount > 0) {
    console.log(`❌ Failed: ${failCount}`);
  }
  if (successCount > 0) {
    console.log(`\n📊 Total size reduction: ${totalReduction}%`);
    console.log(`   Original: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Converted: ${(totalConvertedSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Saved: ${((totalOriginalSize - totalConvertedSize) / 1024 / 1024).toFixed(2)}MB`);
  }
  console.log(`\n📁 Results saved to: ${resultsDir}`);
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
📸 WebP Converter

Usage:
  node scripts/convert-to-webp.js <sourceDir>
  
Description:
  Scans all files in the specified directory, converts supported images to WebP format,
  and saves them to a 'results' folder inside the source directory.
  
Examples:
  # Convert all images in a directory
  node scripts/convert-to-webp.js VYO_OLD/assets/images/products
  
  # Or use npm script
  npm run convert-to-webp VYO_OLD/assets/images/products
  
Supported formats:
  ${SUPPORTED_FORMATS.join(', ')}
  `);
  process.exit(0);
}

const sourceDir = path.resolve(args[0]);
convertDirectory(sourceDir);
