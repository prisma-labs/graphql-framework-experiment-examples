import { schema } from 'nexus'

export const AuthPayload = schema.objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  },
})
