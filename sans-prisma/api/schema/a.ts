import { app } from "graphql-santa"

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
        ctx.logger.debug("resolve_user")
        return [ctx.db.users.newton]
      }
    })
  }
})
