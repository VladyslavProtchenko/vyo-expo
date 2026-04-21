import { readFile, writeFile } from 'fs/promises'

const PLIST = new URL('../ios/VYO/Info.plist', import.meta.url).pathname

const content = await readFile(PLIST, 'utf8')
const match = content.match(/<key>CFBundleVersion<\/key>\s*<string>(\d+)<\/string>/)

if (!match) {
  console.error('CFBundleVersion not found')
  process.exit(1)
}

const current = parseInt(match[1], 10)
const next = current + 1

const updated = content.replace(
  /<key>CFBundleVersion<\/key>\s*<string>\d+<\/string>/,
  `<key>CFBundleVersion</key>\n    <string>${next}</string>`
)

await writeFile(PLIST, updated)
console.log(`Build number: ${current} → ${next}`)
