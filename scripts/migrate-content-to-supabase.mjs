import { createClient } from '@supabase/supabase-js'
import { readdir, readFile, writeFile, stat } from 'fs/promises'
import { join, extname, relative } from 'path'
import { fileURLToPath } from 'url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const SUPABASE_URL = 'https://mtdxajnzoabnozlhzbyc.supabase.co'
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const BUCKET = 'content'

const CONTENT_FOLDERS = ['phases', 'body-care', 'stress-management', 'care-plan', 'home-page', 'pain']
const SRC_DIRS = ['app', 'components', 'hooks', 'store', 'constants']

if (!SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})

// ── 1. Upload ─────────────────────────────────────────────────────────────────

async function listImages(dir) {
  const results = []
  const entries = await readdir(dir)
  for (const entry of entries) {
    const full = join(dir, entry)
    const s = await stat(full)
    if (s.isFile() && ['.webp', '.png', '.jpg', '.jpeg'].includes(extname(entry).toLowerCase())) {
      results.push(full)
    }
  }
  return results
}

async function createBucket() {
  const { data: buckets } = await supabase.storage.listBuckets()
  if (buckets?.some((b) => b.name === BUCKET)) {
    console.log(`Bucket "${BUCKET}" already exists\n`)
    return
  }
  const { error } = await supabase.storage.createBucket(BUCKET, { public: true })
  if (error) throw new Error(`Failed to create bucket: ${error.message}`)
  console.log(`Bucket "${BUCKET}" created\n`)
}

async function uploadAll() {
  const uploaded = []
  for (const folder of CONTENT_FOLDERS) {
    const dir = join(ROOT, 'assets/images', folder)
    let files
    try {
      files = await listImages(dir)
    } catch {
      continue
    }
    for (const file of files) {
      const fileName = file.split('/').pop()
      const storagePath = `${folder}/${fileName}`
      const buffer = await readFile(file)
      const contentType = file.endsWith('.webp') ? 'image/webp' : 'image/png'

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, buffer, { contentType, upsert: true })

      if (error) {
        console.error(`✗ ${storagePath}: ${error.message}`)
      } else {
        const url = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`
        console.log(`✓ ${storagePath}`)
        uploaded.push({ localPath: file, storagePath, url, folder, fileName })
      }
    }
  }
  return uploaded
}

// ── 2. Update source code ─────────────────────────────────────────────────────

async function findSourceFiles() {
  const results = []
  for (const d of SRC_DIRS) {
    const full = join(ROOT, d)
    try {
      const entries = await readdir(full, { recursive: true })
      for (const entry of entries) {
        if (/\.(ts|tsx)$/.test(entry)) results.push(join(full, entry))
      }
    } catch {}
  }
  return results
}

async function updateSourceFiles(uploaded) {
  const sourceFiles = await findSourceFiles()
  let totalRefs = 0

  for (const file of sourceFiles) {
    let content = await readFile(file, 'utf8')
    let changed = false

    for (const { folder, fileName, url } of uploaded) {
      const requirePath = `@/assets/images/${folder}/${fileName}`

      // Pattern 1: source={require('...')} → source={{ uri: 'URL' }}
      const srcRequireRe = new RegExp(
        `source=\\{require\\('${requirePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'\\)\\}`,
        'g',
      )
      if (srcRequireRe.test(content)) {
        content = content.replace(srcRequireRe, `source={{ uri: '${url}' }}`)
        changed = true
        totalRefs++
      }

      // Pattern 2: standalone require('...') in data/constants → 'URL'
      const requireRe = new RegExp(
        `require\\('${requirePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'\\)`,
        'g',
      )
      if (requireRe.test(content)) {
        content = content.replace(requireRe, `'${url}'`)
        changed = true
        totalRefs++
      }
    }

    if (changed) {
      await writeFile(file, content)
      console.log(`  updated: ${relative(ROOT, file)}`)
    }
  }

  return totalRefs
}

// ── 3. Fix source={variable} where variable is now a string URL ───────────────
// These components receive image as a prop/variable that was require() before

async function fixIndirectImageSources() {
  const fixes = [
    // body-care/index.tsx: source={category.image} → source={{ uri: category.image }}
    {
      file: join(ROOT, 'app/body-care/index.tsx'),
      from: 'source={category.image}',
      to: 'source={{ uri: category.image }}',
    },
    // SkipPoster.tsx: source={image} → source={{ uri: image }}
    {
      file: join(ROOT, 'app/phase/components/SkipPoster.tsx'),
      from: 'source={image}',
      to: 'source={{ uri: image }}',
    },
  ]

  // Also find any remaining source={X.image} or source={X.icon} patterns in files
  // that reference content folders (phases, body-care, etc.)
  const sourceFiles = await findSourceFiles()
  for (const file of sourceFiles) {
    const content = await readFile(file, 'utf8')
    // Check if this file uses content images via variables
    const hasContentImages = CONTENT_FOLDERS.some((f) =>
      content.includes(`assets/images/${f}`) || content.includes(`supabase.co/storage/v1/object/public/content/${f}`),
    )
    if (!hasContentImages) continue

    // Find source={X.image}, source={X.icon}, source={X.forestImage} patterns
    const varSourceRe = /source=\{(\w+\.\w+|\w+)\}/g
    let match
    let newContent = content
    while ((match = varSourceRe.exec(content)) !== null) {
      const expr = match[1]
      // Skip already correct patterns and known RN Image props
      if (expr.startsWith('style') || expr.startsWith('require') || expr.includes('uri')) continue
      const alreadyFixed = fixes.some((f) => f.file === file && f.from === match[0])
      if (!alreadyFixed) {
        fixes.push({ file, from: match[0], to: `source={{ uri: ${expr} }}` })
      }
    }
  }

  for (const { file, from, to } of fixes) {
    try {
      const content = await readFile(file, 'utf8')
      if (content.includes(from)) {
        await writeFile(file, content.replaceAll(from, to))
        console.log(`  fixed indirect source: ${relative(ROOT, file)} — ${from} → ${to}`)
      }
    } catch {}
  }
}

// ── 4. Delete local files ─────────────────────────────────────────────────────

async function deleteLocalFiles(uploaded) {
  const { unlink, rmdir } = await import('fs/promises')
  for (const { localPath } of uploaded) {
    try {
      await unlink(localPath)
    } catch {}
  }
  // Try to remove empty folders
  for (const folder of CONTENT_FOLDERS) {
    try {
      await rmdir(join(ROOT, 'assets/images', folder))
      console.log(`  removed folder: assets/images/${folder}`)
    } catch {}
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('── Step 1: Upload to Supabase ──────────────────────\n')
  await createBucket()
  const uploaded = await uploadAll()
  console.log(`\nUploaded ${uploaded.length} files`)

  console.log('\n── Step 2: Update source code ──────────────────────\n')
  const refs = await updateSourceFiles(uploaded)
  console.log(`\nUpdated ${refs} references`)

  console.log('\n── Step 3: Fix indirect source props ───────────────\n')
  await fixIndirectImageSources()

  console.log('\n── Step 4: Delete local files ──────────────────────\n')
  await deleteLocalFiles(uploaded)

  console.log('\n✅ Done!')
}

main().catch((err) => { console.error(err); process.exit(1) })
