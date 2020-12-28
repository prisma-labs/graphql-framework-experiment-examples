import { schema } from 'nexus'

export const Post = schema.objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.published()
    t.model.title()
    t.model.content()
    t.model.author()
  },
})
