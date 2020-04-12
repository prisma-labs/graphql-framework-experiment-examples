const NodeEnvironment = require("jest-environment-node")
const { createTestContext } = require("nexus/testing")

module.exports = class CustomEnvironment extends NodeEnvironment {
  nexus = null

  async setup() {
    await super.setup()
    this.nexus = await createTestContext()
    await this.nexus.app.server.start()
    this.global.nexus = this.nexus
  }

  async teardown() {
    await super.teardown()
    await this.nexus.app.server.stop()
  }
}
