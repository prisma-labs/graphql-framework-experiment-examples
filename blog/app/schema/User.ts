objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.blog()
    t.model.posts({ type: 'CustomPost' })
    t.model.role()
    t.boolean('isLongName', user => {
      const length: number = user.name?.length ?? 0
      return length > 5
    })
  },
})
