import { app } from 'pumpkins'

app.objectType({
  name: 'CustomPost',
  definition(t) {
    t.model('Post').id()
    t.model('Post').title()
    t.model('Post').tags()
    t.model('Post').status()
    var a = t.model('Post')
    type a2 = typeof a
  },
})
