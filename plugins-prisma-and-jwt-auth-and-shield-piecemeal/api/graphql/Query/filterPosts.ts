import { schema } from 'nexus'

export const filterPosts = schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: schema.stringArg({ nullable: true }),
      },
      resolve: (parent, { searchString }, ctx) => {
        if (searchString === null) return null
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
  },
})
