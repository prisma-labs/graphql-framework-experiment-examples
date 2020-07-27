import { schema, settings } from "nexus"

schema.objectType({
  name: "User",
  definition(t) {
    t.field("id", { type: "ID" })
    t.field("name", { type: "String" })
  },
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
          type: "[User]",
        })
        return [ctx.db.users.newton]
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

schema.subscriptionType({
  definition(t) {
    // todo t.boolean seems broken
    t.field("truths", {
      type: "Boolean",
      subscribe() {
        return truthStream()
      },
      resolve(answer: boolean) {
        return answer
      },
    })
  },
})

settings.change({
  server: {
    playground: undefined,
  },
})
