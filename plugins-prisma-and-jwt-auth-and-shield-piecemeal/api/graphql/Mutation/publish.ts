import { schema } from 'nexus'

export const publish = schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('publish', {
      type: 'Post',
      nullable: true,
      args: { id: schema.intArg() },
      resolve: (parent, { id }, ctx) => {
        if (id === null) return null
        return ctx.db.post.update({
          where: { id },
          data: { published: true },
        })
      },
    })
  },
})
