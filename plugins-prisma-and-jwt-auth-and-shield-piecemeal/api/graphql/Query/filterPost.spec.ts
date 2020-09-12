import { authenticate } from '../../../tests/authenticate'
import { createTestContext } from '../../../tests/create-test-context'

const ctx = createTestContext()

it('ensures that a filterPosts only displays expected posts', async (done) => {
  await authenticate(ctx)
  await ctx.client.send(`                 # 1
    mutation {
      createDraft(title: "Filter Post 1", content: "should be in filterPosts...") {            # 2
        id
        title
        content
        published
      }
    }
  `)
  const draftResult2 = await ctx.client.send(`                 # 1
    mutation {
      createDraft(title: "Filter Post 2", content: "should be in filterPosts...") {            # 2
        id
        title
        content
        published
      }
    }
  `)
  await ctx.client.send(
    `
    mutation publishDraft($draftId: Int!) {
      publish(id: $draftId) {
        id
        title
        content
        published
      }
    }
  `,
    { draftId: draftResult2.createDraft.id },
  )
  await ctx.client.send(`                 # 1
    mutation {
      createDraft(title: "Extra Post 3", content: "should not be in filterPosts...") {            # 2
        id
        title
        content
        published
      }
    }
  `)

  const filterPostsResult = await ctx.client.send(`
    query {
      filterPosts(searchString: "Filter Post") {
        id
        title
        content
        published
      }
    }
  `)

  expect(filterPostsResult).toMatchInlineSnapshot(`
    Object {
      "filterPosts": Array [
        Object {
          "content": "should be in filterPosts...",
          "id": 1,
          "published": false,
          "title": "Filter Post 1",
        },
        Object {
          "content": "should be in filterPosts...",
          "id": 2,
          "published": true,
          "title": "Filter Post 2",
        },
      ],
    }
  `)
  done()
})

it('makes sure a filterPosts requires authentication', async (done) => {
  await expect(
    ctx.client.send(`
    query {
      filterPosts(searchString: "Filter Post") {
        id
        title
        content
        published
      }
    }
  `),
  ).rejects.toThrow(Error)
  done()
})
