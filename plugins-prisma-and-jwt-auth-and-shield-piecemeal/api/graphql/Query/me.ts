import { schema } from 'nexus'

import { getUserId } from '../../utils'

export const me = schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx.token)
        return ctx.db.user.findOne({
          where: {
            // eslint-disable-next-line radix
            id: parseInt(userId),
          },
        })
      },
    })
  },
})
