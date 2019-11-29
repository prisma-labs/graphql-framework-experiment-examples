import { app } from "pumpkins"

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
      resolve(_root, _args, _ctx) {
        return [_ctx.db.users.newton]
      }
    })
  }
})
