import { schema } from 'nexus'

export const post = schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('post', {
      type: 'Post',
      nullable: true,
      args: { id: schema.intArg() },
      resolve: (parent, { id }, ctx) => {
        if (id === null) return null
        return ctx.db.post.findOne({
          where: {
            id,
          },
        })
      },
    })
  },
})
