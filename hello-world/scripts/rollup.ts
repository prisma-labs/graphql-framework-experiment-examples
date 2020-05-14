import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import builtins from "builtin-modules"
import * as path from "path"
import { rollup, RollupWarning } from "rollup"
import visualizer from "rollup-plugin-visualizer"

function isCircDepWarnFromThirdPartyDep(warning: RollupWarning): boolean {
  if (process.env.DEBUG) return false
  if (warning.code !== "CIRCULAR_DEPENDENCY") return false
  if (warning.importer?.includes("node_modules")) return true
  return false
}

function isEvalWarnFromThirdPartyDep(warning: RollupWarning): boolean {
  if (process.env.DEBUG) return false
  if (warning.code !== "EVAL") return false
  if (warning.id?.includes("node_modules")) return true
  return false
}

function isNotExportedWarnFromImportOfThirdPartyDep(
  warning: RollupWarning
): boolean {
  if (process.env.DEBUG) return false
  if (
    warning.code === "MISSING_EXPORT" &&
    warning.exporter?.match(/node_modules/)
  )
    return true
  return false
}

rollup({
  onwarn(warning, warn) {
    if (isCircDepWarnFromThirdPartyDep(warning)) return
    if (isEvalWarnFromThirdPartyDep(warning)) return
    if (isNotExportedWarnFromImportOfThirdPartyDep(warning)) return
    warn(warning)
  },
  input: path.join(process.cwd(), "node_modules", ".build", "index.js"),
  treeshake: {
    moduleSideEffects(id, external) {
      if (id.match("node_modules/typescript")) return false
      return true
    },
  },

  external: [...builtins],
  preserveModules: true,
  plugins: [
    visualizer() as any,
    json(),
    resolve({}),
    commonjs({
      namedExports: {
        "node_modules/lodash/lodash.js": ["cloneDeep"],
      },
      ignore: ["@microsoft/typescript-etw", "prettier"],
    }),
  ],
})
  .then((rolledup) => {
    console.log("rolled up")
    return rolledup.write({
      // file: path.join(process.cwd(), "dist-bundle", "bundle.js"),
      dir: path.join(process.cwd(), "dist-rollup"),
      format: "commonjs",
    })
  })
  .then((rolledout) => {
    console.log("done")
  })
  .catch(console.error)
