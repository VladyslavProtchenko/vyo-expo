const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, 'assets', 'products');

// Получаем все файлы .jpg
const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.jpg'));

console.log(`Найдено ${files.length} файлов\n`);

let renamed = 0;
let skipped = 0;
let deleted = 0;

files.forEach(file => {
  // Проверяем, начинается ли файл с большой буквы
  if (file[0] === file[0].toUpperCase() && file[0] !== file[0].toLowerCase()) {
    const nameWithoutExt = file.replace('.jpg', '');
    const newName = nameWithoutExt.toLowerCase() + '.jpg';
    
    const oldPath = path.join(productsDir, file);
    const newPath = path.join(productsDir, newName);
    
    // Если файл с маленькой буквы уже существует, удаляем старый
    if (fs.existsSync(newPath) && oldPath !== newPath) {
      try {
        fs.unlinkSync(oldPath);
        console.log(`🗑️  Удален дубликат: ${file} (уже существует ${newName})`);
        deleted++;
      } catch (error) {
        console.error(`❌ Ошибка при удалении ${file}:`, error.message);
        skipped++;
      }
    } else {
      // Переименовываем файл
      try {
        fs.renameSync(oldPath, newPath);
        console.log(`✅ ${file} -> ${newName}`);
        renamed++;
      } catch (error) {
        console.error(`❌ Ошибка при переименовании ${file}:`, error.message);
        skipped++;
      }
    }
  }
});

console.log(`\nГотово! Переименовано: ${renamed}, Удалено дубликатов: ${deleted}, Пропущено: ${skipped}`);
