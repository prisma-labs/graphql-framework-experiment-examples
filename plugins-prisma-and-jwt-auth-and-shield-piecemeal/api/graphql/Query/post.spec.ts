import { authenticate } from '../../../tests/authenticate'
import { createTestContext } from '../../../tests/create-test-context'

const ctx = createTestContext()

it('ensures that a post only displays expected post', async (done) => {
  await authenticate(ctx)
  const draftResult = await ctx.client.send(`                 # 1
    mutation {
      createDraft(title: "Post 7", content: "should be in post...") {            # 2
        id
        title
        content
        published
      }
    }
  `)

  const postResult = await ctx.client.send(
    `
    query getPost($draftId: Int!) {
      post(id: $draftId) {
        id
        title
        content
        published
      }
    }
  `,
    { draftId: draftResult.createDraft.id },
  )

  expect(postResult).toMatchInlineSnapshot(`
    Object {
      "post": Object {
        "content": "should be in post...",
        "id": 1,
        "published": false,
        "title": "Post 7",
      },
    }
  `)
  done()
})

it('makes sure a post requires authentication', async (done) => {
  await expect(
    ctx.client.send(
      `
    query getPost($draftId: Int!) {
      post(id: $draftId) {
        id
        title
        content
        published
      }
    }
  `,
      { draftId: 1234 },
    ),
  ).rejects.toThrow(Error)
  done()
})
