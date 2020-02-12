import { schema } from 'nexus-future'

schema.mutationType({
  definition(t) {
    t.crud.createOneBlog()
    t.crud.updateManyBlog()
  },
})
