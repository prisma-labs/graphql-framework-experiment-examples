import { app } from 'nexus-future'

app.logger.settings({ level: 'debug' })

app.schema.objectType({
  name: 'CustomPost',
  definition(t) {
    t.model('Post').id()
    t.model('Post').title()
    t.model('Post').tags()
    t.model('Post').status()
  },
})
