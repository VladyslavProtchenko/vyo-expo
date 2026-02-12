const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const fs = require('fs');
const path = require('path');

// Устанавливаем путь к ffmpeg
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const inputFolder = path.join(__dirname, 'assets', 'convert');
const outputFolder = path.join(__dirname, 'assets', 'convert');

if (!fs.existsSync(inputFolder)) {
  console.error(`❌ Папка ${inputFolder} не существует!`);
  process.exit(1);
}

const files = fs.readdirSync(inputFolder).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return ['.mp4', '.mov', '.avi'].includes(ext);
});

console.log(`Найдено ${files.length} видео файлов для конвертации\n`);

let converted = 0;
let deleted = 0;
let errors = 0;

function convertVideo(inputPath, outputPath, originalFile) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputPath)
      .videoCodec('libvpx-vp9')
      .audioCodec('libopus')
      .outputOptions([
        '-crf 30',
        '-b:v 0',
        '-b:a 128k'
      ])
      .on('start', (commandLine) => {
        console.log(`🔄 Начало конвертации: ${originalFile}`);
      })
      .on('progress', (progress) => {
        if (progress.percent) {
          process.stdout.write(`\r   Прогресс: ${Math.round(progress.percent)}%`);
        }
      })
      .on('end', () => {
        console.log(`\n✅ ${originalFile} → ${path.basename(outputPath)}`);
        converted++;
        resolve();
      })
      .on('error', (err) => {
        console.error(`\n❌ Ошибка при конвертации ${originalFile}:`, err.message);
        errors++;
        reject(err);
      })
      .run();
  });
}

async function convertAll() {
  for (const file of files) {
    const inputPath = path.join(inputFolder, file);
    const fileName = path.parse(file).name;
    const outputPath = path.join(outputFolder, fileName + '.webm');

    try {
      await convertVideo(inputPath, outputPath, file);

      // Удаляем оригинальный файл после успешной конвертации
      try {
        fs.unlinkSync(inputPath);
        console.log(`🗑️  Удален: ${file}`);
        deleted++;
      } catch (deleteError) {
        console.error(`⚠️  Не удалось удалить ${file}:`, deleteError.message);
      }
    } catch (err) {
      // Ошибка уже обработана в convertVideo
      continue;
    }
  }

  console.log(`\n📊 Итоги: Конвертировано: ${converted}, Удалено: ${deleted}, Ошибок: ${errors}`);
}

convertAll().catch(err => {
  console.error('Критическая ошибка:', err);
  process.exit(1);
});
