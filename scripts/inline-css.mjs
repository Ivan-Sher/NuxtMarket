/* eslint-disable */
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const publicDir = resolve(__dirname, '..', '.output', 'public')
const htmlPath = resolve(publicDir, 'index.html')

if (!existsSync(htmlPath)) {
  const fallbackPath = resolve(publicDir, '200.html')
  if (existsSync(fallbackPath)) {
    const html = readFileSync(fallbackPath, 'utf-8')
    writeFileSync(htmlPath, html)
    console.log('⚠️ index.html not found. Copied 200.html → index.html.')
  } else {
    console.log('⚠️ Neither index.html nor 200.html found. Skipping.')
    process.exit(0)
  }
}

let html = readFileSync(htmlPath, 'utf-8')

const cssLinks = [...html.matchAll(/<link[^>]*href="([^"]+\.css)"[^>]*>/g)]

for (const [fullTag, href] of cssLinks) {
  const cleanHref = href.replace(/^\/[^/]+\//, '')
  const cssPath = resolve(publicDir, cleanHref)

  if (!existsSync(cssPath)) {
    console.log(`⚠️ CSS not found: ${cssPath}. Skipping.`)
    continue
  }

  const css = readFileSync(cssPath, 'utf-8')
  html = html.replace(fullTag, `<style>${css}</style>`)
}

writeFileSync(htmlPath, html)
