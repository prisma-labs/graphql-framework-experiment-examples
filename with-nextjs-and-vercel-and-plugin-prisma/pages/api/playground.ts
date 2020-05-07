import app from 'nexus'
import '../../graphql/schema'

app.settings.change({
  server: {
    path: '/api/graphql',
  },
})

app.assemble()

export default app.server.handlers.playground
