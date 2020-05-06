import app from 'nexus'
import '../../graphql/schema'

app.assemble()

export default app.server.handlers.playground
