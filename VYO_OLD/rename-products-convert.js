const fs = require('fs');
const path = require('path');

// Папка с файлами
const folder = path.join(__dirname, 'assets', 'convert');

let renamed = 0;
let skipped = 0;
let errors = 0;
let totalFiles = 0;

fs.readdir(folder, (err, files) => {
  if (err) {
    console.error('Ошибка чтения папки:', err);
    return;
  }

  totalFiles = files.length;
  console.log(`Найдено ${totalFiles} файлов для обработки\n`);

  let processed = 0;

  files.forEach(file => {
    const oldPath = path.join(folder, file);

    // Проверяем, что это файл, а не папка
    if (!fs.lstatSync(oldPath).isFile()) {
      processed++;
      if (processed === totalFiles) {
        showSummary();
      }
      return;
    }

    const ext = path.extname(file).toLowerCase(); // расширение
    const name = path.basename(file, ext)
                     .toLowerCase()
                     .replace(/[\s_]+/g, '-'); // пробелы и _ -> дефис

    const newPath = path.join(folder, name + ext);

    // Проверяем, нужно ли переименовывать
    if (file === name + ext) {
      console.log(`⏭️  Пропущен (уже правильный формат): ${file}`);
      skipped++;
      processed++;
      if (processed === totalFiles) {
        showSummary();
      }
      return;
    }

    // Проверяем, не существует ли уже файл с таким именем
    if (fs.existsSync(newPath) && oldPath !== newPath) {
      console.log(`⚠️  Пропущен: ${file} -> ${name + ext} (файл уже существует)`);
      skipped++;
      processed++;
      if (processed === totalFiles) {
        showSummary();
      }
      return;
    }

    fs.rename(oldPath, newPath, (err) => {
      processed++;
      if (err) {
        console.error(`❌ Ошибка переименования ${file}:`, err.message);
        errors++;
      } else {
        console.log(`✅ ${file} -> ${name + ext}`);
        renamed++;
      }

      if (processed === totalFiles) {
        showSummary();
      }
    });
  });

    function showSummary() {
      console.log(`\nГотово! Итоги: ✅ Переименовано: ${renamed} | ⏭️ Пропущено: ${skipped} | ❌ Ошибок: ${errors} | 📁 Всего файлов: ${totalFiles}`);
    }
});
