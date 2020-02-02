import { app } from "nexus-future"

app.logger.info("boot")

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
