import { schema } from 'nexus'
import { getUserId } from '../utils'

export const Query = schema.queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx.token)
        if (!userId) {
          throw new Error('Invalid userId')
        }
        return ctx.db.user.findOne({
          where: {
            id: parseInt(userId),
          },
        })
      },
    })

    t.list.field('feed', {
      type: 'Post',
      resolve: (parent, args, ctx) => {
        return ctx.db.post.findMany({
          where: { published: true },
        })
      },
    })

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: schema.stringArg({ nullable: true }),
      },
      resolve: (parent, { searchString }, ctx) => {
        return ctx.db.post.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: searchString,
                },
              },
              {
                content: {
                  contains: searchString,
                },
              },
            ],
          },
        })
      },
    })

    t.field('post', {
      type: 'Post',
      nullable: true,
      args: { id: schema.intArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.db.post.findOne({
          where: {
            id,
          },
        })
      },
    })
  },
})