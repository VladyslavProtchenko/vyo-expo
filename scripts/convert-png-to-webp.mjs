import sharp from 'sharp'
import { readdir, stat, unlink, readFile, writeFile } from 'fs/promises'
import { join, extname, basename, dirname } from 'path'
import { fileURLToPath } from 'url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const IMAGES_DIR = join(ROOT, 'assets/images')
const SRC_DIRS = ['app', 'components', 'hooks', 'store', 'constants', 'contexts']

// These must stay as PNG (referenced in app.json as app icon / splash)
const SKIP = new Set(['icon.png', 'splashScreen.png'])

async function findPngs(dir) {
  const results = []
  const entries = await readdir(dir)
  for (const entry of entries) {
    const full = join(dir, entry)
    const s = await stat(full)
    if (s.isDirectory()) {
      results.push(...(await findPngs(full)))
    } else if (extname(entry).toLowerCase() === '.png' && !SKIP.has(entry)) {
      results.push(full)
    }
  }
  return results
}

async function findSourceFiles(dirs) {
  const results = []
  for (const d of dirs) {
    const full = join(ROOT, d)
    try {
      const entries = await readdir(full, { recursive: true })
      for (const entry of entries) {
        if (/\.(ts|tsx|js|jsx|json)$/.test(entry)) {
          results.push(join(full, entry))
        }
      }
    } catch {}
  }
  return results
}

async function updateReferences(sourceFiles, oldName, newName) {
  let updated = 0
  for (const file of sourceFiles) {
    const content = await readFile(file, 'utf8')
    if (content.includes(oldName)) {
      await writeFile(file, content.replaceAll(oldName, newName))
      updated++
    }
  }
  return updated
}

async function main() {
  const pngs = await findPngs(IMAGES_DIR)
  const sourceFiles = await findSourceFiles(SRC_DIRS)

  console.log(`\nFound ${pngs.length} PNG files to convert\n`)

  let totalBefore = 0
  let totalAfter = 0

  for (const pngPath of pngs) {
    const webpPath = join(dirname(pngPath), basename(pngPath, '.png') + '.webp')
    const oldName = basename(pngPath)
    const newName = basename(webpPath)

    const before = (await stat(pngPath)).size

    await sharp(pngPath).webp({ quality: 85, effort: 4 }).toFile(webpPath)

    const after = (await stat(webpPath)).size
    const saved = (((before - after) / before) * 100).toFixed(1)

    totalBefore += before
    totalAfter += after

    const refs = await updateReferences(sourceFiles, oldName, newName)
    await unlink(pngPath)

    const rel = pngPath.replace(ROOT, '')
    console.log(`✓ ${rel}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB  (-${saved}%)${refs ? `  [${refs} refs updated]` : ''}`)
  }

  console.log(`\n✅ Done!`)
  console.log(`   Before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`)
  console.log(`   After:  ${(totalAfter / 1024 / 1024).toFixed(2)} MB`)
  console.log(`   Saved:  ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB (-${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%)`)
}

main().catch((err) => { console.error(err); process.exit(1) })
