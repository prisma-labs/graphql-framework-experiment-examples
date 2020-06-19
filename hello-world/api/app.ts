import { schema } from "nexus"

schema.addToContext((req) => {
  return {
    req,
    db: {
      users: {
        newton: {
          id: "1",
          birthyear: "1649",
          name: "Newton",
        },
      },
    },
  }
})
