import { PrismaClient } from '@prisma/client'
import { schema } from 'nexus'

const db = new PrismaClient()

schema.addToContext((req) => {
  return {
    db,
  }
})

schema.objectType({
  name: 'World',
  definition(t) {
    t.id('id')
    t.string('name')
    t.float('population')
  },
})

schema.queryType({
  definition(t) {
    t.field('hello', {
      type: 'World',
      args: {
        world: schema.stringArg({ required: false }),
      },
      resolve(_root, args, ctx) {
        ctx.db
        return null as any
      },
    })
  },
})
