import { createClient } from '@supabase/supabase-js'
import { readdir, readFile } from 'fs/promises'
import { join, extname } from 'path'

const SUPABASE_URL = 'https://mtdxajnzoabnozlhzbyc.supabase.co'
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const BUCKET = 'products'
const IMAGES_DIR = new URL('../assets/images/products', import.meta.url).pathname

if (!SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY env variable')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})

async function createBucket() {
  const { data: buckets } = await supabase.storage.listBuckets()
  const exists = buckets?.some((b) => b.name === BUCKET)

  if (exists) {
    console.log(`Bucket "${BUCKET}" already exists`)
    return
  }

  const { error } = await supabase.storage.createBucket(BUCKET, { public: true })
  if (error) throw new Error(`Failed to create bucket: ${error.message}`)
  console.log(`Bucket "${BUCKET}" created`)
}

async function uploadImages() {
  const files = (await readdir(IMAGES_DIR)).filter((f) =>
    ['.webp', '.png', '.jpg', '.jpeg'].includes(extname(f).toLowerCase()),
  )

  console.log(`\nUploading ${files.length} images...\n`)

  const results = []

  for (const file of files) {
    const filePath = join(IMAGES_DIR, file)
    const buffer = await readFile(filePath)
    const contentType = file.endsWith('.webp') ? 'image/webp' : 'image/png'

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(file, buffer, { contentType, upsert: true })

    if (error) {
      console.error(`✗ ${file}: ${error.message}`)
    } else {
      const url = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${file}`
      console.log(`✓ ${file}`)
      results.push({ file, url })
    }
  }

  return results
}

async function main() {
  await createBucket()
  const results = await uploadImages()

  console.log(`\n✅ Done! Uploaded ${results.length} images`)
  console.log(`\nBase URL: ${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
