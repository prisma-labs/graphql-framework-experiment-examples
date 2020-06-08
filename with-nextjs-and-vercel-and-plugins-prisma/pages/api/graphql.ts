if (process.env.NODE_ENV === 'development') require('nexus').default.reset()

const app = require('nexus').default

require('../../graphql/schema')

app.assemble()

export const playground = app.server.handlers.playground
export default app.server.handlers.graphql
