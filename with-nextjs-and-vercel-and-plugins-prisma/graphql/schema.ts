import { schema, use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'

use(prisma())

schema.objectType({
  name: 'Todo',
  definition(t) {
    t.model.id()
    t.model.description()
  },
})

schema.queryType({
  definition(t) {
    t.crud.todos()
  },
})
