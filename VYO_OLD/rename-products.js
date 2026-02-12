const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, 'assets', 'products');
const products = {
  "Acerola cherry": "acerola-cherry",
  "Almonds": "almonds",
  "Apple with skin": "apple-with-skin",
  "Avocado": "avocado",
  "Baked salmon": "baked-salmon",
  "Baked sweet potato": "baked-sweet-potato",
  "Baked trout": "baked-trout",
  "Banana": "banana",
  "Beef liver": "beef-liver",
  "Black currant": "black-currant",
  "Boiled chicken breast": "boiled-chicken-breast",
  "Boiled potato": "boiled-potato",
  "Brie cheese": "brie-cheese",
  "Canned sardines": "canned-sardines",
  "Canned tuna": "canned-tuna",
  "Canola oil": "canola-oil",
  "Cashews": "cashews",
  "Cheddar cheese": "cheddar-cheese",
  "Chia seeds": "chia-seeds",
  "Chicken egg": "chicken-egg",
  "Chicken liver": "chicken-liver",
  "Cooked Atlantic salmon": "cooked-atlantic-salmon",
  "Cooked Brussels sprouts": "cooked-brussels-sprouts",
  "Cooked asparagus": "cooked-asparagus",
  "Cooked bluefin tuna": "cooked-bluefin-tuna",
  "Cooked broccoli": "cooked-broccoli",
  "Cooked brown rice": "cooked-brown-rice",
  "Cooked buckwheat": "cooked-buckwheat",
  "Cooked chickpeas": "cooked-chickpeas",
  "Cooked green peas": "cooked-green-peas",
  "Cooked kidney beans": "cooked-kidney-beans",
  "Cooked lentils": "cooked-lentils",
  "Cooked millet": "cooked-millet",
  "Cooked mushrooms": "cooked-mushrooms",
  "Cooked mussels": "cooked-mussels",
  "Cooked oats": "cooked-oats",
  "Cooked pearl barley": "cooked-pearl-barley",
  "Cooked pork": "cooked-pork",
  "Cooked spinach": "cooked-spinach",
  "Cooked white beans": "cooked-white-beans",
  "Cottage cheese": "cottage-cheese",
  "Dark chocolate (70%)": "dark-chocolate-70",
  "Dates": "dates",
  "Dried apricots": "dried-apricots",
  "Dried figs": "dried-figs",
  "Dry oats": "dry-oats",
  "Durum wheat pasta": "durum-wheat-pasta",
  "Flaxseed oil": "flaxseed-oil",
  "Flaxseed": "flaxseed",
  "Fortified cereal": "fortified-cereal",
  "Fortified nutritional yeast": "fortified-nutritional-yeast",
  "Fortified plant milk": "fortified-plant-milk",
  "Fresh parsley": "fresh-parsley",
  "Fresh strawberries": "fresh-strawberries",
  "Grapefruit": "grapefruit",
  "Ground flaxseed": "ground-flaxseed",
  "Hazelnuts": "hazelnuts",
  "Kiwifruit": "kiwifruit",
  "Orange": "orange",
  "Pacific herring, cooked": "pacific-herring-cooked",
  "Peanuts": "peanuts",
  "Pear with skin": "pear-with-skin",
  "Pistachios": "pistachios",
  "Plain yogurt": "plain-yogurt",
  "Prunes": "prunes",
  "Pumpkin seeds": "pumpkin-seeds",
  "Raisins": "raisins",
  "Raspberries": "raspberries",
  "Raw Atlantic mackerel": "raw-atlantic-mackerel",
  "Raw cabbage": "raw-cabbage",
  "Raw carrot": "raw-carrot",
  "Raw spinach": "raw-spinach",
  "Red bell pepper, raw": "red-bell-pepper-raw",
  "Roast turkey": "roast-turkey",
  "Rose hips, raw": "rose-hips-raw",
  "Salmon fish oil": "salmon-fish-oil",
  "Sesame seeds": "sesame-seeds",
  "Soybean oil": "soybean-oil",
  "Stewed beef": "stewed-beef",
  "Sunflower seeds": "sunflower-seeds",
  "Tangerine": "tangerine",
  "Tofu": "tofu",
  "Tomato juice": "tomato-juice",
  "Tomato": "tomato",
  "Walnuts": "walnuts",
  "White cabbage": "white-cabbage",
  "Whole grain bread": "whole-grain-bread",
  "Whole milk": "whole-milk"
};

const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.jpg'));

console.log(`Найдено ${files.length} файлов для переименования\n`);

let renamed = 0;
let skipped = 0;

files.forEach(file => {
  const nameWithoutExt = file.replace('.jpg', '');
  const newName = products[nameWithoutExt];
  
  if (!newName) {
    console.log(`⚠️  Пропущен: ${file} (не найден в списке)`);
    skipped++;
    return;
  }
  
  const oldPath = path.join(productsDir, file);
  const newPath = path.join(productsDir, `${newName}.jpg`);
  
  // Проверяем, не существует ли уже файл с таким именем
  if (fs.existsSync(newPath) && oldPath !== newPath) {
    console.log(`⚠️  Пропущен: ${file} -> ${newName}.jpg (файл уже существует)`);
    skipped++;
    return;
  }
  
  try {
    fs.renameSync(oldPath, newPath);
    console.log(`✅ ${file} -> ${newName}.jpg`);
    renamed++;
  } catch (error) {
    console.error(`❌ Ошибка при переименовании ${file}:`, error.message);
    skipped++;
  }
});

console.log(`\nГотово! Переименовано: ${renamed}, Пропущено: ${skipped}`);
