// Test loader only. Appends .ts for our extensionless imports. Leaves node_modules alone:
// those extensionless requires are JavaScript, and tsc rejects a ".ts" suffix in source.
import { registerHooks } from "node:module"

const hasExtension = /\.[cm]?[jt]sx?$/

registerHooks({
  resolve(specifier, context, nextResolve) {
    const parent = context.parentURL ?? ""
    if (
      !parent.startsWith("file:") ||
      parent.includes("/node_modules/") ||
      !specifier.startsWith(".") ||
      hasExtension.test(specifier)
    ) {
      return nextResolve(specifier, context)
    }
    return nextResolve(`${specifier}.ts`, context)
  },
})
