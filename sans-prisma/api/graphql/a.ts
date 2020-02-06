import { log, schema } from "nexus-future"

log.info("boot")

schema.objectType({
  name: "User",
  definition(t) {
    t.field("id", { type: "ID" })
    t.field("name", { type: "String" })
  }
})

schema.objectType({
  name: "Query",
  definition(t) {
    t.list.field("users", {
      type: "User",
      resolve(_root, _args, ctx) {
        ctx.log.debug("resolve", {
          object: "Query",
          field: "users",
          type: "[User]"
        })
        return [ctx.db.users.newton]
      }
    })
  }
})
