import { app } from "nexus-future"

app.logger.info("boot")

if (process.env.LOG_DEMO) {
  console.log()
  console.log("------------")
  console.log("LOGGING DEMO")
  console.log("------------")
  const origLevel = app.logger.getLevel()
  app.logger.setLevel("trace")
  app.logger.fatal("foo", { lib: /see/ })
  app.logger.error("foo", { har: { mar: "tek" } })
  app.logger.warn("foo", { bleep: [1, "2", true] })
  app.logger.info("foo")
  app.logger.debug("foo", { foo: "bar" })
  app.logger.trace("foo", { a: 1, b: 2, c: "three" })
  app.logger.setLevel(origLevel)
  console.log("------------")
  console.log()
}

app.objectType({
  name: "User",
  definition(t) {
    t.field("id", { type: "ID" })
    t.field("name", { type: "String" })
  }
})

app.objectType({
  name: "Query",
  definition(t) {
    t.list.field("users", {
      type: "User",
      resolve(_root, _args, ctx) {
        ctx.logger.debug("resolve", {
          object: "Query",
          field: "users",
          type: "[User]"
        })
        return [ctx.db.users.newton]
      }
    })
  }
})
