import { schema } from 'nexus'

export const feed = schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('feed', {
      type: 'Post',
      resolve: (parent, args, ctx) => {
        return ctx.db.post.findMany({
          where: { published: true },
        })
      },
    })
  },
})
