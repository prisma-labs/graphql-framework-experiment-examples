import { schema } from 'nexus'

import { getUserId } from '../../utils'

export const createDraft = schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createDraft', {
      type: 'Post',
      args: {
        title: schema.stringArg({ nullable: false }),
        content: schema.stringArg(),
      },
      resolve: (parent, { title, content }, ctx) => {
        const userId = getUserId(ctx.token)
        return ctx.db.post.create({
          data: {
            title,
            content,
            published: false,
            // eslint-disable-next-line radix
            author: { connect: { id: Number.parseInt(userId) } },
          },
        })
      },
    })
  },
})
