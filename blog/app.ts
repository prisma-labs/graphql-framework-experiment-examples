import { log, settings } from 'nexus-future'

settings.change({
  logger: {
    level: 'trace',
  },
  schema: {
    connections: {
      types: {
        foobar: {},
        toto: {},
      },
    },
  },
  server: {
    startMessage: info => {
      settings.original.server.startMessage(info)
      log.warn('piggy back message!')
    },
  },
})
