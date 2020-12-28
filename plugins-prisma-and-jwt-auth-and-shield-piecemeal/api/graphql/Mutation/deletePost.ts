import { schema } from 'nexus'

export const deletePost = schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deletePost', {
      type: 'Post',
      nullable: true,
      args: { id: schema.intArg() },
      resolve: (parent, { id }, ctx) => {
        if (id === null) return null
        return ctx.db.post.delete({
          where: {
            id,
          },
        })
      },
    })
  },
})
