import { app } from 'graphql-santa'

app.queryType({
  definition(t) {
    t.crud.blogs({
      pagination: false,
    })
    t.crud.users({ filtering: true, alias: 'people' })
    t.crud.posts({ type: 'CustomPost', ordering: true, filtering: true })

    //
    // Examples showing custom resolvers
    //

    t.field('blog', {
      type: 'Blog',
      args: {
        id: app.intArg({ required: true }),
      },
      resolve(_root, args, ctx) {
        return ctx.photon.blogs
          .findOne({
            where: {
              id: args.id,
            },
          })
          .then(maybeBlog => {
            if (maybeBlog === null) {
              throw new Error(`Could not find blog with ID ${args.id}`)
            } else {
              return maybeBlog
            }
          })
      },
    })

    t.field('blogsLike', {
      type: 'Blog',
      list: true,
      args: {
        name: app.stringArg(),
        viewCount: app.intArg(),
      },
      resolve(_root, args, ctx) {
        return ctx.photon.blogs.findMany({
          where: {
            name: args.name,
            viewCount: args.viewCount,
          },
        })
      },
    })
  },
})
