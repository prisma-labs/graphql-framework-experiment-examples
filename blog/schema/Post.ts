import { app } from 'nexus-future'

app.logger.setLevel('debug')

app.objectType({
  name: 'CustomPost',
  definition(t) {
    t.model('Post').id()
    t.model('Post').title()
    t.model('Post').tags()
    t.model('Post').status()
  },
})
