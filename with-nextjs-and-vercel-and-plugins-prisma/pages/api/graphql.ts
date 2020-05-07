import app, { server } from 'nexus'
import '../../graphql/schema'

app.assemble()

export default server.handlers.graphql
