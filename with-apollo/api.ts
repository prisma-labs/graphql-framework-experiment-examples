import { ApolloServer } from 'apollo-server-express'
import { on, schema, server } from 'nexus'

schema.queryType({
  definition(t) {
    t.string('hello', () => 'Bob')
  },
})

on.start((data) => {
  const apollo = new ApolloServer({
    schema: data.schema,
  })
  apollo.applyMiddleware({ app: server.express })
})
