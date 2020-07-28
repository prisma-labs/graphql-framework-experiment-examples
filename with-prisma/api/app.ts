import * as Prisma from '@prisma/client'
import { on, schema } from 'nexus'

// todo https://github.com/graphql-nexus/nexus/issues/473#issuecomment-665171477
export type User = Prisma.User

on.start(() => {
  const db = new Prisma.PrismaClient()

  schema.addToContext(() => {
    return { db }
  })
})

schema.objectType({
  name: 'User',
  rootTyping: 'User',
  definition(t) {
    t.id('id')
    t.string('name')
  },
})

schema.queryType({
  definition(t) {
    t.list.field('users', {
      type: 'User',
      args: {
        world: schema.stringArg({ required: false }),
      },
      resolve(_root, args, ctx) {
        return ctx.db.user.findMany()
      },
    })
  },
})
