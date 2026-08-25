/**
 * Copies the Spline runtime out of node_modules and into public/ so the browser
 * can load it as a same-origin ES module.
 *
 * It cannot simply be imported. The runtime carries `new URL('../libs/draco/…',
 * import.meta.url)` references that three's DRACOLoader only ever uses as
 * defaults, but that both Turbopack and webpack try to resolve at build time -
 * the files are not shipped in the package, so the build fails with six
 * "Module not found" errors. Served as a plain asset the specifiers are never
 * resolved by a bundler at all, and the decoder path is pointed at the vendored
 * copies in public/v5/spline through the runtime's own `wasmPath` option.
 *
 * The `webgl` standalone is the one taken: a single self-contained file rather
 * than the ~60 chunks of the default build, and 1.2MB smaller than the bundle
 * carrying the WebGPU pipeline as well, which this scene has no use for.
 *
 * Generated, so it is gitignored - this runs ahead of both `dev` and `build` to
 * keep it in step with whatever version package.json resolves.
 */
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = join(ROOT, 'node_modules/@splinetool/runtime/build/runtime.standalone.webgl.js')
const TARGET = join(ROOT, 'public/v5/spline/runtime.js')

/** Version the vendored copy was taken from, for the log line. */
const version = JSON.parse(
  readFileSync(join(ROOT, 'node_modules/@splinetool/runtime/package.json'), 'utf8'),
).version

mkdirSync(dirname(TARGET), { recursive: true })
copyFileSync(SOURCE, TARGET)
console.log(`vendor-spline-runtime: @splinetool/runtime@${version} -> public/v5/spline/runtime.js`)
