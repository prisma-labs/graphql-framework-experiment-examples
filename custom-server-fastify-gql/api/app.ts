import Fastify, { FastifyRequest } from "fastify"
import FastifyGQL from "fastify-gql"
import { schema, server, settings, log } from "nexus-future"

server.custom(({ schema, context }) => {
  const app = Fastify()

  app.register(FastifyGQL, {
    schema,
    context,
    ide: "playground"
  })

  return {
    async start() {
      await app.listen(settings.current.server.port)

      log.info(`Fastify Server listening`, {
        url: `http://localhost:${settings.current.server.port}/playground`
      })
    },
    stop() {
      return app.close()
    }
  }
})

schema.addToContext<FastifyRequest>(_req => {
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
