import { createClient } from '@supabase/supabase-js'
import { readdir, readFile } from 'fs/promises'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const SUPABASE_URL = 'https://mtdxajnzoabnozlhzbyc.supabase.co'
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const BUCKET = 'sounds'
const FOLDER = 'forest-bathing'

if (!SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY — add it to .env and run:')
  console.error('SUPABASE_SERVICE_ROLE_KEY=your_key node scripts/upload-sounds-to-supabase.mjs')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets()
  if (buckets?.some((b) => b.name === BUCKET)) {
    console.log(`Bucket "${BUCKET}" already exists\n`)
    return
  }
  const { error } = await supabase.storage.createBucket(BUCKET, { public: true })
  if (error) throw new Error(`Failed to create bucket: ${error.message}`)
  console.log(`Bucket "${BUCKET}" created\n`)
}

async function uploadSounds() {
  const dir = join(ROOT, 'assets/sounds')
  const entries = await readdir(dir)
  const mp3s = entries.filter((f) => extname(f).toLowerCase() === '.mp3')

  const results = []
  for (const file of mp3s) {
    const storagePath = `${FOLDER}/${file}`
    const buffer = await readFile(join(dir, file))

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, buffer, { contentType: 'audio/mpeg', upsert: true })

    if (error) {
      console.error(`✗ ${file}: ${error.message}`)
    } else {
      const url = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`
      console.log(`✓ ${file}`)
      results.push({ file, url })
    }
  }
  return results
}

async function main() {
  console.log('── Ensuring bucket ─────────────────────────────────\n')
  await ensureBucket()

  console.log('── Uploading sounds ─────────────────────────────────\n')
  const results = await uploadSounds()

  console.log(`\n✅ Uploaded ${results.length} files`)
  console.log('\n── URLs ─────────────────────────────────────────────\n')
  for (const { file, url } of results) {
    console.log(`${file.replace('.mp3', '')}: '${url}',`)
  }
}

main().catch((err) => { console.error(err); process.exit(1) })
