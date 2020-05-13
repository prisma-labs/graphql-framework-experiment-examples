const { join } = require("path")
const ncc = require("@zeit/ncc")
const fs = require("fs-jetpack")

async function main() {
  const { code, map, assets } = await ncc(
    join(process.cwd(), "node_modules/.build/index.js"),
    {
      externals: ["typescript"],
    }
  )
  await fs.writeAsync("dist-ncc/bundle.js", code)
}

main().catch(console.error)
