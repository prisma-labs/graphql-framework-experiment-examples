import { ApolloServer } from "apollo-server"
import { schema, server, settings, log } from "nexus-future"

server.custom(({ schema, context }) => {
  const server = new ApolloServer({
    schema,
    context
  })

  return {
    async start() {
      await server.listen()

      log.info(`Apollo Server listening`, {
        url: `http://localhost:${settings.current.server.port}/playground`
      })
    },
    stop() {
      return server.stop()
    }
  }
})

schema.addToContext(_req => {
  return {
    db: {
      users: {
        newton: {
          id: "1",
          birthyear: "1649",
          name: "Newton"
        }
      }
    }
  }
})
