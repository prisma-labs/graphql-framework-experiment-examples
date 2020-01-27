import { app } from "nexus-future"

app.objectType({
  name: "User",
  definition(t) {
    t.id("id")
    t.string("name")
  }
})

app.objectType({
  name: "Query",
  definition(t) {
    t.list.field("users", {
      type: "User",
      resolve(_root, _args, _ctx) {
        return [{ id: "1643", name: "newton" }]
      }
    })
  }
})
