// api/graphql.ts
// what the user writes
import app, { server } from 'nexus'
// what the machine writes
// api/graphql.ts
import '../../graphql/schema'

export default server.handlers.graphql

app.assemble()
