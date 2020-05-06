import { schema } from 'nexus'

//-- db

export type Post = {
  date: string
  content: string
  id: string
  title: string
}

export function getSortedPosts(): Promise<Post[]> {
  return Promise.resolve([
    {
      content:
        'Me: Dear World, teach me how APIs access private static files in NextJS.\n\nWorld: Read this young one: https://github.com/zeit/next.js/issues/8251.',
      date: '2020-01-13',
      id: '1',
      title: 'Hello world',
    },
  ])
}

//-- schema

schema.objectType({
  name: 'Post',
  rootTyping: 'Post',
  definition(t) {
    t.id('id')
    t.string('title')
    t.string('date')
    t.string('content')
  },
})

schema.queryType({
  definition(t) {
    t.field('post', {
      type: 'Post',
      args: {
        id: schema.idArg({ required: true }),
      },
      resolve(_, args) {
        return getSortedPosts().then((posts) => posts.find((p) => p.id === args.id))
      },
    })

    t.list.field('posts', {
      type: 'Post',
      resolve() {
        return getSortedPosts()
      },
    })
  },
})
