#!/usr/bin/env node
// One owner for the public chain-count claim; also pins /mpc canonical.

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const sourceFile = "content/chain-count.ts"
const sourcePath = path.join(root, sourceFile)
const source = fs.readFileSync(sourcePath, "utf8")
const labelMatch = source.match(
  /export const supportedChainCountLabel = "([^"]+)"/,
)

if (!labelMatch) {
  fail(`could not read supportedChainCountLabel from ${sourceFile}`)
}

const label = labelMatch[1]
if (!/^\d+\+$/.test(label)) {
  fail(`supportedChainCountLabel must look like "36+", got "${label}"`)
}

const stale = ["30+", "35+"]
const scanDirs = ["app", "components", "content", "lib"]
const skipNames = new Set(["chain-count.ts"])
const errors = []

for (const dir of scanDirs) {
  walk(path.join(root, dir), (file) => {
    if (!/\.(ts|tsx)$/.test(file)) return
    if (skipNames.has(path.basename(file))) return
    const rel = path.relative(root, file)
    const text = fs.readFileSync(file, "utf8")
    for (const needle of stale) {
      if (text.includes(needle)) {
        errors.push(`${rel} still contains "${needle}"`)
      }
    }
    if (text.includes("36+")) {
      errors.push(
        `${rel} hardcodes "36+" — import supportedChainCountLabel from content/chain-count.ts`,
      )
    }
  })
}

const rootLayout = fs.readFileSync(path.join(root, "app/layout.tsx"), "utf8")
if (/canonical:\s*"https:\/\/vultisig\.com"/.test(rootLayout)) {
  errors.push(
    'app/layout.tsx sets homepage canonical — that leaks onto every child route (live /mpc bug)',
  )
}

const home = fs.readFileSync(path.join(root, "app/page.tsx"), "utf8")
if (!/canonical:/.test(home)) {
  errors.push("app/page.tsx must set the homepage canonical")
}

const mpc = fs.readFileSync(path.join(root, "app/mpc/layout.tsx"), "utf8")
if (!mpc.includes("/mpc")) {
  errors.push("app/mpc/layout.tsx must canonicalise to /mpc")
}

if (errors.length > 0) {
  fail(errors.join("\n"))
}

console.log(
  `assert-copy-invariants: ok (label=${label}, no stale 30+/35+, /mpc self-canonical)`,
)

function walk(dir, visit) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, visit)
    else visit(full)
  }
}

function fail(message) {
  console.error(`assert-copy-invariants: FAIL\n${message}`)
  process.exit(1)
}
