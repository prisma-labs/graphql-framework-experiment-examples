import { app } from 'nexus-future'

app.mutationType({
  definition(t) {
    t.crud.createOneBlog()
    t.crud.updateManyBlog()
  },
})
