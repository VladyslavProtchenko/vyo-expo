const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFolder = path.join(__dirname, 'assets', 'convert');
const outputFolder = path.join(__dirname, 'assets', 'convert');

if (!fs.existsSync(inputFolder)) {
  console.error(`❌ Папка ${inputFolder} не существует!`);
  process.exit(1);
}

const files = fs.readdirSync(inputFolder).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return ['.jpg', '.jpeg', '.png'].includes(ext);
});

console.log(`Найдено ${files.length} файлов для конвертации\n`);

let converted = 0;
let deleted = 0;
let errors = 0;

async function convertAll() {
  for (const file of files) {
    const inputPath = path.join(inputFolder, file);
    const fileName = path.parse(file).name;
    const outputPath = path.join(outputFolder, fileName + '.webp');

    try {
      // Конвертируем в webp
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      console.log(`✅ ${file} → ${fileName}.webp`);
      converted++;

      // Удаляем оригинальный файл
      try {
        fs.unlinkSync(inputPath);
        console.log(`🗑️  Удален: ${file}`);
        deleted++;
      } catch (deleteError) {
        console.error(`⚠️  Не удалось удалить ${file}:`, deleteError.message);
      }
    } catch (err) {
      console.error(`❌ Ошибка при конвертации ${file}:`, err.message);
      errors++;
    }
  }

  console.log(`\nГотово! Конвертировано: ${converted}, Удалено: ${deleted}, Ошибок: ${errors}`);
}

convertAll().catch(err => {
  console.error('Критическая ошибка:', err);
  process.exit(1);
});
