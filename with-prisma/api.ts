import * as Prisma from '@prisma/client'
import { on, schema } from 'nexus'

/**
 * Without the Prisma plugin you need to manually expose Prisma types into your backing types.
 */

// todo https://github.com/graphql-nexus/nexus/issues/473#issuecomment-665171477
export type User = Prisma.User

on.start(() => {
  /**
   * Without the Prisma plugin you need to manaully contruct your Prisma client instance.
   * With the plugin you can also still create your Prisma client instance if you need to.
   */
  const db = new Prisma.PrismaClient()

  /**
   * Without the Prisma plugin you need to manually expose your Prisma client on the context.
   */
  schema.addToContext(() => {
    return { db }
  })
})

schema.objectType({
  name: 'User',
  /**
   * Without the Prisma plugin you need to manually map your Prisma types to the backing
   * types of your GrpahQL objects. With Prisma plugin when the type names between Prisma
   * and GraphQL layers are the same, they are automatically mapped. But you can still
   * control this manually with the Prisma plugin.
   */
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
      resolve(_root, _args, ctx) {
        return ctx.db.user.findMany()
      },
    })
  },
})
