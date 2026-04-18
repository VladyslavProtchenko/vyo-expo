import { readFile, writeFile } from 'fs/promises'
import { readdir } from 'fs/promises'
import { join, relative } from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const BASE = 'https://mtdxajnzoabnozlhzbyc.supabase.co/storage/v1/object/public'
const STORAGE_IMPORT = "import { STORAGE_URL } from '@/config/supabase'"

// Get all files with hardcoded URLs
const files = execSync(
  `grep -rl 'supabase.co/storage' . --include='*.ts' --include='*.tsx' --exclude-dir=node_modules --exclude-dir=.expo --exclude-dir=VYO_OLD`,
  { cwd: ROOT }
)
  .toString()
  .trim()
  .split('\n')
  .map((f) => join(ROOT, f.replace('./', '')))
  .filter((f) => !f.endsWith('config/supabase.ts'))

let updated = 0

for (const file of files) {
  let content = await readFile(file, 'utf8')
  if (!content.includes(BASE)) continue

  // Replace 'https://BASE/path' → `${STORAGE_URL}/path`
  const escaped = BASE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  content = content.replace(new RegExp(`'${escaped}(/[^']+)'`, 'g'), '`${STORAGE_URL}$1`')

  // Add STORAGE_URL to existing supabase import or add new import
  if (content.includes("from '@/config/supabase'") || content.includes('from "@/config/supabase"')) {
    // Add STORAGE_URL to existing import if not already there
    content = content
      .replace(/import \{([^}]+)\} from '@\/config\/supabase'/, (match, p1) =>
        p1.includes('STORAGE_URL') ? match : `import { ${p1.trim()}, STORAGE_URL } from '@/config/supabase'`,
      )
      .replace(/import \{([^}]+)\} from "@\/config\/supabase"/, (match, p1) =>
        p1.includes('STORAGE_URL') ? match : `import { ${p1.trim()}, STORAGE_URL } from "@/config/supabase"`,
      )
  } else {
    // Add new import after the last import line
    const lastImportIdx = [...content.matchAll(/^import .+$/gm)].pop()
    if (lastImportIdx) {
      const pos = lastImportIdx.index + lastImportIdx[0].length
      content = content.slice(0, pos) + '\n' + STORAGE_IMPORT + content.slice(pos)
    } else {
      content = STORAGE_IMPORT + '\n' + content
    }
  }

  await writeFile(file, content)
  updated++
  console.log(`✓ ${relative(ROOT, file)}`)
}

console.log(`\nDone — updated ${updated} files`)
