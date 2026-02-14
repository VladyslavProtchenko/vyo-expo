const fs = require('fs');
const path = require('path');

/**
 * Rename files to kebab-case format
 * Usage: node scripts/rename-to-kebab-case.js <sourceDir>
 * Example: node scripts/rename-to-kebab-case.js VYO_OLD/assets/images/products
 * 
 * The script will:
 * 1. Scan all files in the specified directory
 * 2. Create a 'results' folder inside the source directory
 * 3. Convert file names to kebab-case format (lowercase, spaces to hyphens, remove special chars)
 * 4. Copy renamed files to the 'results' folder
 */

function toKebabCase(str) {
  return str
    .toLowerCase()
    .trim()
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, '-')
    // Remove or replace special characters
    .replace(/[()]/g, '') // Remove parentheses
    .replace(/[%]/g, '') // Remove percent signs
    .replace(/[&]/g, 'and') // Replace & with 'and'
    .replace(/[+]/g, 'plus') // Replace + with 'plus'
    .replace(/[@]/g, 'at') // Replace @ with 'at'
    .replace(/[#]/g, '') // Remove #
    .replace(/[$]/g, '') // Remove $
    .replace(/[!]/g, '') // Remove !
    .replace(/[?]/g, '') // Remove ?
    .replace(/[,]/g, '') // Remove commas
    .replace(/[.]/g, '') // Remove dots (except file extension)
    .replace(/['"]/g, '') // Remove quotes
    // Replace multiple consecutive hyphens with single hyphen
    .replace(/-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, '');
}

function renameFile(sourcePath, resultsDir) {
  try {
    const fileName = path.basename(sourcePath);
    const fileExt = path.extname(fileName);
    const fileNameWithoutExt = path.basename(fileName, fileExt);
    
    // Convert to kebab-case
    const kebabCaseName = toKebabCase(fileNameWithoutExt);
    const newFileName = `${kebabCaseName}${fileExt}`;
    const targetPath = path.join(resultsDir, newFileName);
    
    // Check if target file already exists
    if (fs.existsSync(targetPath)) {
      console.log(`⚠️  Skipping ${fileName} → ${newFileName} (file already exists)`);
      return { success: false, skipped: true, reason: 'file exists' };
    }
    
    // Copy file to results directory with new name
    fs.copyFileSync(sourcePath, targetPath);
    
    return {
      success: true,
      originalName: fileName,
      newName: newFileName,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

async function renameFilesInDirectory(sourceDir) {
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
  
  console.log(`\n🔄 Starting file renaming...`);
  console.log(`📂 Source directory: ${sourceDir}`);
  console.log(`📦 Results directory: ${resultsDir}\n`);

  // Create results directory if it doesn't exist
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
    console.log(`📁 Created results directory: ${resultsDir}\n`);
  }

  const files = fs.readdirSync(sourceDir);
  const fileList = files.filter((file) => {
    const filePath = path.join(sourceDir, file);
    const stats = fs.statSync(filePath);
    // Skip directories (including 'results' folder)
    if (stats.isDirectory()) {
      return false;
    }
    return stats.isFile();
  });

  if (fileList.length === 0) {
    console.log('⚠️  No files found in source directory');
    return;
  }

  console.log(`📊 Found ${fileList.length} file(s) to rename\n`);

  let successCount = 0;
  let failCount = 0;
  let skipCount = 0;
  const renameMap = [];

  for (const file of fileList) {
    const sourcePath = path.join(sourceDir, file);
    const result = renameFile(sourcePath, resultsDir);

    if (result.success) {
      successCount++;
      renameMap.push({ original: result.originalName, renamed: result.newName });
      console.log(`✅ ${result.originalName} → ${result.newName}`);
    } else if (result.skipped) {
      skipCount++;
    } else {
      failCount++;
      console.error(`❌ ${file}: ${result.error}`);
    }
  }

  console.log(`\n✨ Renaming complete!`);
  console.log(`✅ Successfully renamed: ${successCount}`);
  if (skipCount > 0) {
    console.log(`⏭️  Skipped: ${skipCount}`);
  }
  if (failCount > 0) {
    console.log(`❌ Failed: ${failCount}`);
  }

  // Save rename mapping to a JSON file
  if (renameMap.length > 0) {
    const mappingPath = path.join(resultsDir, 'rename-mapping.json');
    fs.writeFileSync(mappingPath, JSON.stringify(renameMap, null, 2));
    console.log(`\n📄 Rename mapping saved to: ${mappingPath}`);
  }

  console.log(`\n📁 Renamed files saved to: ${resultsDir}`);
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
📝 File Rename to Kebab-Case

Usage:
  node scripts/rename-to-kebab-case.js <sourceDir>
  
Description:
  Scans all files in the specified directory, renames them to kebab-case format,
  and copies them to a 'results' folder inside the source directory.
  
Examples:
  # Rename all files in a directory
  node scripts/rename-to-kebab-case.js VYO_OLD/assets/images/products
  
  # Or use npm script
  npm run rename-to-kebab-case VYO_OLD/assets/images/products
  
Conversion rules:
  - Convert to lowercase
  - Replace spaces and underscores with hyphens
  - Remove parentheses, percent signs, and other special characters
  - Replace & with 'and', + with 'plus', @ with 'at'
  - Remove multiple consecutive hyphens
  - Remove leading/trailing hyphens
  
Examples:
  "Acerola cherry" → "acerola-cherry"
  "Baked sweet potato" → "baked-sweet-potato"
  "Dark chocolate (70%)" → "dark-chocolate-70"
  "Cooked Atlantic salmon" → "cooked-atlantic-salmon"
  `);
  process.exit(0);
}

const sourceDir = path.resolve(args[0]);
renameFilesInDirectory(sourceDir);
