import { app } from 'nexus-future'

app.schema.mutationType({
  definition(t) {
    t.crud.createOneBlog()
    t.crud.updateManyBlog()
  },
})
