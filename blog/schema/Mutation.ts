import { app } from 'graphql-santa'

app.mutationType({
  definition(t) {
    t.crud.createOneBlog()
    t.crud.updateManyBlog()
  },
})
