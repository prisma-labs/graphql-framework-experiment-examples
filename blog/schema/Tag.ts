import { app } from 'graphql-santa'

app.objectType({
  name: 'Tag',
  definition(t) {
    t.model.id()
    t.model.label()
  },
})
