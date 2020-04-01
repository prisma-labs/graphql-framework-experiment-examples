import { log, settings } from 'nexus'

settings.change({
  logger: {
    level: 'trace',
  },
  schema: {
    connections: {
      foobar: {},
      toto: {},
    },
  },
  server: {
    startMessage: info => {
      settings.original.server.startMessage(info)
      log.warn('piggy back message!')
    },
  },
})
