import { schema } from "nexus"

schema.objectType({
  name: "User",
  definition(t) {
    t.field("id", { type: "ID" })
    t.field("name", { type: "String" })
  },
})

schema.queryType({
  definition(t) {
    t.list.field("users", {
      type: "User",
      resolve(_root, _args, ctx) {
        ctx.log.debug("resolve", {
          object: "Query",
          field: "users",
          type: "[User]",
        })
        return [ctx.db.users.newton]
      },
    })
  },
})

schema.subscriptionType({
  definition(t) {
    // todo Nexus Schema t.boolean is broken
    t.field("truths", {
      type: "Boolean",
      subscribe() {
        return truthStream()
      },
      // todo Nexus Schema doesn't infer type currently
      resolve(answer: boolean) {
        return answer
      },
    })
  },
})

async function* truthStream() {
  while (true) {
    const answer = [true, false][Math.round(Math.random())]
    yield answer
    await new Promise((res) => setTimeout(res, 1000))
  }
}
