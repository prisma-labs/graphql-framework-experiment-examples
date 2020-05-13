const { join } = require("path")
const ncc = require("@zeit/ncc")
const fs = require("fs")

async function main() {
  const { code, map, assets } = await ncc(
    join(process.cwd(), "node_modules/.build/index.js"),
    {
      externals: ["typescript"],
    }
  )
  fs.writeFileSync(join(process.cwd(), "dist-ncc/bundle.js"), code)
}

main().catch(console.error)
