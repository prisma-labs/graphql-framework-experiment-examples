import { schema } from 'nexus-future'

schema.objectType({
  name: 'Tag',
  definition(t) {
    t.model.id()

    // Normally we would write the following as:
    //
    //   t.model.label()
    //
    // But this shows how prisma plugin augments the graphql backing types
    //
    t.field('label', {
      type: 'String',
      resolve(parent) {
        return parent.label
      },
    })
  },
})
