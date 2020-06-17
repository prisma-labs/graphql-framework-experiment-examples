import { log, settings, use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'

use(prisma({ features: { crud: true } }))

settings.change({
  schema: {
    connections: {
      foobar: {},
      toto: {},
    },
  },
  server: {
    startMessage: (info) => {
      settings.original.server.startMessage(info)
      log.warn('piggy back message!')
    },
  },
})
