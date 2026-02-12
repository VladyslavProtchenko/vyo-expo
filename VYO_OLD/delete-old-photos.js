const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, 'assets', 'products');

const files = fs.readdirSync(productsDir).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return ['.jpg', '.jpeg', '.png'].includes(ext);
});

console.log(`Найдено ${files.length} старых файлов для удаления\n`);

let deleted = 0;
let errors = 0;

files.forEach(file => {
  const filePath = path.join(productsDir, file);
  const fileName = path.parse(file).name;
  const webpPath = path.join(productsDir, fileName + '.webp');
  
  // Проверяем, существует ли .webp версия
  if (fs.existsSync(webpPath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`✅ Удален: ${file} (есть ${fileName}.webp)`);
      deleted++;
    } catch (error) {
      console.error(`❌ Ошибка при удалении ${file}:`, error.message);
      errors++;
    }
  } else {
    console.log(`⚠️  Пропущен: ${file} (нет ${fileName}.webp)`);
    errors++;
  }
});

console.log(`\nГотово! Удалено: ${deleted}, Пропущено/Ошибок: ${errors}`);
